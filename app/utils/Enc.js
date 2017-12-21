var bcrypt = require('bcrypt');
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';
let Promise = require('bluebird')

exports.Enc = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      if(err) {
        reject(false)
      }
      resolve(hash)
    });
  })
}

exports.compare = function(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function(err, res) {
        // res == true
        if(err) {
          reject(false)
        }
        resolve(res)
    })
  })
}
