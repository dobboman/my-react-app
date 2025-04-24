import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

const OrderViewer = (props) =>{
    const nav = useNavigate();
    const [orderData, setOrderData] = useState(null);
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
        setOrderData(parsedData);
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
            props.setSelectedOrder("none");
            window.alert("Order has been marked as completed");
            nav("http://localhost/GroceryGuys/HomePage");
        }

    }
    const clickHandler = (e) =>{
        completeOrder(e.target.id);
    }
    getOrderDetails();

    if(orderData !== null){
        return(
            <>
                <button onClick={props.setSelectedOrder("none")}>Back to orders</button>
                <table>
                    <thead>
                        <th>Item</th>
                        <th>Qauntity</th>
                        <th>Price</th>
                        <th>Complete order</th>
                    </thead>
                    <tbody>
                        {
                            orderData.map(d=> (
                                <tr key = {d[0]} >
                                    <td>{d[1]}</td>
                                    <td>{d[2]}</td>
                                    <td>{d[3]}</td>
                                    <td><button id={d[0]} onClick={clickHandler}>Complete Order</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </>
        );
    }
}

export default OrderViewer;