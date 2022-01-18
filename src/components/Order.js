import React, { useContext } from "react";
import classes from "./Order.module.css";
import Modal from "./Modal";
import OrderContext from "./store/order-context";
import CartItem from "./CartItem";

const Order = (props) => {
  const orderCtx = useContext(OrderContext);

  const totalQuantity = `$${orderCtx.totalQuantity.toFixed(2)}`;
  const totalVat = orderCtx.vat
  const priceWithVAT = orderCtx.priceWithVAT
  const newvat = orderCtx.newvat
  const hasItems = orderCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {};
  const cartItemAddHandler = (item) => {};

  const orderItems = (
    <ul className={classes[`cart-items`]}>
      {orderCtx.items.map((item) => <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />)}
    </ul>
    
  );
  console.log(totalVat,'vat')
  console.log(newvat,'newvat' )
 
  return (
    <Modal>
      {orderItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalQuantity}</span>
      </div>
      <div>{`VAT: ${totalVat}`}</div>
      <div>{`newvat: ${newvat}`}</div>
      <div>{`PRICE WITH VAT: ${priceWithVAT}`}</div>
      <div className={classes.actions}>
        <button className={classes[`button--alt`]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
   
    
  );
};

export default Order;
