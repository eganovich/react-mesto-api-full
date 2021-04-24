import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = React.useState(''); // Стейт-переменная сообщения об ошибке
  const [password, setPassword] = useState("");
  const [PasswordErrorMessage, setPasswordErrorMessage] = React.useState(''); // Стейт-переменная сообщения об ошибке

  const [formValidity, setFormValidity] = React.useState(false); // Состояние валидности формы
  const [emailValidity, setEmailValidity] = React.useState(true); // Состояние валидности инпута с email
  const [passwordValidity, setPasswordValidity] = React.useState(true); // Состояние валидности инпута паролем

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);    
    setEmailValidity(evt.currentTarget.checkValidity());
    setEmailErrorMessage(evt.target.validationMessage);
};

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
    setPasswordValidity(evt.currentTarget.checkValidity());
    setPasswordErrorMessage(evt.target.validationMessage);
  };

  function handleChange (evt) { // Изменение валидности формы
    setFormValidity(evt.currentTarget.checkValidity());
  }


  const resetForm = () => {
    setEmail("");
    setPassword("");
  }

  
  const handleSubmit = (e) => {
      e.preventDefault();
    if (!password || !email) {
      return;
    }

    resetForm();
    onRegister({email, password})
  }

  return (
    <div className="register-page">
      <h1 className="register-page__header">Регистрация</h1>
      <form onSubmit={handleSubmit} className="register-page__form" noValidate onChange={handleChange}>
        <input
          className={
          emailValidity
           ? "register-page__input register-page__input_type_email"
           : "register-page__input register-page__input_invalide register-page__input_type_email"}
          value={email}
          id="username"
          required
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChangeEmail}
          inputValidityState={emailValidity}
          onInputValidityChange={setEmailValidity}
          autoComplete="off"/>
        <span 
          className={
            emailValidity
              ? "register-page__error-message"
              : "register-page__error-message register-page__error-message_visible"}>
          {emailErrorMessage}
        </span>         
        <input
          className=
          {passwordValidity
          ? "register-page__input register-page__input_type_password"
          : "register-page__input register-page__input_invalide register-page__input_type_password"}
          value={password}
          id="password"
          required
          name="password"
          type="password"
          minLength="8"
          placeholder="Пароль"
          onChange={handleChangePassword}
          inputValidityState={passwordValidity}
          onInputValidityChange={setPasswordValidity}
          autoComplete="off"/>
        <span 
          className={
            passwordValidity
              ? "register-page__error-message"
              : "register-page__error-message register-page__error-message_visible"}>
          {PasswordErrorMessage}
        </span>   
        <button type="submit" 
        className={
          formValidity
          ? "register-page__submit-button"
          : "register-page__submit-button register-page__submit-button_disabled"} 
        disabled={!formValidity}>
          Зарегистрироваться
        </button>
        <Link className="page__link register-page__link" to="/signin">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}
export default Register;


