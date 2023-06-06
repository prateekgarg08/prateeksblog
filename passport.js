const User = require('./models/User')
const passport = require('passport')
const LocalStrategy = require('passport-local');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async function (email, password, done) {
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      };
      if (!user.verifyPassword(password)) {
        return done(null, false, { message: "Incorrect password" });
      };
      return done(null, user);
    } catch (err) {
      return done(err);
    };
  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
},
  function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return User.findOne({ _id: jwtPayload.id })
      .then(user => {
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
));
