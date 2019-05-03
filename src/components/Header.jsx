import React from 'react';

import '../scss/components/header.scss'

const Header = () => {
  return (
    <div className="header">
      <div className="header--contents">
      <div className="header__name">  
        <p className="header__name--quotstr">Quotstr</p>
        <p className="header__name--sub">quotes scraped from the web with love</p>
      </div>
      </div>
    </div>
  )
}

export default Header;