import React from "react";

function PopupWithForm({ title, name, children, isOpen, onClose, onSubmit , handleChange }) {
  return (
    <div
      className={
        isOpen
          ? `modal modal_type_${name} modal_is-open`
          : `modal modal_type_${name}`
      }
    >
      <div className="modal__overlay">
        <div className="modal__content">
          <button
            type="button"
            className="modal__close-button"
            onClick={onClose}
          ></button>
          <h3 className="modal__heading">{title}</h3>
          <form
            action="#"
            className="modal__edit-form"
            method="post"
            name={`${name}-form`}
            noValidate
            onSubmit={onSubmit}
            onChange={handleChange}            
          >
            {children}
          </form>
        </div>
      </div>
    </div>
  );
}
export default PopupWithForm;
