import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
function Main({
  onEditProfileClick,
  onEditAvatarClick,
  onAddPlaceClick,
  onCardClick,
  onConfirmDeleteClick,
  cards,
  onCardDelete,
  onCardLike,
  isLoggedIn,
  onSignOut,
  userEmail,
  isMobileSize,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      {' '}
      <Header
        isLoggedIn={isLoggedIn}
        onSignOut={onSignOut}
        userEmail={userEmail}
        isMobileSize={isMobileSize}
      />
      <main className='main'>
        <section className='profile'>
          <div className='profile__column'>
            <div className='profile__image-area'>
              <div
                className='profile__image'
                style={{ backgroundImage: `url(${currentUser.avatar})` }}
              ></div>
              <div
                className='profile__image-overlay'
                onClick={onEditAvatarClick}
              ></div>
            </div>

            <div className='profile__info'>
              <div className='profile__user'>
                <h1 className='profile__user-name'>{currentUser.name}</h1>

                <button
                  className='button button_type_edit'
                  type='button'
                  aria-label='edit'
                  onClick={onEditProfileClick}
                ></button>
              </div>
              <p className='profile__user-job'>{currentUser.about}</p>
            </div>
          </div>

          <button
            className='button button_type_add'
            type='button'
            aria-label='add'
            onClick={onAddPlaceClick}
          ></button>
        </section>

        <section className='cards'>
          <ul className='cards__card-grid'>
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onConfirmDeleteClick={onConfirmDeleteClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
