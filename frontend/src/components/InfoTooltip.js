function InfoTooltip({ name, isOpen, onClose, isSignUpSuccessful }) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className='popup__container'>
        <button
          className='button button_type_close button_location_tooltip'
          type='button'
          aria-label='close'
          onClick={onClose}
        ></button>
        <div className='tooltip'>
          <div
            className={`tooltip__logo ${
              isSignUpSuccessful
                ? 'tooltip__logo_success'
                : 'tooltip__logo_failure'
            }`}
          ></div>
          <h2 className='tooltip__text'>{`${
            isSignUpSuccessful
              ? 'Success! You have now been registered.'
              : 'Oops, something went wrong! Please try again.'
          }`}</h2>
        </div>
      </div>
    </section>
  );
}
export default InfoTooltip;
