import React from "react";
import './ShopItem.scss'
import ShopItemForm from "./ShopItemForm";
import { useContext } from "react";
import OrderContext from "./store/order-context";

const ShopItem = (props) => {
  const orderCtx = useContext(OrderContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToOrderHandler = (quantity) => {
    orderCtx.addItem({
      id: props.id,
      name: props.description,
      quantity: quantity,
      price: props.price,
      discount: props.discount,
      vat: props.vat,
      total: props.total
    });
  };

  return (
    <li className='meal'>
      <div>
        <h3>{props.description}</h3>
        <div className='price'>{price}</div>
        <div>{`Discount: ${props.discount}`}</div>
        <div>{`VAT: ${props.vat}`}</div>
      </div>
      <div>
        <ShopItemForm onAddToOrder={addToOrderHandler} />
      </div>
    </li>
  );
};

export default ShopItem;
