import React, { useEffect, useState } from "react";
import { useContext } from "react";
import OrderContext from "./store/order-context";
import MaterialTable from "material-table";
import "./Invoice.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Invoice = (props) => {
  const orderCtx = useContext(OrderContext);

  const [rows, setRows] = useState([]);
  const [newRows, setnewRows] = useState([]);
  const [invoicesState, setInvoicesState] = useState([])
  const [splitedState, setSplitedState] = useState([])
  const [onOder, setOnOrder] = useState(false)

  const indexes = []

  console.log(rows, "rows")

  let legitRows = []
  useEffect(() => {
    console.log(orderCtx, "orderctx")
    const rowsTemp = orderCtx.items.map((item) => { return { ...item, total: item.price * item.quantity + (item.price * item.quantity * item.vat) } })
    console.log(rowsTemp, "rowsTemp")

    rowsTemp.map((row, i) => {
      if (row.quantity / 50 < 1) {
        legitRows.push({ ...row })
      } else {
        const n = Math.floor(row.quantity / 50)
        const mod = row.quantity % 50
        const splitedQuantity = []

        for (let x = 0; x < n; x++) {
          splitedQuantity.push({ ...row, quantity: 50, total: row.price * 50 + (row.price * 50 * row.vat) })
        }
        if (mod > 0) {
          splitedQuantity.push({ ...row, quantity: mod, total: row.price * mod + (row.price * mod * row.vat) })
        }
        // const splitedQuantity = [{...row, quantity: 50,total: row.price * 50 + (row.price * 50 * row.vat)},{ ...row, quantity: row.quantity - 50, total: row.price * (row.quantity - 50) + (row.price * (row.quantity - 50) * row.vat)}]

        legitRows.push(...splitedQuantity)
      }
    })
    setnewRows(legitRows)

    const sumOfLegitRows = legitRows.reduce((a, v) => a = a + v.total, 0)


    console.log(sumOfLegitRows, "sumOfLegitRows")

  }, [orderCtx]);
  console.log(newRows, "newRows")

  const totals = newRows.map((row) => row.total)

  console.log(totals, "totsss")


  totals.reduce((previousValue, currentValue, currentIndex, array) => {
    console.log(previousValue, "prevv")
    if (currentValue + previousValue > 500 ) {
      indexes.push(currentIndex)
      previousValue = 0
    }
    console.log(currentValue, "currentValue")
    console.log(currentIndex, "currentIndex")
    console.log(array, "array")
    return previousValue + currentValue
  }, 0)
  let invoices = []
  let invoices2 = []

  console.log(indexes, "indexesss")


  console.log(splitedState, "splitedState")
  const spliteddd = []


  const onOrderHandler = () => {
    setOnOrder(true)
    for (let x = 0; x < indexes.length; x++) {

      if (x == 0) {
        spliteddd.push(newRows.slice(0, indexes[x]), newRows.slice(indexes[x], indexes[x + 1]))
        setSplitedState(...splitedState, spliteddd)
      } else if (x < indexes.length) {
        spliteddd.push(newRows.slice(indexes[x], indexes[x + 1]))
        setSplitedState(...splitedState, spliteddd)

      } else {
        spliteddd.push(newRows.slice(indexes[x]))
        setSplitedState(...splitedState, spliteddd)

      }
    }
  }

  console.log(invoicesState, "invoices")





  const colums = [
    { title: "Description", field: "name" },
    { title: "QTY", field: "quantity" },
    { title: "Price", field: "price" },
    { title: "Discount", field: "discount" },
    { title: "VAT", field: "vat" },
    { title: "Total", field: "total" },
  ];


  return (
    <div>
      <span onClick={onOrderHandler}>Order</span>
      {indexes.length == 0 &&
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="right">QTY</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Discount</TableCell>
                <TableCell align="right">VAT</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {onOder && newRows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.discount}</TableCell>
                  <TableCell align="right">{row.vat}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="outer" >
            <div className="undertable">
              <p className="subtotal">TOTAL</p>
              <p>
                {newRows.reduce((a, v) => a = a + v.total, 0)}

              </p>
            </div>
          </div>
        </div>
      }
      {splitedState && splitedState.map((table, i) => (
        <div >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">QTY</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Discount</TableCell>
                  <TableCell align="right">VAT</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {table.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.discount}</TableCell>
                    <TableCell align="right">{row.vat}</TableCell>
                    <TableCell align="right">{row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="outer" >
            <div className="undertable">
              <p className="subtotal">TOTAL</p>
              <p>
                {table.reduce((a, v) => a = a + v.total, 0)}

              </p>
            </div>
          </div>
        </div>
      )
      )}
    </div>
  );
};

export default Invoice