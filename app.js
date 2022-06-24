const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();
const { PORT = 3000 } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '62ab4f9889d379553dc3bc18',
  };
  next();
});

app.use(express.json());
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (_, __, next) => next(new NotFoundError("This page doesn't exist")));

app.use((err, _, res, next) => {
  const { statusCode = 500, message = 'Server error' } = err;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}`);
});
