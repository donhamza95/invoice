import { useState } from "react";
import Header from "./components/Header";
import ShopItems from "./components/ShopItems";
import Order from "./components/Order";
import OrderProvider from "./components/store/OrderProvider";
import Invoice from "./components/Invoice";

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
        <ShopItems></ShopItems>
      </main>
      <div>
        <Invoice></Invoice>
      </div>
    </OrderProvider>
  );
}

export default App;
