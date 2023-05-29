import dotenv from 'dotenv';
dotenv.config();
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getUserByEmail } from '../queries/userQueries.js';
import jwt from 'jsonwebtoken';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await getUserByEmail(jwt_payload.email);
        if (user) {
          return done(null, user); // pass the user object, not a new token
        } else {
          console.log('User not found!');
          return done(null, false);
        }
      } catch (error) {
        console.log('Error:', error);
        return done(error, false);
      }
    })
  );
};
