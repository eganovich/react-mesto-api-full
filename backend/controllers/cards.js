const Card = require('../models/card');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(`${Object.values(err.errors)
          .map((error) => error.message)
          .join(', ')}`);
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки нет');
      } else if (card.owner.toString() !== userId.toString()) {
        throw new ValidationError('Вы не можете удалить чужую карточку');
      } else if (card.owner.toString() === userId.toString()) {
        Card.findByIdAndDelete(cardId)
          .then(() => res.send(card))
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: user._id } },
        { new: true },
      )
        .orFail(new Error('NotValidId'))
        .then((card) => res.send(card))
        .catch((err) => {
          if (err.message === 'NotValidId') {
            throw new NotFoundError('Запрашиваемый ресурс не найден');
          } else {
            next(err);
          }
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: user._id } },
        { new: true },
      )
        .orFail(new Error('NotValidId'))
        .then((card) => res.send(card))
        .catch((err) => {
          if (err.message === 'NotValidId') {
            throw new NotFoundError('Запрашиваемый ресурс не найден');
          } else {
            next(err);
          }
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      } else {
        next(err);
      }
    })
    .catch(next);
};
