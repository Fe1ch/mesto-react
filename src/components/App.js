import { useState, useCallback, useEffect, useRef } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from '../utils.js/api';
import { Route, Routes, useNavigate } from "react-router-dom";
import RemoveCardPopup from "./RemoveCardPopup";


const App = () => {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cardRemove, setCardRemove] = useState({});
  const navigate = useNavigate();
  const timer = useRef();
  const [cards, setCards] = useState([]);

  const [isPreloading, setIsPreloading] = useState(false);

  useEffect(() => {
    setIsPreloading(true)
    Promise.all([api.getUserInfoProfile(), api.getInitialsCards()])
      .then(([data, cards]) => {
        setCurrentUser(data)
        setCards(cards)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsPreloading(false)
      })
  }, [])


  const handleEditProfileClick = useCallback(() => {
    setEditProfilePopupOpen(true);
  }, [])

  const handleAddPlaceClick = useCallback(() => {
    setAddPlacePopupOpen(true);
  }, [])

  const handleEditAvatarClick = useCallback(() => {
    setEditAvatarPopupOpen(true);
  }, [])

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }, [])

  const handleDeleteCardClick = useCallback((card) => {
    setIsDeleteCardPopupOpen(true);
    setCardRemove(card)
  }, [])

  const handleNavigateClose = useCallback(() => {
    timer.current = setTimeout(() => {
      navigate('/')
      clearTimeout(timer.current)
    }, 300)
  }, [navigate])

  const closeAllPopups = useCallback(() => {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsDeleteCardPopupOpen(false)
    setSelectedCard({})
    handleNavigateClose();
  }, [handleNavigateClose])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeAllPopups]);


  const handleOverlayClose = (e) => {
    if (e.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  const handleCardLike = useCallback((card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLike(card._id, isLiked)
      .then((newCard) => {
        // const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(cards => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
  }, [currentUser._id])

  const handleCardDelete = useCallback(() => {
    setIsPreloading(true)
    api.deleteCard(cardRemove._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((c) => c._id !== cardRemove._id)
        )
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsPreloading(false))
  }, [cardRemove._id, closeAllPopups])

  const handleUpdateUser = (data) => {
    setIsPreloading(true)
    api.setUserInfoProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsPreloading(false)
      )
  }

  const handleUpdateAvatar = (avatar) => {
    setIsPreloading(true)
    api.setUserAvatarProfile(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsPreloading(false))
  }
  const handleAddPlaceSubmit = (card) => {
    setIsPreloading(true)
    api.addNewCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsPreloading(false))
  }

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path='/mesto-react' element={
              <>
                <Header />
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  isPreloading={isPreloading}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCardClick}
                />
                <Footer />
              </>
            }>
              <Route path="popupEdit" element={
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  isPreloading={isPreloading}
                  onOverlayClose={handleOverlayClose}
                />}
              />
              <Route path="popupAvatar" element={
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                  isPreloading={isPreloading}
                  onOverlayClose={handleOverlayClose} />
              } />
              <Route path="popupCard" element={
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                  isPreloading={isPreloading}
                  onOverlayClose={handleOverlayClose} />
              } />
              <Route path="cards/:id" element={
                <ImagePopup
                  cards={cards}
                  card={selectedCard}
                  isOpen={isImagePopupOpen}
                  onClose={closeAllPopups}
                  onOverlayClose={handleOverlayClose} />
              } />
              <Route path="cards/popupDelete" element={
                <RemoveCardPopup
                  isOpen={isDeleteCardPopupOpen}
                  onClose={closeAllPopups}
                  isPreloading={isPreloading}
                  onOverlayClose={handleOverlayClose}
                  onRemove={handleCardDelete}
                />
              } />
            </Route>
          </Routes>
        </CurrentUserContext.Provider>
      </div>
    </div >
  );
}

export default App;