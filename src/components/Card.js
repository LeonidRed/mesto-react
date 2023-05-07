export default function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="element">
      <button className="element__button-del" type="button" aria-label="Кнопка удалить"></button>
      <img className="element__picture" src={props.link} alt={props.name} onClick={handleClick} />
      <div className="element__area">
        <h2 className="element__area-title">{props.name}</h2>
        <div className="element__area-like-section">
          <button className="element__area-like" type="button" aria-label="Кнопка нравится"></button>
          <p className="element__area-like-counter">{props.likes.length}</p>
        </div>
      </div>
    </li>
  )
}