import React ,{Fragment} from 'react'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'
const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
            <h1>Shop</h1> 
            <HeaderCartButton onClick={props.onshowOrder} />
            </header>
        </Fragment>
    )
}

export default Header
