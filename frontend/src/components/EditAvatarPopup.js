import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) { 

 const [avatar, setAvatar] = React.useState('');
 const [avatarLinkErrorMessage, setAvatarLinkErrorMessage] = React.useState(''); // Стейт-переменная сообщения об ошибке  
 
 const [formValidity, setFormValidity] = React.useState(false); // Состояние валидности формы
 const [avatarLinkValidity, setAvatarLinkValidity] = React.useState(true); // Состояние валидности инпута c ссылкой на аватар

 function handleAvatar(evt) {
  setAvatar(evt.target.value);
  setAvatarLinkValidity(evt.currentTarget.checkValidity());
  setAvatarLinkErrorMessage(evt.target.validationMessage);
}

function handleChange (evt) { // Изменение валидности формы
  setFormValidity(evt.currentTarget.checkValidity());
} 

 function handleSubmit(e) {    
     e.preventDefault();
    onUpdateAvatar({
      avatar: avatar,
    });
    setAvatar('');
    setFormValidity(false);
}

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      handleChange={handleChange}
    >
      <input
        type="url"        
        pattern="^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?"
        className={
          avatarLinkValidity
          ? "modal__input modal__input_type_avatar-link"
          : "modal__input modal__input_invalide modal__input_type_avatar-link"
        }
        name="avatar"         
        value={avatar}            
        placeholder="Ссылка на аватар"
        onChange={handleAvatar}
        required
        autoComplete="off"
      />
      <span className={
        avatarLinkValidity
        ? "modal__error-message"
        : "modal__error-message modal__error-message_visible"
      } 
      id="avatar-error">{avatarLinkErrorMessage}</span>
      <button type="submit" className={
        formValidity
          ? "modal__submit-button"
          : "modal__submit-button modal__submit-button_disabled"
      }
      disabled={!formValidity}
    >
        <div className="modal__default-button-text">Да</div>
        <div className="modal__load-button-text">Сохранение...</div>
      </button>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
