# `@rojo2/turn-credentials`

A library to create TURN credentials [RFC](https://tools.ietf.org/html/draft-uberti-rtcweb-turn-rest-00).

```javascript
import turnCredentials from '@rojo2/turn-credentials'

const credentials = turnCredentials('username', {
  secret: process.env.TURN_SECRET
})
```

## How to test it against a running TURN server

Installing it as a global dependency

```sh
npm i -g @rojo2/turn-credentials
turn-credentials <userName> <secret>
```

This small CLI program returns a JSON with two properties `username` and `credential`, this
can be piped into a program like `jq` and the finally use it with testing utilities like `turnutils_uclient` (you can
find it in [coTURN](https://github.com/coturn/coturn/wiki/turnutils_uclient)).

```sh
for s in $(turn-credentials <userName> <secret> | jq -r "to_entries|map(\"turn_\(.key|tostring)=\(.value|tostring)\")|.[]" ); do
  export $s
done
turnutils_uclient -t -v -y -X -M -p 443 -u $turn_username -w $turn_credential -W <secret> <TURN server>
```

Made with :heart: by [rojo2](https://rojo2.com)
