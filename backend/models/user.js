const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    required: false,
    minlength: [2, 'Имя должно быть 2 или более символов'],
    maxlength: [30, 'Имя не должно быть длиннее 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    required: false,
    minlength: [2, 'Поле "О себе" должно содержать 2 или более символов'],
    maxlength: [30, 'Поле "О себе" не должно быть длиннее 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: false,
    validate: {
      validator: (v) => /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?/.test(v),
      message: 'Введите корректный url',
    },
  },
  email: {
    type: String,
    required: [true, 'Email - обязательно поле'],
    unique: true,
    validate: [validator.isEmail, 'Неправильный email'],
  },
  password: {
    select: false,
    type: String,
    required: [true, 'Пароль - обязательно поле'],
  },
});

module.exports = mongoose.model('user', userSchema);
