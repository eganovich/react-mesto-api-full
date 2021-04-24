import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) { 
    const [name, setName] = React.useState("");
    const [nameErrorMessage, setNameErrorMessage] = React.useState(''); // Стейт-переменная сообщения об ошибке
    const [link, setLink] = React.useState("");
    const [linkErrorMessage, setLinkErrorMessage] = React.useState(''); // Стейт-переменная сообщения об ошибке

    const [formValidity, setFormValidity] = React.useState(false); // Состояние валидности формы
    const [nameValidity, setNameValidity] = React.useState(true); // Состояние валидности инпута с названием
    const [linkValidity, setLinkValidity] = React.useState(true); // Состояние валидности инпута c ссылкой
    
    function handleName(evt) {
        setName(evt.target.value);        
        setNameValidity(evt.currentTarget.checkValidity());
        setNameErrorMessage(evt.target.validationMessage);
      }

    function handleLink(evt) {
        setLink(evt.target.value);
        setLinkValidity(evt.currentTarget.checkValidity());
        setLinkErrorMessage(evt.target.validationMessage);
      }

      function handleChange (evt) { // Изменение валидности формы
        setFormValidity(evt.currentTarget.checkValidity());
      }  
 
 function handleSubmit(e) {    
    e.preventDefault();   
    onAddPlace({
      name: name,
      link: link
    });
    setName("");
    setLink("");
    setFormValidity(false);
}

  return (
    <PopupWithForm
    title="Новое место"
    name="add-card"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    handleChange={handleChange}
    >
    <input
      type="text"
      className={
        nameValidity
        ? "modal__input modal__input_type_place-name"
        : "modal__input modal__input_invalide modal__input_type_place-name"
      }
      name="placeName"
      value={name}
      placeholder="Название"
      required
      minLength="2"
      maxLength="30"
      onChange={handleName}
      autoComplete="off"
    />
    <span className={
      nameValidity
      ? "modal__error-message"
      : "modal__error-message modal__error-message_visible"}
      id="placePhotoLink-error"
    >{nameErrorMessage}</span>
    <input
      type="url"
      pattern="^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?"
      className={
        linkValidity
        ? "modal__input modal__input_type_place-photo-link"
        : "modal__input modal__input_invalide modal__input_type_place-photo-link"
      }
      name="placePhotoLink"
      value={link}
      placeholder="Ссылка на картинку"
      required      
      onChange={handleLink}
      autoComplete="off"
    />
    <span
      className={
        linkValidity
        ? "modal__error-message"
        : "modal__error-message modal__error-message_visible"}
      id="placePhotoLink-error"
    >{linkErrorMessage}</span>
    <button
      type="submit"
      className={
        formValidity
          ? "modal__submit-button"
          : "modal__submit-button modal__submit-button_disabled"
      }
      disabled={!formValidity}
    >
      <div className="modal__default-button-text">Создать</div>
      <div className="modal__load-button-text">Сохранение...</div>
    </button>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
