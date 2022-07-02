import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import * as validate from '../utils/validateForm';
import useForm from '../utils/useForm';
function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, isLoading }) {
  const { handleChange, onSubmit, values, errors, isErrorFree } = useForm(
    validate.validateNewCard
  );
  const handleSubmit = (e) => {
    onSubmit(e);
    if (isErrorFree) {
      const newCard = { name: values.title, link: values.link };
      onAddPlaceSubmit(newCard);
    }
  };

  useEffect(() => {
    values.title = '';
    errors.title = '';
    values.link = '';
    errors.link = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name='add-card'
      title='New Place'
      submitButton='Create'
      loadingButton='Saving..'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        id='title-input'
        name='title'
        className='popup__input popup__input_type_image-title selected-input'
        type='text'
        placeholder='Title'
        minLength='1'
        maxLength='30'
        onChange={handleChange}
        value={values.title}
        required
      />
      <span
        className={`popup__error ${errors.title && 'popup__error_visible'}`}
      >
        {errors.title}
      </span>
      <input
        id='url-input'
        type='url'
        name='link'
        className='popup__input popup__input_type_image-link selected-input'
        placeholder='Image Link'
        onChange={handleChange}
        value={values.link}
        required
      />
      <span className={`popup__error ${errors.link && 'popup__error_visible'}`}>
        {errors.link}
      </span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
