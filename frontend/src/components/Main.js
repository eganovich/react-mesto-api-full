import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";

import Card from "./Card";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,  
  cards,
  onCardLike,
  onCardDelete,
  props

}) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div
            className="profile__avatar"
            onClick={onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
          <div className="profile__about-container">
            <div className="profile__name-button-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="places">
          {cards.map((card) => {
            
            return (
              <Card
                key={card._id}   
                card={card}
                onCardClick={onCardClick}                
                handleCardLike={onCardLike}
                handleCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
      
    <EditProfilePopup
    isOpen={props.isEditProfilePopupOpen}
    onClose={props.closeAllPopups}
    onUpdateUser={props.handleUpdateUser}
  />

  <AddPlacePopup
    isOpen={props.isAddPlacePopupOpen}
    onClose={props.closeAllPopups}
    onAddPlace={props.handleAddPlaceSubmit}
  />

  <EditAvatarPopup
    isOpen={props.isEditAvatarPopupOpen}
    onClose={props.closeAllPopups}
    onUpdateAvatar={props.handleUpdateAvatar}
  />

  <PopupWithForm title="Вы уверены?" name="delete-card">
    <button type="submit" className="modal__confirm-button">
      <div className="modal__default-button-text">Да</div>
      <div className="modal__load-button-text">Сохранение...</div>
    </button>
  </PopupWithForm>

  <ImagePopup
    selectedCard={props.selectedCard}
    isOpen={props.isCardSelected}
    onClose={props.closeAllPopups}
  /> 
    </main>
  );
}

export default Main;
