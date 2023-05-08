import { api } from "../utils/Api"
import React from "react"
import Card from "./Card"

export default function Main(props) {
  const onEditAvatar = props.onEditAvatar
  const onEditProfile = props.onEditProfile
  const onAddPlace = props.onAddPlace
  const onCardClick = props.onCardClick

  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setUserName(user.name)
        setUserDescription(user.about)
        setUserAvatar(user.avatar)
        setCards(cards)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <main className="content">

      {/* <!-- ------------- profile start ------------ --> */}
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-image" src={userAvatar} alt="Аватар автора" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__info-name">{userName}</h1>
          <p className="profile__info-profession">{userDescription}</p>
        </div>
        <button className="profile__button-edit" type="button" aria-label="Кнопка редактирования профиля" onClick={onEditProfile}> </button>
        <button className="profile__button-add" type="button" aria-label="Кнопка добавления фото" onClick={onAddPlace}> </button>
      </section>
      {/* <!-- ------------- profile end ------------ --> */}

      {/* <!-- ------------- elements start ------------ --> */}
      <section className="cards" aria-label="Фото природы России">
        <ul className="elements">
          {cards.map(card => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
            />
          ))}
        </ul>

      </section>
      {/* <!-- ------------- elements end ------------ --> */}
    </main >
  )
}