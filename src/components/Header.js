import { memo, useEffect, useState } from 'react';

const Header = () => {

  const [indicator, setIndicator] = useState(false);

  const handleToggleContainer = indicator ? 'header__container_active' : '';
  const handleToggleIndicator = indicator ? 'header__indicator_active' : '';
  const handleToggleIcon = indicator ? 'header__icon_active' : '';


  const switchTheme = () => {
    setIndicator(state => !state)
    const lightMode = document.body.toggleAttribute('lightmode');
    localStorage.setItem('theme', lightMode ? 'light' : 'dark');
  }
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      switchTheme();
    }
  }, [])


  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className={`header__container ${handleToggleContainer}`}>
        <i onClick={() => switchTheme()} className={`header__indicator ${handleToggleIndicator}`} />
        <i className={`header__icon ${handleToggleIcon}`} />
      </div>
    </header >
  )
}

export default memo(Header)