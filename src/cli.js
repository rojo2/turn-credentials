import turnCredentials from './turn'

const credentials = turnCredentials(process.argv[2], {
  secret: process.argv[3] || process.env.TURN_SECRET
})
console.log(JSON.stringify(credentials, null, 2))
