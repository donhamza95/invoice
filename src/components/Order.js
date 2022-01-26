import React, { useContext } from "react";
import './Order.scss'
import Modal from "./Modal";
import OrderContext from "./store/order-context";
import CartItem from "./CartItem";

const Order = (props) => {
  const orderCtx = useContext(OrderContext);

  const totalQuantity = `$${orderCtx.totalQuantity.toFixed(2)}`;
  const totalVat = orderCtx.vat;
  const priceWithVAT = orderCtx.priceWithVAT;
  const newvat = orderCtx.newvat;
  const vatper50 = orderCtx.vatper50;
  const hasItems = orderCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {};
  const cartItemAddHandler = (item) => {};

  const orderItems = (
    <ul className='cart-items'>
      {orderCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal>
      {orderItems}
      <div className='total'>
        <span>Sub Total</span>
        <span>{totalQuantity}</span>
      </div>
      {/* <div>{`VAT: ${totalVat}`}</div> */}

      <div className='total'>
        <span>Vat</span>
        <span>{newvat}</span>
      </div>
      <div className='total'>
        <span>TOTAL</span>
        <span>{`$${priceWithVAT}`}</span>
      </div>
      <div className='actions'>
        <button className='button--alt' onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className='button'>Order</button>}
      </div>
    </Modal>
  );
};

export default Order;
