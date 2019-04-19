import React from "react";

const headerH1 = `Quotes`;
const Header = () => {
  return (
    <div className="header">
      <div className="header__site--name"><p>Quotstr</p></div>
      <div className="header__header"></div>
      <div className="header__words">
        <h1 className="header__h1">{headerH1}</h1>
        <p className="header__sub">{'scraped from the web with love'}</p>
      </div>
      <div className="header__svgs">
        <span className="header__svg">
          <svg className="header--svg">
            <use xlinkHref="./img/sprite.svg#icon-twitter2" />
          </svg>
        </span>
        <span className="header__svg">
          <svg className="header--svg">
            <use xlinkHref="./img/sprite.svg#icon-github" />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default Header;
