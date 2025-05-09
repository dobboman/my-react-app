import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

const OrderViewer = (props) =>{
    const nav = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);
    //const setSelected = (id) =>{props.setSelectedOrder(id)}

    const getOrderDetails = async() =>{
        const data = {
            username: props.username,
            password: props.password,
            orderID: props.selectedOrder
        }
        const requestData = await fetch("http://localhost/GroceryGuys/PHP/getOrderDetails.php", {
            method: "POST",
            body: JSON.stringify(data)
        });
        const parsedData = await requestData.json();
        setOrderDetails(parsedData);
    }
    const completeOrder = async(orderID)=>{
        //const orderID = document.getElementById("")
        const data = {
            username: props.username,
            password: props.password,
            orderID: orderID
        };
        const requestStatus = await fetch("http://localhost/GroceryGuys/PHP/completeOrder.php",{
            method: "POST",
            body: JSON.stringify(data)
        });
        const requestComplete = await requestStatus.json();
        if(requestComplete === false){
            window.alert("Complete order request failed");
        }else{
            props.setOrders("");
            props.setSelectedOrder("none");
            window.alert("Order has been marked as completed");
            //nav("http://localhost/GroceryGuys/HomePage");
        }

    }
    const clickHandlerComplete = (e) =>{
        completeOrder(e.target.id);
    }
    const clickHandlerBack = (e) =>{
        selectOrder("none");
    }
    const selectOrder = (id) =>{props.setSelectedOrder(id)}
    
    const orderData = props.orderData;

    if(orderDetails !== null){
        return(
            <>
                <button id="back" onClick={clickHandlerBack}>Back to orders</button>        
                <p>OrderID:        {orderData[props.selectedOrder - 1][0]}</p>
                <p>Order Status:   {orderData[props.selectedOrder - 1][4]}</p>
                <p>Order Price:    {orderData[props.selectedOrder - 1][5]}</p>
                <p>Customer Name:  {orderData[props.selectedOrder - 1][2]}</p>
                <p>Customer Email: {orderData[props.selectedOrder - 1][1]}</p>
                <table>
                    <thead>
                        <th>Item</th>
                        <th>Qauntity</th>
                        <th>Price</th>
                    </thead>
                    <tbody>
                        {
                            orderDetails.map(d=> (
                                <tr key = {d[0]} >
                                    <td>{d[1]}</td>
                                    <td>{d[2]}</td>
                                    <td>{d[2]} x {d[3]}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button id={orderData[props.selectedOrder - 1][0]} onClick={clickHandlerComplete}>Complete Order</button>
            </>
        );
    }else{
        getOrderDetails();
    }
}

export default OrderViewer;