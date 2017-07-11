const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users-controller');

router.post('/register', (req, res) => {

  // Can also be passed in as req.body directly but we're just paranoid
  let newUser = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };

  UsersController.addUser(newUser, (result) => {
    res.json(result);
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
