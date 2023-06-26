import React from 'react';

export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_image">
        <button className="popup__close" type="button" aria-label="Закрыть окно" onClick={onClose} />
        <img className="popup__photo" src={card.link} alt={card.name} />
        <figcaption className="popup__photo-subtitle">{card.name}</figcaption>
      </div>
    </div>
  )
}
