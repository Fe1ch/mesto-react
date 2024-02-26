import { memo } from 'react';
import ThemeSwitch from './ThemeSwitch';

const Header = () => {

  return (
    <header className="header">
      <div className="header__logo"></div>
      <ThemeSwitch />
    </header >
  )
}

export default memo(Header)