import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({
  card,
  isOpen,
  onClose,
  onCardDelete,
  isLoading,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }
  return (
    <PopupWithForm
      name='confirm-delete'
      title='Are you sure?'
      loadingButton='Deleting..'
      submitButton='Yes'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    ></PopupWithForm>
  );
}
export default ConfirmDeletePopup;
