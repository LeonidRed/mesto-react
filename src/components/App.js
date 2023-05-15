import React from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import PopupWithForm from "./PopupWithForm"
import ImagePopup from "./ImagePopup"
import { api } from "../utils/Api"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' })
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

  // React.useEffect(() => {
  //   api.getUserInfo()
  //     .then(user => {
  //       setCurrentUser(user)
  //     })
  //     .catch(err => console.log(err))
  // }, [])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user)
        setCards(cards)
      })
      .catch(err => console.log(err))
  }, [])

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

  function handleCardClick(card) {
    setSelectedCard({ name: `${card.name}`, link: `${card.link}` })
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setDeleteCardPopupOpen(false)
    setSelectedCard({ name: '', link: '' })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      < div className="page">

        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onDeleteButton={handleDeleteCardClick}
          onCardClick={handleCardClick}
          card={cards}
        />
        <Footer />

        <PopupWithForm name="profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} >
          <input className="popup__input" id="input-name" name="name" type="text" placeholder="Введите имя" minLength="2" maxLength="40" required />
          <span className="popup__input-error input-name-error">Вы пропустили это поле</span>
          <input className="popup__input" id="input-prof" name="prof" type="text" placeholder="Введите профессию" minLength="2" maxLength="200" required />
          <span className="popup__input-error input-prof-error">Вы пропустили это поле</span>
        </PopupWithForm>

        <PopupWithForm name="add" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} >
          <input className="popup__input" id="input-title" name="title" type="text" placeholder="Название" minLength="2" maxLength="30" required />
          <span className="popup__input-error input-title-error">Вы пропустили это поле</span>
          <input className="popup__input" id="input-link" name="link" type="url" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error input-link-error">Вы пропустили это поле</span>
        </PopupWithForm>
      />

        <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} >
          <input className="popup__input" id="input-link-avatar" name="link" type="url" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error input-link-avatar-error">Вы пропустили это поле</span>
        </PopupWithForm>
      />

        <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
