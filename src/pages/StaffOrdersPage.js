import OrdersTable from "../components/OrderComponents/OrdersTable";
import OrderViewer from '../components/OrderComponents/OrderViewer';
import {useState} from 'react';

const StaffOrdersPage = (props) =>{
    const [selectedOrder, setSelectedOrder] = useState("none");
    //const [orders, setOrders] = useState([]);


    const getOrders = () =>{
        return requestOrders();
    }
    const requestOrders = async() =>{
        const usrnm = props.username;
        const pass = props.passowrd;
        const data = {
            username: usrnm,
            password: pass
        };
        const requestData = await fetch("http://localhost/GroceryGuys/PHP/getOrders.php",{
            method: "POST",
            body: JSON.stringify(data)
        });
        const parsedData = await requestData.json();
        //setOrders(parsedData);
        return parsedData;
    }
    //const [orders, setOrders] = useState(getOrders());
    requestOrders().then( result => {
        console.log(result);
        const orders = result;
    });
        return(
            <>
                <div className="col-1"></div>
                <div className="col-10">
                    <div className="row">
                        {selectedOrder === "none" &&
                            <OrdersTable data = {orders} setSelectedOrder = {setSelectedOrder} username={props.username} password={props.password} />
                        }
                        {selectedOrder !== "none" &&
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