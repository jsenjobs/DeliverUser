var jwt = require('jsonwebtoken')
let JWT_SECRET = process.env.JWTJWT_SECRET
let secret = process.env.JWTACTIVE + JWT_SECRET
// secret = 'ai*))!@wlamrhnsdk$%*@u~ksdu34id^al92e'
exports.createToken = function(obj) {
  let sub = JSON.stringify(obj)
  // let token = jwt.sign(obj, secret, { algorithm: 'HS256', jwtid:'jwt', issuer:'chaos', expiresIn:'2 seconds'})
  let token = jwt.sign(obj, secret, { algorithm: 'HS256', jwtid:'jwt', issuer:'chaos', subject: sub})
  return token
}
exports.createToken2 = function(obj, exp) {
  let sub = JSON.stringify(obj)
  let token = jwt.sign(obj, secret, { algorithm: 'HS256', jwtid:'jwt', issuer:'chaos', expiresIn:exp, subject: sub})
  return token

}
exports.verify = function(token) {
  return jwt.verify(token, secret, { algorithm: 'HS256', issuer:'chaos' })
}

exports.decode = function(token) {
  return jwt.decode(token, {complete: true})
}
