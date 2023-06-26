import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useCallback } from "react";

const App = () => {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})

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
    setIsImagePopupOpen(true)
  }, [])

  const closeAllPopups = useCallback(() => {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setSelectedCard({})
  }, [])

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input id="input-name" className="popup__input popup__input_type_profile-name" required type="text"
            name="name" placeholder="Имя" minLength="2" maxLength="40" />
          <span className="popup__input-error" id="input-name-error"></span>
          <input id="input-job" className="popup__input popup__input_type_profile-job" required type="text"
            name="about" placeholder="О себе" minLength="2" maxLength="200" />
          <span className="popup__input-error" id="input-job-error"></span>
        </PopupWithForm>


        <PopupWithForm
          name="new-card"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input id="input-card-name" className="popup__input popup__input_type_card-name" required type="text"
            name="name" placeholder="Название" minLength="2" maxLength="30" />
          <span className="popup__input-error" id="input-card-name-error"></span>
          <input id="input-card-link" className="popup__input  popup__input_type_card-link" required type="url"
            name="link" placeholder="Ссылка на картинку" />
          <span className="popup__input-error" id="input-card-link-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="avatar"
          title="ОБновить аватар"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input id="input-avatar-link" className="popup__input  popup__input_type_avatar-link" required
            type="url" name="avatar" placeholder="Добавьте ссылку на аватар" />
          <span className="popup__input-error" id="input-avatar-link-error"></span>
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        >
        </ImagePopup>

      </div>
    </div >
  );
}

export default App;