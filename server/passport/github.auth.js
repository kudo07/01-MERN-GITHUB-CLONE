// for persistent login session
import passport from 'passport';
import dotenv from 'dotenv';
import User from '../model/user.model.js';
import { Strategy as GithubStrategy } from 'passport-github2';
dotenv.config();
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
// User the GithubStrategy within Passport
// Strategies in Passport require a "verify" function, which accept credentials(in this case an accessTokenm refreshToken, and Github Profile), and invoke a callback with a user object
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/auth/github/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      const user = await User.findOne({ username: profile.username });
      //   signup
      if (!user) {
        const newUser = new User({
          name: profile.displayName,
          username: profile.username,
          profileUrl: profile.profileUrl,
          avatarUrl: profile.photos[0].value,
          likedProfiles: [],
          likedBy: [],
        });
        await newUser.save();
        done(null, newUser);
      } else {
        done(null, user);
      }
      // asynchronous verification for effect
      //   process.nextTick(function () {
      //     return done(null, profile);
      //     // to keep the example, the user's github profile is returned to represent the logged -in user . In a typical application, you would want to associate the github account with a user record in your database, and return that user instead
      //   });
    }
  )
);
