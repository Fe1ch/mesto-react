
const BurgerMenu = ({ isOpen, toggleMenu }) => {

  return (
    <>
      <button className={`header__burger ${isOpen ? 'header__burger_active' : ''}`} type="button" onClick={() => toggleMenu()}>
        <span className="header__burger-line" />
      </button>
    </>
  )
}
export default BurgerMenu