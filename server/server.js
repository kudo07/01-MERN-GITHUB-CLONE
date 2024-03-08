import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
//routes
import userRoutes from './routes/user.route.js';
import exploreRoutes from './routes/explore.route.js';
//
dotenv.config();
//
const app = express();
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
//
app.listen(5000, () => {
  console.log('server is running in backedn on 5000');
});
