import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import './passport/github.auth.js';
//routes
import userRoutes from './routes/user.route.js';
import exploreRoutes from './routes/explore.route.js';
import authRoutes from './routes/auth.route.js';
//
import connectMongoDB from './db/connectMongoDB.js';
//
dotenv.config();
//
const app = express();
// passport
app.use(
  session({ secret: 'keyboard cat', resave: false, saveUninitialised: false })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
//
app.get('/', (req, res) => {
  res.send('server is ready and running backednm in server.js in 5000 port');
});
//

//we can remove the cors, it's not necessary in production because the frontend and backend are on the same domain
app.use(cors());

// routes
// app.use() requires a middleware function
app.use('/api/users', userRoutes);
app.use('/api/explore', exploreRoutes);
app.use('/api/auth', authRoutes);
// use prefix as it is a good practice
//
app.listen(5000, () => {
  console.log('server is running in backedn on 5000');
  connectMongoDB();
});
