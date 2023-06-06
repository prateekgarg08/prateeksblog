const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
const User = require('../models/User')
/* POST login. */
router.post('/login', function (req, res, next) {


  passport.authenticate('local', (err, user, info) => {
    console.log(err, user)
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }
    console.log("hola")

    const token = user.createJWT();
    return res.json({ token });



    // generate a signed son web token with the contents of user object and return it in the response


  })(req, res, next);
});
router.post('/sign-up', async (req, res, next) => {
  try {
    const userInput = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    const user = await User.create(userInput);
    const token = user.createJWT()
    res.json({ token, user }).status(201)
  } catch (err) {
    return next(err);
  };
})

module.exports = router