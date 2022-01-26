import React, { useEffect, useState } from "react";
import { useContext } from "react";
import OrderContext from "./store/order-context";
import MaterialTable from "material-table";
import "./Invoice.scss";

const Invoice = (props) => {
  const orderCtx = useContext(OrderContext);
  const totalQuantity = orderCtx.totalQuantity;
  const pricePerItem = orderCtx.pricePerItem;
  const totalPerItem = orderCtx.totalPerItem;
  const totalVat = `${orderCtx.vat.toFixed(2)}`;
  const priceWithVAT = orderCtx.priceWithVAT;
  const newvat = orderCtx.newvat;
  const vatper50 = orderCtx.vatper50;
  const hasItems = orderCtx.items.length > 0;

  const [rows, setRows] = useState([]);
  const [newRows, setnewRows] = useState([]);

  useEffect(() => {
    orderCtx?.items?.map((item) => {
      const obj = {
        vatnumber: newvat,
        name: item.name,
        price: item.price,
        discount: item.discount,
        quantity: item.quantity,
        subtotal: totalQuantity,
        vat: `${item.vat * 100}%`,
        total:
          pricePerItem + `+` + totalVat + `=` + `${priceWithVAT.toFixed(3)}`,
        difference: 500 - priceWithVAT,
      };

      const invoiceObj = {
        vatnumber: newvat,
        totalprice: item.price,
        subtotal: totalQuantity,
        name: item.name,
        price: item.price,
        discount: item.discount,
        quantity: item.quantity,
        vat: `${item.vat * 100}%`,
        total:
          pricePerItem + `+` + totalVat + `=` + `${priceWithVAT.toFixed(3)}`,
      };

      const newObj = {
        totalprice: obj.totalprice - invoiceObj.totalprice,
        vatnumber: newvat,
        subtotal: totalQuantity,
        name: item.name,
        price: item.price,
        discount: item.discount,
        vat: `${item.vat * 100}%`,
        quantity2: obj.quantity - invoiceObj.quantity,
        total2:
          (obj.quantity - invoiceObj.quantity) * item.price -
          item.discount +
          item.vat,
      };
      if (priceWithVAT < 500) {
        console.log("hini if 1");

        setRows([...rows, obj]);
        if (obj.quantity < 51) {
          console.log("hini if 2");
          setRows([...rows, obj]);
        } else {
          console.log("hini n if me lloq");
          setRows([...rows, invoiceObj]);
          setnewRows([...newRows, newObj]);
        }
      } else {
        console.log("hini n lloqin e madh");
        setRows([...rows, invoiceObj]);
        setnewRows([...newRows, newObj]);
      }
    });
  }, [orderCtx]);

  const [totalInvoice, setTotal] = useState(0);
  const [vatInvoice, setvatInvoice] = useState(0);
  const [subtotalInvoice, setsubtotalInvoice] = useState(0);

  const [totalnextInvoice, setnextTotal] = useState(0);
  const [vatnextInvoice, setvatnextInvoice] = useState(0);
  const [subtotalnextInvoice, setsubtotalnextInvoice] = useState(0);

  console.log(totalInvoice, "totali pare");
  console.log(totalnextInvoice, "totali dyte");

  useEffect(() => {
    console.log(rows, "rooooooooooows");
    console.log(newRows, "newwwwwwrooooows");
    if (rows.length > 0) {
      setTotal(rows[rows?.length - 1].totalprice);
      setvatInvoice(rows[rows?.length - 1].vatnumber);
      setsubtotalInvoice(rows[rows?.length - 1].subtotal);
    }
    if (newRows.length > 0) {
      setnextTotal(newRows[newRows?.length - 1].totalprice);
      setvatnextInvoice(newRows[newRows?.length - 1].vatnumber);
      setsubtotalnextInvoice(newRows[newRows?.length - 1].subtotal);
    }
  }, [rows, newRows]);

  const colums = [
    { title: "Description", field: "name" },
    { title: "QTY", field: "quantity" },
    { title: "Price", field: "price" },
    { title: "Discount", field: "discount" },
    { title: "VAT", field: "vat" },
    { title: "Total", field: "total" },
  ];
  const colums2 = [
    { title: "Description", field: "name" },
    { title: "QTY", field: "quantity2" },
    { title: "Price", field: "price" },
    { title: "Discount", field: "discount" },
    { title: "VAT", field: "vat" },
    { title: "Total", field: "total2" },
  ];
  const isValid = priceWithVAT < 500;
  return (
    <div>
      {isValid ? (
        <div>
          <MaterialTable
            title="Invoice 1"
            columns={colums}
            data={rows}
            options={{
              paging: false,
              search: false,
            }}
          />{" "}
          <div className="outer">
            <div className="undertable">
              <p className="subtotal">Subtotal</p>
              <p>{`$${totalQuantity}`}</p>
            </div>
            <div className="undertable">
              <p className="subtotal">VAT</p>
              <p>{`${newvat.toFixed(3)}`}</p>
            </div>
            <div className="undertable">
              <p className="subtotal">TOTAL</p>
              <p>{`$${priceWithVAT.toFixed(3)}`}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <MaterialTable
            title="Invoice 2"
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
              {/* {priceWithVAT < 500 ? (
                <p>{`$${totalQuantity}`}</p>
              ) : (
                <p>{`$${totalQuantity - subtotalInvoice}`}</p>
              )} */}
            </div>
            <div className="undertable">
              <p className="subtotal">VAT</p>
              {priceWithVAT < 500 ? <p>{newvat}</p> : <p>{newvat}</p>}
            </div>
            <div className="undertable">
              <p className="subtotal">TOTAL</p>
              <p>
                {priceWithVAT < 500 ? (
                  <p>{totalInvoice}</p>
                ) : (
                  <p>{totalInvoice}</p>
                )}
              </p>
            </div>
          </div>
          <MaterialTable
            title="Invoice 3"
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
              <p>{`$${priceWithVAT}`}</p>
            </div>
            <div className="undertable">
              <p className="subtotal">VAT</p>
              <p>{priceWithVAT}</p>
            </div>
            <div className="undertable">
              <p className="subtotal">TOTAL</p>
              <p>{`$${totalnextInvoice?.toFixed(3)}`}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
