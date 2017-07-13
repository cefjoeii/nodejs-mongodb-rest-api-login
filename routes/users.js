const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', (req, res) => {

  let name = req.body.name;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let passwordconfirm = req.body.passwordconfirm;

  if (password !== passwordconfirm) {
    res.status(400).json({ success: false, msg: 'Passwords do not match.' });
    return;
  }

  let newUser = new User({
    name: name,
    email: email,
    username: username,
    password: password
  });

  newUser.save((err) => {

    if(err) {
      if (err.errors) {

        if (err.errors.name) {
          res.status(400).json({ success: false, msg: err.errors.name.message });
          return;
        }

        if (err.errors.email) {
          res.status(400).json({ success: false, msg: err.errors.email.message });
          return;
        }

        if (err.errors.username) {
          res.status(400).json({ success: false, msg: err.errors.username.message });
          return;
        }

        if (err.errors.password) {
          res.status(400).json({ success: false, msg: err.errors.password.message });
          return;
        }

        // Show failed if all else fails for some reasons
        res.status(400).json( { success: false, msg: 'Failed to register.'});
      }
    }

    else {
      res.json({ success: true, msg: 'User successfully registered.' });
    }
  });
});


router.post('/login', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  UsersController.getUserByUsername(username, (err, user) => {

    if (err) throw err;

    if (!user) {
      // If return is not explicitly written, an error shows | SMH
      return res.status(400).json({ success: false, msg: 'User not found.' });
    }
    
    UsersController.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        // JSON Web Tokens handling is gonna go here later on
        res.json({ success: true, msg: 'Successfully logged in!'});
      }
      else {
        // Set the status code to 400, a bad request
        res.status(400).json({ success: false, msg: 'Wrong password.'});
      }
    });

  });

});

module.exports = router;
