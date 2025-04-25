import { useRef, useState } from "react";

function ProductGrid(props){
    const data = props.data;
    let qauntityIntial = new Array(data.length());
    for(let i=0; i<data.length; i++){
        qauntityIntial[i] = 0;
    }
    const [qauntity, setQuantity] = useState(qauntityIntial);

    const handleClickRemove = (e) =>{
        const itemID = e.target.name;
        let qauntityAmmend = qauntity
        qauntityAmmend[itemID] += 1;
        setQuantity(qauntityAmmend);
    }
    const handleClickAdd = (e) =>{
        const itemID = e.target.name;
        if(qauntity[itemID] === 0){
            return;
        }
        let qauntityAmmend = qauntity
        qauntityAmmend[itemID] -= 1;
        setQuantity(qauntityAmmend);
    }
    //const ref = useRef();
    //const numOfRows = props.tableData.numOfRows;
    return(
        <table className="productTable">
            <thead>
                <tr className="tableContent">
                    <th>Item</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>add/remove</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(d => (
                        <tr key={d[0]}>     
                            <td>{d[1]}</td>
                            <td>{d[2]}</td>
                            <td>{d[3]}</td>
                            <td><button id="remove" name={d[0]} onClick={handleClickRemove}></button> {qauntity} <button id="add" name={d[0]} onClick={handleClickAdd}></button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default ProductGrid;