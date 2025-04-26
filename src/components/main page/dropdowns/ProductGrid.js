import { useRef, useState } from "react";

function ProductGrid(props){
    const data = props.getData(props.catagory);
    //const dataLen = data.length;
    let qauntityIntial = [];
    if(data !== undefined){
        for(let i=0; i<data.length; i++){
            qauntityIntial[i] = 0;
        }
    }
    const [qauntity, setQuantity] = useState(qauntityIntial);
    

    /*const handleClickRemove = (e) =>{
        const itemID = e.target.name;
        let qauntityAmmend = qauntity;
        let dataAmmend;
        let index;
        for(let i=0; i < props.cartData.length; i++){
            if (props.cartData[i][0] === itemID){
                index = i;
            }
        }
        if(qauntity[itemID] === 0){//no item to deletwe from cart
            return;
        }else if(qauntity[itemID === 1]){//delete item from cart
            //let dataAmmend;
            for(let i=0; i < props.cartData.length ; i++){
                if(i !== index){
                    dataAmmend[i] = props.cartData[i];
                }
            }
        }else{//change quantity of cart item
            dataAmmend = props.cartData;
            dataAmmend[index][3] = qauntityAmmend[itemID] -1;
        }
        qauntityAmmend[itemID] -= 1;
        props.addToCart(dataAmmend);
        setQuantity(qauntityAmmend);
    };*/

    /*const handleClickAdd = (e) =>{
        const itemID = e.target.name;
        let qauntityAmmend = qauntity;
        let index;
        if(qauntityAmmend[itemID] === 0){
            let dataAmmend = new Array(5);
            dataAmmend[0] = data[itemID][0];//itemID
            dataAmmend[1] = data[itemID][1];//itemName
            dataAmmend[2] = data[itemID][3];//price
            dataAmmend[3] = qauntityAmmend+1;//qauntity
            dataAmmend[4] = data[itemID][3] * qauntityAmmend;//total price
            props.addToCart(dataAmmend);            
        }else{
            for(let i=0; i < props.cartData.length; i++){
                if (props.cartData[i][0] === itemID){
                    index = i;
                }
            }
            let dataAmmend = props.cartData;
            dataAmmend[index][3] = qauntityAmmend+1;
            props.addToCart(dataAmmend);
        }
        qauntityAmmend[itemID] += 1;
        setQuantity(qauntityAmmend);
    }*/
    
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
                {data !== undefined &&
                    data.map((d,index) => (
                        <tr key={d[0]}>     
                            <td>{d[1]}</td>
                            <td>{d[2]}</td>
                            <td>{d[3]}</td>
                            <td><button id="remove" name={d[0]} /*onClick={handleClickRemove}*/></button> {qauntity[index]} <button id="add" name={d[0]} /*onClick={handleClickAdd}*/></button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default ProductGrid;