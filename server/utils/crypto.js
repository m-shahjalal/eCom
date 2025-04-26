const bcrypt = require("bcryptjs");

const crypto = {};

crypto.genPassword = (text) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err);
      bcrypt.hash(text, salt, (err, hash) => {
        if (err) return reject(err);
        if (hash) return resolve(hash);
      });
    });
  });
};

crypto.comperePassword = (text, hashed) => {
  return new Promise((resolve, reject) => {
    return bcrypt.compare(text, hashed, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

module.exports = crypto;
