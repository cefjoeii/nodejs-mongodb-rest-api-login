const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.addUser = function (newUser, callback) {
  
  // Convert the passed in object to a User
  newUser = new User(newUser);

  // Encrypt the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save((err) => {
        if (err) {
          callback({ success: false, msg: 'Failed to register.'});
        }
        else {
          callback({ success: true, msg: 'Successfully registered!'});
        }
      });
    });
  });
}

module.exports.getUserByUsername = function (username, callback) {
  const query = { username: username };
  User.findOne(query, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback (null, isMatch);
  });
}

