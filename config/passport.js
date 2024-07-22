require("dotenv").config();
const { ExtractJwt, Strategy } = require("passport-jwt");
const User = require("../models/user");

const opt = {};

opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = process.env.JWT_SECRET;

exports.passport.use(
  new Strategy(opt, function (payload, done) {
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
  })
);
