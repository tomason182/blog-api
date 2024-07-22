require("dotenv").config();
const { ExtractJwt, Strategy } = require("passport-jwt");
const User = require("../models/user");

const opt = {};

opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = process.env.JWT_SECRET;

const strategy = new Strategy(opt, function (payload, done) {
  User.findOne({ id: payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

module.exports = (passport) => {
  passport.use(strategy);
};
