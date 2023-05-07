import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleDeleteCardClick() {
    setDeleteCardPopupOpen(true)
  }

  function handleCardClick(data) {
    setSelectedCard(data)
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(false)


  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setDeleteCardPopupOpen(false)
    setSelectedCard(false)
  }

  return (
    <div className="page">

      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onDeleteButton={handleDeleteCardClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm name="profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
        children={
          <>
            <input className="popup__input" id="input-name" name="name" type="text" placeholder="Введите имя" minLength="2" maxLength="40" required />
            <span className="popup__input-error input-name-error">Вы пропустили это поле</span>
            <input className="popup__input" id="input-prof" name="prof" type="text" placeholder="Введите профессию" minLength="2" maxLength="200" required />
            <span className="popup__input-error input-prof-error">Вы пропустили это поле</span>
          </>
        }
      />

      <PopupWithForm name="add" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
        children={
          <>
            <input className="popup__input" id="input-title" name="title" type="text" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="popup__input-error input-title-error">Вы пропустили это поле</span>
            <input className="popup__input" id="input-link" name="link" type="url" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error input-link-error">Вы пропустили это поле</span>
          </>
        }
      />

      <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
        children={
          <>
            <input className="popup__input" id="input-link-avatar" name="link" type="url" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error input-link-avatar-error">Вы пропустили это поле</span>
          </>
        }
      />

      <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </div>
  )
}

export default App;