import { useState } from "react";
import AddOrRemoveItem from "./AddOrRemoveItem";
import TableData from "./tableData";

function ProductGrid(props){
    //const [qauntity, setQuantity] = useState("");
    const data = props.data;
    let catagoryNum;
    switch(props.catagory){
        default:
            break;
        case "Chicken":
            catagoryNum = 0;
            break;
        case "Beef":
            catagoryNum = 1;
            break;
        case "Pork":
            catagoryNum = 2;
            break;
        case "Fish":
            catagoryNum = 3;
            break;
        case "Vegetables":
            catagoryNum = 4;
            break;
    }

    const handleClickRemove = (e) =>{
        const name = e.target.name.split("/");
        const itemID = parseInt(name[0]);
        const quantityIndex = parseInt(name[1]);

        console.log("ItemId = "+ itemID);
        console.log("Index = "+ quantityIndex);

        let quantityAmmend = props.quantity;
        let dataAmmend = [[]];
        let dataIndex;

        //if(Array.isArray(props.cartData)){
        if(props.cartData.length >1){
            for(let i=0; i < props.cartData.length; i++){//find item in cart
                if (props.cartData[i][0] === itemID){
                    dataIndex = i;
                }
            }
            if(quantityAmmend[catagoryNum][quantityIndex] === 0){//no item to delete from cart
                dataAmmend = props.cartData;
                return;
            }else if(quantityAmmend[catagoryNum][quantityIndex] === 1){//delete item from cart
                for(let i=0; i < props.cartData.length - 1 ; i++){
                    if(i < dataIndex){
                        dataAmmend[i] = props.cartData[i];
                    }else{
                        dataAmmend[i] = props.cartData[i+1];
                    }
                }
            }else{//change quantity of cart item
                dataAmmend = props.cartData;
                dataAmmend[dataIndex][3] = quantityAmmend[catagoryNum][quantityIndex] -1;
            }
        }else{//if only one item in cart
            if(quantityAmmend[catagoryNum][quantityIndex] === 0){
                dataAmmend = props.cartData;
                return;
            }
            else if(quantityAmmend[catagoryNum][quantityIndex] === 1){
                dataAmmend = [];
            }else {
                dataAmmend = props.cartData;
                dataAmmend[0][3] = quantityAmmend[catagoryNum][quantityIndex]-1;
            }
        }

        quantityAmmend[catagoryNum][quantityIndex] -= 1;
        console.log(dataAmmend);
        props.setCartData([...dataAmmend]);
        props.setQuantity([...quantityAmmend]);
    };

    const handleClickAdd = (e) =>{
        const name = e.target.name.split("/");
        const itemID = parseInt(name[0]);
        const quantityIndex = parseInt(name[1]);

        console.log("ItemId = "+ itemID);
        console.log("Index = "+ quantityIndex);

        let quantityAmmend = props.quantity;
        let dataIndex;
        
        if(quantityAmmend[catagoryNum][quantityIndex] === 0){//if item not already in cart add to cart
            let dataAmmend = [[]];
            if(Array.isArray(props.cartData[0])){
                dataAmmend = props.cartData;
            }else{ dataAmmend[0] = props.cartData; }// if only 1 item make dataAmmend 2d array
            let temp = [];            
            temp[0] = parseInt(data[quantityIndex][0]);//itemID
            temp[1] = data[quantityIndex][1];//itemName
            temp[2] = parseFloat(data[quantityIndex][3]);//price
            temp[3] = quantityAmmend[catagoryNum][quantityIndex]+1;//qauntity
            temp[4] = parseFloat(data[quantityIndex][3]) * (quantityAmmend[catagoryNum][quantityIndex]+1);//total price*/
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
                dataAmmend[dataIndex][3] = quantityAmmend[catagoryNum][quantityIndex]+1;
            }else{//if there is one item in arra cartData is 1d array
                dataAmmend[3] = quantityAmmend[catagoryNum][quantityIndex]+1;
                console.log("dataAmmend = ");
                console.log(dataAmmend);
                
            }
            props.setCartData([...dataAmmend]);
        }
        quantityAmmend[catagoryNum][quantityIndex] += 1;
        props.setQuantity([...quantityAmmend]);
    }
    
    //console.log(props.quantity);
    return(
        <table className="productTable">
            <thead>
                <tr className="tableContent">
                    <th className="itemsTh">Item</th>
                    <th className="itemsTh">Image</th>
                    <th className="itemsTh">Price</th>
                    <th className="itemsTh">add/remove</th>
                </tr>
            </thead>
            <tbody>
                <TableData data={data} onClickRemove={handleClickRemove} onClickAdd={handleClickAdd} catagoryNum={catagoryNum} qauntity={props.quantity}/>
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