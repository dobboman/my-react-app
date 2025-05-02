import TableData from "./tableData";

function ProductGrid(props){
    const data = props.data;
    let catagoryNum;
    switch(props.catagory){//used to reference index of quantity array corrosponding to this product grid
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
        const name = e.target.name.split("/");//get itemID and quaunty index stored in name
        const itemID = parseInt(name[0]);
        const quantityIndex = parseInt(name[1]);

        /*console.log("ItemId = "+ itemID);
        console.log("Index = "+ quantityIndex);*/

        let quantityAmmend = props.quantity;//temporay variable to allow for editing values in quantity array to then set quantity later
        let dataAmmend = [[]];//same for cart array
        let dataIndex;

        if(props.cartData.length >1){// if length > 1 then the cart has items inside
            for(let i=0; i < props.cartData.length; i++){//find item in cart
                if (props.cartData[i][0] === itemID){
                    dataIndex = i;
                }
            }
            if(quantityAmmend[catagoryNum][quantityIndex] === 0){//no item of that type to delete from cart
                dataAmmend = props.cartData;
                return;
            }else if(quantityAmmend[catagoryNum][quantityIndex] === 1){//delete item from cart if only one of that item is present
                for(let i=0; i < props.cartData.length - 1 ; i++){
                    if(i < dataIndex){
                        dataAmmend[i] = props.cartData[i];
                    }else{
                        dataAmmend[i] = props.cartData[i+1];
                    }
                }
            }else{//change quantity of cart item
                dataAmmend = props.cartData;
                dataAmmend[dataIndex][3] = quantityAmmend[catagoryNum][quantityIndex] -1;//set quantity in cart arary
            }
        }else{//if only one item in cart
            if(quantityAmmend[catagoryNum][quantityIndex] === 0){//no item of that type in cart therefore cart array should stay the same
                dataAmmend = props.cartData;
                return;
            }
            else if(quantityAmmend[catagoryNum][quantityIndex] === 1){// there is only one item in cart of quantity 1 so cart should be set to empty
                dataAmmend = [];
            }else {// if item has a quantity of > 1 then then quantity should be reduced by one 
                dataAmmend = props.cartData;
                dataAmmend[0][3] = quantityAmmend[catagoryNum][quantityIndex]-1;//set quantity is cart array
            }
        }

        //console.log(dataAmmend);
        quantityAmmend[catagoryNum][quantityIndex] -= 1; 
        props.setCartData([...dataAmmend]);
        props.setQuantity([...quantityAmmend]);//quantity state array set down here to avoid a re render to early
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
            //initilize dataAmmend
            let dataAmmend = [[]];
            if(Array.isArray(props.cartData[0])){//if cart data alredy an array of arrays set dataAmmend to cartData
                dataAmmend = props.cartData;
            }else{ dataAmmend[0] = props.cartData; }// if only 1 item make dataAmmend an array of arrays

            let temp = [];//temporay array to add in item info            
            temp[0] = parseInt(data[quantityIndex][0]);//itemID
            temp[1] = data[quantityIndex][1];//itemName
            temp[2] = parseFloat(data[quantityIndex][3]);//price
            temp[3] = quantityAmmend[catagoryNum][quantityIndex]+1;//qauntity
            temp[4] = parseFloat(data[quantityIndex][3]) * (quantityAmmend[catagoryNum][quantityIndex]+1);//total price*/
            dataAmmend[props.cartData.length] = temp;//and new item array to the end of dataAmmend array
            //console.log("dataAmmend = "+dataAmmend);
            props.setCartData([...dataAmmend]);            
        }else{//if item already exists in car ammend quantity in cart
            let dataAmmend = props.cartData;
            if(Array.isArray(props.cartData[0])){//if there is more than one item in cart cartData is 2d array
                for(let i=0; i < props.cartData.length; i++){
                    if (props.cartData[i][0] === itemID){
                        dataIndex = i;
                        console.log("dataIndex = ");
                        console.log(dataAmmend);
                    }
                }
                /*console.log("dataAmmend = ");
                console.log(dataAmmend);*/
                dataAmmend[dataIndex][3] = quantityAmmend[catagoryNum][quantityIndex]+1;//set quantity is dataAmmend
            }else{//if there is one item in arra cartData is 1d array
                dataAmmend[3] = quantityAmmend[catagoryNum][quantityIndex]+1;
                /*console.log("dataAmmend = ");
                console.log(dataAmmend);*/
                
            }
            props.setCartData([...dataAmmend]);
        }
        quantityAmmend[catagoryNum][quantityIndex] += 1;
        props.setQuantity([...quantityAmmend]);
    }
    
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

export default ProductGrid;