import { useState } from "react";
import Header from "./components/Header";
import ShopItems from "./components/ShopItems";
import Order from "./components/Order";
import OrderProvider from "./components/store/OrderProvider";
import InvoiceTest from "./components/InvoiceTest";

function App() {
  const [orderShown, setorderShown] = useState(false);

  const showorderHandler = () => {
    setorderShown(true);
  };
  const hideorderHanlder = () => {
    setorderShown(false);
  };
  return (
    <OrderProvider>
      {orderShown && <Order onClose={hideorderHanlder} />}
      <Header onshowOrder={showorderHandler} />
      <main>
        <ShopItems />
      </main>
      <div>
        <InvoiceTest></InvoiceTest>
      </div>
    </OrderProvider>
  );
}

export default App;
