const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Название должно быть 2 или более символов'],
    maxlength: [30, 'Название не должно быть длиннее 30 символов'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?/.test(v),
      message: 'Введите корректный url',
    },
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: [
    {
      type: ObjectId,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
