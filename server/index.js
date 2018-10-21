import express from 'express';
import env from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import eventRoutes from './routes/event';
import usersortRoute from './routes/usersort';

env.config();
const app = express();
// bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('UI'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});
// routes needed
app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', eventRoutes);
app.use('/api/v1', usersortRoute);

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to EventRock API',
  })
})

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: error.message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on Port ${process.env.PORT}`);
});

export default app;
