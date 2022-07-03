import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card({
  onCardClick,
  card,
  onCardLike,
  onCardDelete,
  onConfirmDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((user) => user=== currentUser._id);
  const cardDeleteButtonClassName = `button button_type_delete ${
    isOwn ? "" : "button_hidden"
  }`;
  const cardLikeButtonClassName = `button button_type_like ${
    isLiked ? "button_active" : ""
  }`;
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onConfirmDeleteClick(card);
  }
  return (
    <li className='card'>
      <div
        className='card__image'
        onClick={handleClick}
        style={{ backgroundImage: `url(${card.link})` }}
      />
      <button
        className={cardDeleteButtonClassName}
        type='button'
        aria-label='delete'
        onClick={handleDeleteClick}
      ></button>
      <div className='card__info'>
        <h2 className='card__title'>{card.name}</h2>
        <div className='card__likes'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            aria-label='like'
            onClick={handleLikeClick}
          ></button>
          <span className='card__like-counter'>{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
