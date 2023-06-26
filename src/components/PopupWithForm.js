
const PopupWithForm = ({ name, title, buttonText, isOpen, onClose, children }) => {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`} >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form popup__form_type_card" name={`form-${name}`} noValidate>
          {children}
          <button className="popup__button" type="submit" disabled>{buttonText}</button>
        </form>
        <button className="popup__close popup__close_type_new-card" type="button"
          aria-label="Закрыть окно" onClick={onClose} />
      </div>
    </section >
  )
}
export default PopupWithForm
