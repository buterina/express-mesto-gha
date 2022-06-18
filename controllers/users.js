const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'User not found' });
      }
      return res.status(200).send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        },
      });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadRequestError({ message: 'Id is not correct' }));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({
        data: user,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorMessage = Object.values(err.errors).map((error) => error.message).join(', ');
        return next(new BadRequestError(`Validation error: ${errorMessage}`));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user.userId, { name, about }, { new: true }).then((user) => {
    if (!user) {
      throw new NotFoundError('The user is not found');
    }
    return res.status(200).send({ data: user });
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('The information you provided is not correct'));
      }
      if (err.kind === 'ObjectId') {
        return next(new BadRequestError('Id is not correct'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user.userId, { avatar }).then((user) => {
    if (!user) {
      throw new NotFoundError('The user is not found');
    }
    return res.status(200).send({ data: user });
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('The information you provided is not correct'));
      }
      if (err.kind === 'ObjectId') {
        return next(new BadRequestError('Id is not correct'));
      }
      return next(err);
    });
};

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(() => {
      next(new ServerError('Server error'));
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
