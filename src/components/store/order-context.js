import React from "react";

const OrderContext = React.createContext({
    items: [],
    totalQuantity: 0,
    vat: 0,
    discount: 0,
    addItem: (item) => {},
    removeItem: (id) => {}
})

export default OrderContext;