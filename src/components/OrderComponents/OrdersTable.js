

const OrdersTable = (props) =>{

   const setSelected = (id) => {props.setSelectedOrder(id);}
    const handleClick = (e) =>{
        console.log(e.target.id);
        setSelected(e.target.id);
    }
    const data = props.data;
    console.log(data);
    return(
        <table className="ordersTable">
            <thead>
                
                    <th className="ordersTh">OrderID</th>
                    <th className="ordersTh">User Email</th>
                    <th className="ordersTh">Name</th>
                    <th className="ordersTh">Date</th>
                    <th className="ordersTh">Status</th>
                    <th className="ordersTh">Price</th>
                    <th className="ordersTh">View order</th>
                
                </thead>
                    <tbody>
                        { data !== undefined && //only map data if data is defined 
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