import { useState } from "react";
import AddOrRemoveItem from "./AddOrRemoveItem";
import TableData from "./tableData";

function ProductGrid(props){
    const [qauntity, setQuantity] = useState("");
    const data = props.data;
    let qauntityIntial = [];
    if(data !== undefined && qauntity === ""){
        for(let i=0; i<data.length; i++){
            qauntityIntial[i] = 0;
        }
        setQuantity(qauntityIntial);
    }

    const handleClickRemove = (e) =>{
        const name = e.target.name.split("/");
        const itemID = parseInt(name[0]);
        const quantityIndex = parseInt(name[1]);

        console.log("ItemId = "+ itemID);
        console.log("Index = "+ quantityIndex);

        let qauntityAmmend = qauntity;
        let dataAmmend = [[]];
        let dataIndex;

        if(Array.isArray(props.cartData)){
            for(let i=0; i < props.cartData.length; i++){//find item in cart
                if (props.cartData[i][0] === itemID){
                    dataIndex = i;
                }
            }
            if(qauntity[quantityIndex] === 0){//no item to delete from cart
                dataAmmend = props.cartData;
                return;
            }else if(qauntity[quantityIndex] === 1){//delete item from cart
                for(let i=0; i < props.cartData.length - 1 ; i++){
                    if(i < dataIndex){
                        dataAmmend[i] = props.cartData[i];
                    }else{
                        dataAmmend[i] = props.cartData[i+1];
                    }
                }
            }else{//change quantity of cart item
                dataAmmend = props.cartData;
                dataAmmend[dataIndex][3] = qauntityAmmend[itemID] -1;
            }
        }else{//if only one item in cart
            if(qauntity[quantityIndex] === 0){
                dataAmmend = props.cartData;
                return;
            }
            else if(qauntity[quantityIndex] === 1){
                dataAmmend = [];
            }else {
                dataAmmend = props.cartData;
                dataAmmend[3] = qauntityAmmend[quantityIndex]-1;
            }
        }

        qauntityAmmend[quantityIndex] -= 1;
        console.log(dataAmmend);
        props.setCartData([...dataAmmend]);
        setQuantity([...qauntityAmmend]);
    };

    const handleClickAdd = (e) =>{
        const name = e.target.name.split("/");
        const itemID = parseInt(name[0]);
        const quantityIndex = parseInt(name[1]);

        console.log("ItemId = "+ itemID);
        console.log("Index = "+ quantityIndex);

        let qauntityAmmend = qauntity;
        let dataIndex;
        
        if(qauntityAmmend[quantityIndex] === 0){//if item not already in cart add to cart
            let dataAmmend = [[]];
            if(Array.isArray(props.cartData[0])){
                dataAmmend = props.cartData;
            }else{ dataAmmend[0] = props.cartData; }// if only 1 item make dataAmmend 2d array
            let temp = [];            
            temp[0] = parseInt(data[quantityIndex][0]);//itemID
            temp[1] = data[quantityIndex][1];//itemName
            temp[2] = parseInt(data[quantityIndex][3]);//price
            temp[3] = qauntityAmmend[quantityIndex]+1;//qauntity
            temp[4] = parseInt(data[quantityIndex][3]) * (qauntityAmmend[quantityIndex]+1);//total price*/
            dataAmmend[props.cartData.length] = temp;
            console.log("dataAmmend = "+dataAmmend);
            props.setCartData([...dataAmmend]);            
        }else{//if item already exists in car ammend quantity in cart
            let dataAmmend = props.cartData;
            //console.log("cartData = "+props.cartData);
            if(Array.isArray(props.cartData[0])){//if there is more than one item in cart cartData is 2d array
                for(let i=0; i < props.cartData.length; i++){
                    if (props.cartData[i][0] === itemID){
                        dataIndex = i;
                        console.log("dataIndex = ");
                        console.log(dataAmmend);
                    }
                }
                console.log("dataAmmend = ");
                console.log(dataAmmend);
                dataAmmend[dataIndex][3] = qauntityAmmend[quantityIndex]+1;
            }else{//if there is one item in arra cartData is 1d array
                dataAmmend[3] = qauntityAmmend[quantityIndex]+1;
                console.log("dataAmmend = ");
                console.log(dataAmmend);
                
            }
            props.setCartData([...dataAmmend]);
        }
        qauntityAmmend[quantityIndex] += 1;
        setQuantity([...qauntityAmmend]);
    }
    

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
                <TableData data={data} onClickRemove={handleClickRemove} onClickAdd={handleClickAdd} qauntity={qauntity}/>
            </tbody>
        </table>
    );
}

/*{qauntity !== null &&
    data.map((d,index) => (
        <tr key={d[0]}>     
            <td>{d[1]}</td>
            <td>{d[2]}</td>
            <td>{d[3]}</td>
            <td><AddOrRemoveItem name={d[0]+"/"+index} onClickRemove={handleClickRemove} onClickAdd={handleClickAdd} qauntity={qauntity[index]} /></td>
        </tr>
    ))
}*/
export default ProductGrid;