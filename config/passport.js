require("dotenv").config();
const { ExtractJwt, Strategy } = require("passport-jwt");
const User = require("../models/user");

const opt = {};

opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = process.env.JWT_SECRET;

const strategy = new Strategy(opt, function (payload, done) {
  const user = User.findOne({ id: payload.sub });
  if (user === null) {
    return done(null, false);
  }

  return done(null, user);
});

module.exports = (passport) => {
  passport.use(strategy);
};
