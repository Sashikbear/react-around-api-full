import { Link } from 'react-router-dom';
import { useState } from 'react';
import headerLogo from '../images/header-logo.svg';
function Header({
  isLoggedIn,
  onSignOut,
  linkTo,
  linkText,
  userEmail,
  isMobileSize,
  ...props
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleHamburgerMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <header className='header'>
      <div
        className={`header__loggedin-container ${
          (!isMenuOpen || !isMobileSize) && 'header__loggedin-container_closed'
        }`}
      >
        <p className='header__user-email'>{userEmail}</p>
        <div onClick={onSignOut} className='header__link'>
          <Link
            className='header__link'
            to={'/signin'}
            style={{ textDecoration: 'inherit' }}
          >
            {'Log out'}
          </Link>
        </div>
      </div>
      <div className='header__container'>
        <img
          className='header__logo'
          src={headerLogo}
          alt='Around the U.S. logo'
        />
        {isLoggedIn && isMobileSize && (
          <>
            <div
              onClick={handleHamburgerMenuClick}
              className={`header__hamburger-menu ${
                !isMenuOpen
                  ? 'header__hamburger-menu_open'
                  : 'header__hamburger-menu_close'
              }`}
            ></div>
          </>
        )}
        {isLoggedIn && !isMobileSize && (
          <div className='header__loggedin-container'>
            <p className='header__user-email'>{userEmail}</p>
            <div onClick={onSignOut} className='header__link'>
              <Link
                className='header__link'
                to={'/signin'}
                style={{ textDecoration: 'inherit' }}
              >
                {'Log out'}
              </Link>
            </div>
          </div>
        )}
        {!isLoggedIn && (
          <Link
            className='header__link'
            to={linkTo}
            style={{ textDecoration: 'inherit' }}
          >
            {linkText}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
