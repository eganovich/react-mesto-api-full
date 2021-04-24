import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({
  card,
  onCardClick,
  handleCardLike,
  handleCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function onCardLike() {
    handleCardLike(card);
  }

  function onCardDelete() {
    handleCardDelete(card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки

  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `${
    isOwn ? "place__trash" : "place__trash place__trash_invisible"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем

  const isLiked = card.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `${
    isLiked
      ? "place__like-button place__like-button_active"
      : "place__like-button"
  }`;

  return (
    <li className="place">
      <div className="place__photo-cover" onClick={handleClick}>
        <img
          className="place__photo"
          alt={`Фото.${card.name}`}
          src={card.link}
        />
      </div>
      <div className="place__about">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={onCardLike}
          ></button>
          <p className="place__like-counter">{card.likes.length}</p>
        </div>
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={onCardDelete}
        ></button>
      </div>
    </li>
  );
}

export default Card;
