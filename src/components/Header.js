import React, { Fragment } from "react";
import './Header.scss'
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <Fragment>
      <header className='header'>
        <h1>Shop</h1>
        <HeaderCartButton onClick={props.onshowOrder} />
      </header>
    </Fragment>
  );
};

export default Header;
