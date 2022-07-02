import Footer from './Footer';
import Main from './Main';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import { useNavigate } from 'react-router-dom';
import * as constants from '../utils/constants';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
  });
  const [cards, setCards] = useState([]);
  const [selectedToDeleteCard, setSelectedToDeleteCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);
  const [userData, setUserData] = useState({});
  const [isMobileSize, setIsMobileSize] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth > constants.MOBILE_WIDTH) {
      setIsMobileSize(false);
    } else {
      setIsMobileSize(true);
    }
  }, []);
  // doesn't work on mount so leaving the separate on mount useEffect above
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > constants.MOBILE_WIDTH) {
        setIsMobileSize(false);
      } else {
        setIsMobileSize(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileSize]);

  useEffect(() => {
    checkToken();
  }, []);

  // check token and navigate to content on success
  function checkToken() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (!res) {
            throw new Error('Something went wrong! ');
          }
          const userData = { id: res.data._id, email: res.data.email };
          setIsLoggedIn(true);
          setUserData(userData);
        })
        .then(() => {
          navigate('/', { replace: true });
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
          if (constants.ERROR_CODE(err) === '401') {
            throw new Error('The provided token is invalid');
          }
          if (constants.ERROR_CODE(err) === '400') {
            throw new Error(
              'Token not provided or provided in the wrong format'
            );
          }
        });
    }
  }

  // sign up

  function handleRegister(email, password) {
    if (!email || !password) {
      return;
    }
    auth
      .register(email, password)

      .then((res) => {
        if (!res) {
          setIsInfoTooltipPopupOpen(true);
          throw new Error('Something went wrong! ');
        } else {
          setIsSignUpSuccessful(true);
          setIsInfoTooltipPopupOpen(true);
          navigate('/signin', { replace: true });
        }
        return res;
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
        if (constants.ERROR_CODE(err) === '400') {
          setIsInfoTooltipPopupOpen(true);
          setIsSignUpSuccessful(false);
          throw new Error('One of the fields was filled in incorrectly ');
        }
      });
  }

  // sign in

  function handleLogin(email, password) {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((res) => {
        if (!res) {
          throw new Error('Something went wrong!');
        }
        api.updateToken(res.token);
        setIsLoggedIn(true);
        setUserData(userData);
      })

      .then(() => {
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
        if (constants.ERROR_CODE(err) === '401') {
          throw new Error('The user with the specified email not found ');
        }
        if (constants.ERROR_CODE(err) === '400') {
          throw new Error('One or more of the fields were not provided');
        }
      });
  }

  // sign out

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/signin', { replace: true });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        closeAllPopups();
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);

  useEffect(() => {
    const handleClickClose = (e) => {
      if (e.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    };

    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };

    if (
      isEditProfilePopupOpen ||
      isEditAvatarPopupOpen ||
      isAddPlacePopupOpen ||
      isConfirmDeletePopupOpen ||
      isInfoTooltipPopupOpen ||
      selectedCard
    ) {
      document.addEventListener('mousedown', handleClickClose);
      document.addEventListener('keydown', handleEscClose);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickClose);
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    isConfirmDeletePopupOpen,
    isInfoTooltipPopupOpen,
    selectedCard,
  ]);
  function handleEditAvatarClick() {
    // formValidators['form-avatar'].resetValidation();
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    // formValidators['form-profile'].resetValidation();
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    // formValidators['form-add-card'].resetValidation();
    setIsAddPlacePopupOpen(true);
  }
  const handleConfirmDeleteClick = (card) => {
    setIsConfirmDeletePopupOpen(true);
    setSelectedToDeleteCard(card);
  };
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
    setSelectedToDeleteCard(null);
  }
  function handleUpdateUser(currentUser) {
    setIsLoading(true);
    api
      .editProfile({ name: currentUser.name, about: currentUser.about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
        if (constants.ERROR_CODE(err) === '400') {
          throw new Error('One of the fields was filled in incorrectly ');
        }
      });
  }
  function handleUpdateAvatar(currentUser) {
    setIsLoading(true);
    api
      .editAvatar({ avatar: currentUser.avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
        if (constants.ERROR_CODE(err) === '400') {
          throw new Error('Url not provided or provided in the wrong format');
        }
      });
  }
  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api
      .createCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);

        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
        if (constants.ERROR_CODE(err) === '400') {
          throw new Error('One of the fields was filled in incorrectly ');
        }
      });
  }

  return (
    <div className='page'>
      <div className='wrapper'>
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} redirectPath='/signin'>
                  <Main
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    onConfirmDeleteClick={handleConfirmDeleteClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    isLoggedIn={isLoggedIn}
                    onSignOut={handleSignOut}
                    userEmail={userData.email}
                    isMobileSize={isMobileSize}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path='signup'
              element={<Register name='signup' onRegister={handleRegister} />}
            />
            <Route
              path='signin'
              element={<Login name='signin' onLogin={handleLogin} />}
            />
          </Routes>
          <EditProfilePopup
            isLoading={isLoading}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isLoading={isLoading}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isLoading={isLoading}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <ConfirmDeletePopup
            isLoading={isLoading}
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            card={selectedToDeleteCard}
          />
          <InfoTooltip
            name='tooltip'
            isSignUpSuccessful={isSignUpSuccessful}
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
          />
          <Footer />{' '}
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
