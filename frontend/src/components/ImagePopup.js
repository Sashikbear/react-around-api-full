function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_type_zoom-card  ${card ? "popup_opened" : ""}`}
    >
      <div className='popup__zoom-wrapper'>
        <button
          className='button button_type_close button_location_zoom-card'
          type='button'
          aria-label='close'
          onClick={onClose}
        ></button>
        <img
          className='popup__image'
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <p className='popup__title'>{card ? card.name : ""}</p>
      </div>
    </section>
  );
}
export default ImagePopup;
