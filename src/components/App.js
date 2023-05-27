import React from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import PopupWithForm from "./PopupWithForm"
import ImagePopup from "./ImagePopup"
import { api } from "../utils/Api"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import EditProfilePopup from "./EditProfilePopup"


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

  // function handleDeleteCardClick() {
  //   setDeleteCardPopupOpen(true)
  // }

  function handleCardClick(card) {
    setSelectedCard({ name: `${card.name}`, link: `${card.link}` })
  }

  function handleLikeClick(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch(err => console.log(err))
  }

  function handleUpdateUser(data) {
    api.editProfile(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch((err) => console.log(err))
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
          // onDeleteButton={handleDeleteCardClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleLikeClick}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm name="add" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} >
          <input className="popup__input" id="input-title" name="title" type="text" placeholder="Название" minLength="2" maxLength="30" required />
          <span className="popup__input-error input-title-error">Вы пропустили это поле</span>
          <input className="popup__input" id="input-link" name="link" type="url" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error input-link-error">Вы пропустили это поле</span>
        </PopupWithForm>


        <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} >
          <input className="popup__input" id="input-link-avatar" name="link" type="url" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error input-link-avatar-error">Вы пропустили это поле</span>
        </PopupWithForm>


        <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
