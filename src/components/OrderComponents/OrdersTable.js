

const OrdersTable = (props) =>{

   const setSelected = (id) => {props.setSelectedOrder(id);}
    const handleClick = (e) =>{
        console.log(e.target.id);
        setSelected(e.target.id);
    }
    const data = props.data;
    return(
        <table className="ordersTable">
            <thead>
                <tr>
                    <th>OrderID</th>
                    <th>User Email</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>View order</th>
                </tr>
                </thead>
                    <tbody>
                        { 
                            data.map(d=> (
                                <tr key = {d[0]}>
                                    <td>{d[0]}</td>
                                    <td>{d[1]}</td>
                                    <td>{d[2]}</td>
                                    <td>{d[3]}</td>
                                    <td>{d[4]}</td>
                                    <td>{d[5]}</td>
                                    <td><button id={d[0]} onClick={handleClick}>View</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
    );
}

export default OrdersTable;