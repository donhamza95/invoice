import React from "react";
import ShopItem from "./ShopItem";
import classes from "./ShopItems.module.css";
import Card from "./Card";

const products = [
  {
    id: "1",
    desription: "Bottles of water",
    quantinty: "",
    price: 0.25,
    discount: "0",
    vat: 0.08,
    total: "",
  },
  {
    id: "2",
    desription: "Chips",
    quantinty: "",
    price: 2.4,
    discount: "0",
    vat: 0.08,
    total: "",
  },
  {
    id: "3",
    desription: "Coca Cola",
    quantinty: "",
    price: 0.5,
    discount: 0.1,
    vat: 0.18,
    total: "",
  },
  {
    id: "4",
    desription: "Chocolate Bars",
    quantinty: "",
    price: 1.25,
    discount: 0,
    vat: 0.22,
    total: "",
  },
  {
    id: "5",
    desription: "Hand Soup",
    quantinty: "",
    price: 3.78,
    discount: 0,
    vat: 0.08,
    total: "",
  },
  {
    id: "6",
    desription: "Fish Meat",
    quantinty: "",
    price: 8.30,
    discount: 0,
    vat: 0.18,
    total: "",
  },
  {
    id: "7",
    desription: "Humus",
    quantinty: "",
    price: 2.66,
    discount: 0,
    vat: 0.18,
    total: "",
  },
  {
    id: "8",
    desription: "Banana KG",
    quantinty: "",
    price: 1.25,
    discount: 0,
    vat: 0.22,
    total: "",
  }
];

const ShopItems = () => {
  const productList = products.map((product) => (
    <ShopItem
      key={product.id}
      id={product.id}
      description={product.desription}
      price={product.price}
      discount={product.discount}
      vat={product.vat}

    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{productList}</ul>
      </Card>
    </section>
  );
};

export default ShopItems;
