import { useContext } from "react";
import React from "react";

import OrderContext from "./store/order-context";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const orderCtx = useContext(OrderContext);

  const numberOfItemsOrdered = orderCtx.items.reduce((currentOrder, item) => {
    return currentOrder + item.quantity;
  }, 0);
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItemsOrdered}</span>
    </button>
  );
};

export default HeaderCartButton;
