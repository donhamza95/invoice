import React from "react";
import { useRef } from "react";
import './ShopItemForm.scss'
import Input from "./Input";

const ShopItemForm = (props) => {
  const quantityInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredQuantity = quantityInputRef.current.value;
    const enteredQuantityNumber = +enteredQuantity;

    if (enteredQuantity.trim().length === 0 || enteredQuantityNumber < 1) {
      return;
    }
    props.onAddToOrder(enteredQuantityNumber);
  };
  return (
    <form className='form' onSubmit={submitHandler}>
      <Input
        ref={quantityInputRef}
        label="Quantity"
        input={{
          id: "quantity",
          type: "number",
          min: "0",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>
      <button>+ Add</button>
    </form>
  );
};

export default ShopItemForm;
