import React from "react";

function InfoTooltip({ isOpen, onClose, message, tooltipPic}) {
  return (
    <div
      className={
        isOpen
          ? `modal modal_type_info-tooltip modal_is-open`
          : `modal modal_type_info-tooltip`
      }
    >
      <div className="modal__overlay">
        <div className="modal__content">
          <button
            type="button"
            className="modal__close-button"
            onClick={onClose}
          ></button>
          <div 
            className={
                tooltipPic
                ? `modal__tooltip-pic modal__tooltip-pic_type_succes`
                : `modal__tooltip-pic modal__tooltip-pic_type_error`
            }>
          </div>
          <h3 className="modal__tooltip-message">{message}</h3>
          </div>
      </div>
    </div>
  );
}
export default InfoTooltip;
