import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useContext } from "react";
import OrderContext from "./store/order-context";
import MaterialTable from "material-table";
import './Invoice.css'




const Invoice = (props) => {
  const orderCtx = useContext(OrderContext);
  const totalQuantity = `$${orderCtx.totalQuantity.toFixed(2)}`;
  const pricePerItem = orderCtx.pricePerItem;
  const totalPerItem = orderCtx.totalPerItem;
  const totalVat = `${orderCtx.vat.toFixed(2)}`;
  const priceWithVAT = orderCtx.priceWithVAT;
  const newvat = orderCtx.newvat;
  const hasItems = orderCtx.items.length > 0;

  

 const isValid = priceWithVAT < 50

    


  const orderItems = (
    <ul>
      {orderCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          pricePerItem={item.pricePerItem}
          //   onRemove={cartItemRemoveHandler.bind(null, item.id)}
          //   onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  console.log(orderItems ,'price')

  const [rows, setRows] = useState([])
  const [newRows, setnewRows] = useState([])
  


 useEffect(() => {
        orderCtx?.items?.map((item)=>{
            const obj ={
                name: item.name,
                price:item.price,
                discount:item.discount,
                quantity: item.quantity,
                vat: `${item.vat*100}%`,
                // total: totalQuantity + `+` + totalVat + `=` + priceWithVAT
                total: pricePerItem + `+` + totalVat + `=` + `${totalPerItem.toFixed(3)}`,
                totalprice: priceWithVAT
            }
            console.log(obj.totalprice,'totalprice')
            // if(obj.total > 500){
            //   const newObj = {
            //     total2: obj.total
            //   }
            //   setnewRows([...newRows, newObj])
            // }
            // else{setRows([...rows,obj])}

            if(obj.quantity > 50 || obj.totalprice > 500 ){
              const newObj ={
                  totalprice2: obj.totalprice - 500,
                  quantity2: obj.quantity - 50,
              }
            setnewRows([...newRows,newObj])
            }
            else{setRows([...rows,obj])}
            
        })
 }, [orderCtx])
 



  const colums = [
      { title: "Description", field: "name" },
      { title:'QTY', field:"quantity"},
      { title: "Price", field: "price"},
      { title:"Discount", field:"discount"},
      { title:"VAT", field:"vat"},
      { title:"Total", field:"total"},
      //test
      {title:"TotalPrice", field:"totalprice"}
    ];
    const colums2 = [
      { title: "Description", field: "name" },
      { title:'QTY', field:"quantity2"},
      { title: "Price", field: "price"},
      { title:"Discount", field:"discount"},
      { title:"VAT", field:"vat"},
      { title:"Total", field:"total2"},
      //test
      {title:"TotalPrice2", field:"totalprice2"}
    ];
  return (
 
    <div>
      { isValid ? <div>
         <MaterialTable  
        title="Invoice 1" 
        columns={colums}
         data={rows}
         options={{
           paging: false,
            search: false,
          }}
         /> <div className="outer">
         <div className="undertable">
            <p className="subtotal">Subtotal</p>
            <p>{totalQuantity}</p>
         </div>
         <div className="undertable">
            <p className="subtotal">VAT</p>
            <p>{`${newvat.toFixed(3)}`}</p>
         </div>
         <div className="undertable">
            <p className="subtotal">TOTAL</p>
            <p>{`${priceWithVAT.toFixed(3)}`}</p>
         </div>
    </div>
         
         </div> : <div><MaterialTable title="Invoice 2" 
         columns={colums}
          data={rows}
          options={{
            paging: false,
             search: false,
           }} 
         />
         <div className="outer">
         <div className="undertable">
            <p className="subtotal">Subtotal</p>
            <p>{totalQuantity}</p>
         </div>
         <div className="undertable">
            <p className="subtotal">VAT</p>
            <p>{newvat}</p>
         </div>
         <div className="undertable">
            <p className="subtotal">TOTAL</p>
            <p>{priceWithVAT}</p>
         </div>
    </div>
         <MaterialTable title="Invoice 3" 
         columns={colums2}
          data={newRows}
          options={{
            paging: false,
             search: false,
           }} 
         />
         <div className="outer">
         <div className="undertable">
            <p className="subtotal">Subtotal</p>
            <p>{totalQuantity}</p>
         </div>
         <div className="undertable">
            <p className="subtotal">VAT</p>
            <p>{newvat}</p>
         </div>
         <div className="undertable">
            <p className="subtotal">TOTAL</p>
            <p>{priceWithVAT}</p>
         </div>
    </div>
          </div> 
          } 
     
         
     </div>
  );
};

export default Invoice;
