
const Card = ({ card, onCardClick }) => {
  const handleCardClick = () => { onCardClick(card) }

  return (
    <li className="element">
      <img className="element__photo" src={card.link} alt={card.name} onClick={handleCardClick} />
      <button className="element__delete-icon" type="button" aria-label="Удалить" />
      <div className="element__group">
        <h2 className="element__subtitle">{card.name}</h2>
        <div className="element__likes-container">
          <button className="element__like" type="button" aria-label="Лайк" />
          <span className="element__count-like">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card