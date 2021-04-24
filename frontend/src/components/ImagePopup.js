import React from "react";

function ImagePopup({ selectedCard, isOpen, onClose }) {
  
  return (
    <div
      className={
        isOpen
          ? "modal modal_type_photo modal_is-open"
          : "modal modal_type_photo"
      }
    >
      <div className="modal__overlay">
        <div className="modal__content-photo">
          <button
            type="button"
            className="modal__close-button"
            onClick={onClose}
          ></button>
          <img className="modal__photo" alt={`Фото.${selectedCard.name}`} src={selectedCard.link} />
          <h3 className="modal__photo-title">{selectedCard.name}</h3>
        </div>
      </div>
    </div>
  );
}
export default ImagePopup;
