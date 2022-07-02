import { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as validate from '../utils/validateForm';
import useForm from '../utils/useForm';
function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { handleChange, onSubmit, values, errors, isErrorFree } = useForm(
    validate.validateUserInfo
  );
  const handleSubmit = (e) => {
    onSubmit(e);
    if (isErrorFree) {
      onUpdateUser({
        name: values.name,
        about: values.description,
      });
    }
  };

  useEffect(() => {
    values.name = currentUser.name;
    values.description = currentUser.about;
    errors.name = '';
    errors.description = '';
  }, [currentUser]);

  return (
    <PopupWithForm
      name='profile'
      title='Edit profile'
      submitButton='Save'
      loadingButton='Saving..'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        id='name-input'
        name='name'
        className='popup__input popup__input_type_name selected-input'
        type='text'
        placeholder='Name'
        minLength='2'
        maxLength='40'
        value={values.name}
        onChange={handleChange}
        required
      />
      <span className={`popup__error ${errors.name && 'popup__error_visible'}`}>
        {errors.name}
      </span>
      <input
        id='job-input'
        name='description'
        className='popup__input popup__input_type_job selected-input'
        type='text'
        placeholder='About me'
        minLength='2'
        maxLength='200'
        value={values.description}
        onChange={handleChange}
        required
      />
      <span
        className={`popup__error ${
          errors.description && 'popup__error_visible'
        }`}
      >
        {errors.description}
      </span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
