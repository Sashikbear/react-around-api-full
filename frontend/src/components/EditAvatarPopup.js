import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import * as validate from '../utils/validateForm';
import useForm from '../utils/useForm';
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { handleChange, onSubmit, values, errors, isErrorFree } = useForm(
    validate.validateAvatar
  );

  useEffect(() => {
    values.avatar = '';
    errors.avatar = '';
  }, [isOpen]);

  function handleSubmit(e) {
    onSubmit(e);
    if (isErrorFree) {
      onUpdateAvatar({
        avatar: values.avatar,
      });
    }
  }
  return (
    <PopupWithForm
      name='avatar'
      title='Change profile picture'
      submitButton='Save'
      loadingButton='Saving..'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        id='avatar-input'
        type='url'
        name='avatar'
        className='popup__input popup__input_type_image-link selected-input'
        placeholder='Image Link'
        value={values.avatar}
        onChange={handleChange}
        required
      />
      <span
        className={`popup__error ${errors.avatar && 'popup__error_visible'}`}
      >
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
