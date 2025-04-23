const OrdersTable = (props) =>{
    const getOrders = async()=>{
        const data ={
            username: props.username,
            password: props.password
        }
        const requestData = await fetch("http://localhost/GroceryGuys/PHP/getOrders.php",{
            method: "POST",
            body: JSON.stringify(data)
        });
        const returnedData = await requestData.json();
        return returnedData;
    }
    const handleClick = (orderID) =>{
        props.setSelectedOrder(orderID);
    }
    const ordersData = getOrders();

    <table className="ordersTable">
                        <thead>
                            <tr>
                                <th>OrderID</th>
                                <th>User Email</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th>View order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ordersData.map(d=> (
                                    <tr key = {d[0]}>
                                        <td>{d[0]}</td>
                                        <td>{d[1]}</td>
                                        <td>{d[2]}</td>
                                        <td>{d[3]}</td>
                                        <td><button id={d[0]} onClick={handleClick(d[0])}>View</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
}

export default OrdersTable;