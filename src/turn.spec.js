import crypto from 'crypto'
import createTurnCredentials from './turn'

describe('TURN credentials', () => {
  it('should fail if a userName is not specified', () => {
    expect(() => {
      createTurnCredentials()
    }).to.throw()
  })

  it('should fail if a secret is not specified', () => {
    expect(() => {
      createTurnCredentials('Test')
    }).to.throw()
  })

  it('should fail if a secret is not long enough', () => {
    expect(() => {
      createTurnCredentials('Test', { secret: 'test' })
    }).to.throw()
  })

  it('should create a new TURN', () => {
    const ALGORITHM = 'sha1'
    const SEPARATOR = ':'
    const DURATION = 3600
    const ENCODING = 'base64'
    const USER = 'usuario'
    const SECRET = 's3cr3t0bu3n0d3v3rd4d'
    const turnCredentials = createTurnCredentials(USER, {
      algorithm: ALGORITHM,
      secret: SECRET,
      duration: DURATION,
      separator: SEPARATOR,
      encoding: ENCODING
    })
    const timeStamp = Math.floor(Date.now() / 1000) + DURATION
    const username = `${timeStamp}${SEPARATOR}${USER}`
    const hmac = crypto.createHmac(ALGORITHM, SECRET)
    const credential = hmac.update(username).digest(ENCODING)
    expect(turnCredentials).to.have.property('username', username)
    expect(turnCredentials).to.have.property('credential', credential)
  })
})
