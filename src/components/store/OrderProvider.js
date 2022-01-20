import React from "react";
import OrderContext from "./order-context";
import { useReducer } from "react";

const defaulOrderState = {
  items: [],
  totalQuantity: 0,
  vat: 0,
  discount: 0,
  newvat: 0,
};
const orderReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingOrderItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingOrderItem = state.items[existingOrderItemIndex];

    let updatedItem;
    let updatedItems;

    updatedItem = { ...action.item };
    updatedItems = state.items.concat(updatedItem);

    console.log(updatedItem, "uI");

    // const updatedItems = state.items.concat(action.item)
    const updatedPrice = action.item.price - action.item.discount;
    // const updatedTotalQuantity = state.totalQuantity + action.item.price * action.item.quantity
    const updatedPricePerItem = updatedPrice * action.item.quantity;
    const updatedTotalQuantity =
      state.totalQuantity + updatedPrice * action.item.quantity;

    const updatedVat = action.item.vat * (action.item.quantity * updatedPrice);
    const vatper50 = action.item.vat * (50 * updatedPrice);
    const totalPerItem = updatedVat + updatedPricePerItem;
    const allVat = state.newvat + updatedVat;
    const updatedTotalQuantityVAT = allVat + updatedTotalQuantity;

    console.log(updatedVat, "udpatedVAT");
    console.log(vatper50, "vatper50");
    return {
      totalPerItem: totalPerItem,
      pricePerItem: updatedPricePerItem,
      items: updatedItems,
      totalQuantity: updatedTotalQuantity,
      vat: updatedVat,
      priceWithVAT: updatedTotalQuantityVAT,
      newvat: allVat,
      vatper50: vatper50,
    };
  }

  return defaulOrderState;
};

const OrderProvider = (props) => {
  const [orderState, dispatchOrderaction] = useReducer(
    orderReducer,
    defaulOrderState
  );

  const addItemToOrderHandler = (item) => {
    dispatchOrderaction({ type: "ADD", item: item });
  };
  const removeItemToOrderHandler = (id) => {
    dispatchOrderaction({ type: "REMOVE", id: id });
  };

  const orderContext = {
    items: orderState.items,
    totalPerItem: orderState.totalPerItem,
    totalQuantity: orderState.totalQuantity,
    vat: orderState.vat,
    pricePerItem: orderState.pricePerItem,
    priceWithVAT: orderState.priceWithVAT,
    newvat: orderState.newvat,
    vatper50: orderState.vatper50,
    addItem: addItemToOrderHandler,
    removeItem: removeItemToOrderHandler,
  };

  return (
    <div>
      <OrderContext.Provider value={orderContext}>
        {props.children}
      </OrderContext.Provider>
    </div>
  );
};

export default OrderProvider;
