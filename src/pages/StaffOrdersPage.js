import OrdersTable from "../components/OrderComponents/OrdersTable";
import OrderViewer from '../components/OrderComponents/OrderViewer';
import {useState} from 'react';

const StaffOrdersPage = (props) =>{
    const [selectedOrder, setSelectedOrder] = useState("none");

    const getOrders = () =>{
        return requestOrders();
    }
    const requestOrders = async() =>{
        /*const usrnm = props.username;
        const pass = props.passowrd;*/
        const data = {
            username: props.username,
            password: props.password
        };
        const requestData = await fetch("http://localhost/GroceryGuys/PHP/getOrders.php",{
            method: "POST",
            body: JSON.stringify(data)
        });
        return requestData.json();
    }
    const orders = getOrders();
        return(
            <>
                <div className="col-1"></div>
                <div className="col-10">
                    <div className="row">
                        {selectedOrder === "none" &&
                            <OrdersTable data = {orders} setSelectedOrder = {setSelectedOrder} />
                        }
                        {selectedOrder != "none" &&
                        <OrderViewer selectedOrder = {selectedOrder} username={props.username} password={props.password} />
                        }
                    </div>
                </div>
                <div className="col-1"></div>
            </>
        );
    /*}else{
        return(
            <>

            </>
        );
    }*/
}

export default StaffOrdersPage;