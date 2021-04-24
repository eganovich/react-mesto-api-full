import React, { useState } from "react";

function Login({ onLogin }) {
  

  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = React.useState(''); // Стейт-переменная сообщения об ошибке
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState(''); // Стейт-переменная сообщения об ошибке

  const [formValidity, setFormValidity] = React.useState(false); // Состояние валидности формы
  const [emailValidity, setEmailValidity] = React.useState(true); // Состояние валидности инпута с email
  const [passwordValidity, setPasswordValidity] = React.useState(true); // Состояние валидности инпута c паролем


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


  const handleSubmit = (e) => {
    e.preventDefault();
    

    if (!email || !password) {
      return;
    }

    onLogin({email, password})
  };

  return (
    <div  onSubmit={handleSubmit}  className="login-page">
      <h1 className="login-page__header">Вход</h1>
      <form className="login-page__form" noValidate onChange={handleChange}>
        <input
          className=
          {
          emailValidity
          ? "login-page__input login-page__input_type_email"
          : "login-page__input login-page__input_type_email login-page__input_invalide"}
          value={email}
          id="email"
          required
          name="email" 
          type="email"
          placeholder="Email"
          onChange={handleChangeEmail}
          inputValidityState={emailValidity}
          onInputValidityChange={setEmailValidity}
          autoComplete="off"
        />
        <span 
          className={
            emailValidity
              ? "login-page__error-message"
              : "login-page__error-message login-page__error-message_visible"}>
          {emailErrorMessage}
        </span>
        <input
          className={
          passwordValidity
            ? "login-page__input login-page__input_type_password"
            : "login-page__input login-page__input_invalide login-page__input_type_password"}
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
          autoComplete="off"
        />
        <span 
          className={
            passwordValidity
              ? "login-page__error-message"
              : "login-page__error-message login-page__error-message_visible"}>
          {passwordErrorMessage}
        </span>
        <button type="submit" className={
          formValidity
          ? "login-page__submit-button"
          : "login-page__submit-button login-page__submit-button_disabled"} 
        disabled={!formValidity}>
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;
