import React from "react";
import PopupWithForm from "./PopupWithForm"
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = React.useState("");
    const [nameErrorMessage, setNameErrorMessage] = React.useState(''); // Стейт-переменная сообщения об ошибке
    const [description, setDescription] = React.useState("");
    const [descriptionErrorMessage, setdescriptionErrorMessage] = React.useState(''); // Стейт-переменная сообщения об ошибке
    const currentUser = React.useContext(CurrentUserContext);

    const [formValidity, setFormValidity] = React.useState(true); // Состояние валидности формы
    const [nameValidity, setNameValidity] = React.useState(true); // Состояние валидности инпута с именем
    const [descriptionValidity, setdescriptionValidity] = React.useState(true); // Состояние валидности инпута c описанием

    function handleNameChange(evt) {
        setName(evt.target.value);
        setNameValidity(evt.currentTarget.checkValidity());
        setNameErrorMessage(evt.target.validationMessage);        
      }
      function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
        setdescriptionValidity(evt.currentTarget.checkValidity());
        setdescriptionErrorMessage(evt.target.validationMessage);        
      }
      
      function handleChange (evt) { // Изменение валидности формы
        setFormValidity(evt.currentTarget.checkValidity());
      }  
      
      function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();      
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name: name,
          about: description,
        });
      }

      React.useEffect(() => {
        debugger;
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
      }, [currentUser]);


    return (
        <PopupWithForm
          title="Редактировать профиль"
          name="edit-profile"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          handleChange={handleChange}
        >
          <input
            type="text"
            className={
              nameValidity
              ? "modal__input modal__input_type_name"
              : "modal__input modal__input_invalide modal__input_type_name"
            }
            name="name"
            value={name}
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            onChange={handleNameChange}
            autoComplete="off"
          />
          <span className={
      nameValidity
      ? "modal__error-message"
      : "modal__error-message modal__error-message_visible"}
       id="name-error">{nameErrorMessage}</span>
          <input
            type="text"
            className={
              descriptionValidity
              ? "modal__input modal__input_type_about"
              : "modal__input modal__input_invalide modal__input_type_about"
            }
            name="about"
            value={description}
            placeholder="Работа"
            required
            minLength="2"
            maxLength="200"
            onChange={handleDescriptionChange}
            autoComplete="off"
          />
          <span  className={
      descriptionValidity
      ? "modal__error-message"
      : "modal__error-message modal__error-message_visible"} 
      id="about-error">{descriptionErrorMessage}</span>
          <button type="submit" className={
        formValidity
          ? "modal__submit-button"
          : "modal__submit-button modal__submit-button_disabled"
      }
      disabled={!formValidity}>
            <div className="modal__default-button-text">Сохранить</div>
            <div className="modal__load-button-text">Сохранение...</div>
          </button>
        </PopupWithForm>
    );
  }
  export default EditProfilePopup;