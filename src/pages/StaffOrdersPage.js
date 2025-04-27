import OrdersTable from "../components/OrderComponents/OrdersTable";
import OrderViewer from '../components/OrderComponents/OrderViewer';
import {useState} from 'react';

const StaffOrdersPage = (props) =>{
    const [selectedOrder, setSelectedOrder] = useState("none");
    const [orders, setOrders] = useState("");


    const getOrders = () =>{
        return requestOrders();
    }
    const requestOrders = async() =>{
        const userID = props.userID;
        const data = {
            userID: userID
        };
        const requestData = await fetch("http://localhost/GroceryGuys/PHP/getOrders.php",{
            method: "POST",
            body: JSON.stringify(data)
        });
        const parsedData = await requestData.json();
        if(parsedData["success"] === true){
            setOrders(parsedData["data"]);
        }
        else{
            window.alert(parsedData["error"]);
        }
    }
    if(orders === ""){
        requestOrders();
        console.log(orders);
    }else{
        console.log(selectedOrder);
        return(
            <>
                <div className="col-1"></div>
                <div className="col-10">
                    <div className="row">
                        {selectedOrder === "none" &&
                            <OrdersTable data = {orders} setSelectedOrder={setSelectedOrder} userID={props.userID}/>
                            //requestOrders()
                        }
                        {selectedOrder !== "none" &&
                        <OrderViewer selectedOrder = {selectedOrder} setSelectedOrder={setSelectedOrder} setOrders={setOrders} userID={props.userID} orderData={orders} />
                        }
                    </div>
                </div>
                <div className="col-1"></div>
            </>
        );
    }
}

export default StaffOrdersPage;