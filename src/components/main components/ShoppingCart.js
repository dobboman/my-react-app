import { useState } from "react";

function ShoppingCart(props){
    const [hidden, setHidden] = useState(true);
    const data = props.cartData;

    const handleClick = () => {
        if(hidden){
            setHidden(false);
        }else{
            setHidden(true);
        }
    }
    /*const removeItem = (e)=>{
        const name = e.target.name.split("/");
        const itemID = parseInt(name[0]);
        const arrayIndex = parseInt(name[1]);

        let dataAmmend = [];

        console.log("itemID = "+itemID);
        console.log("arrayIndex = "+arrayIndex);

        if(Array.isArray(data[0])){//if > one item in cart cartData is 2d array
            /*for(let i=0; i < props.cartData.length; i++){//find item in cart
                if (props.cartData[i][0] === itemID){
                    dataIndex = i;
                }
            }

            if(data[arrayIndex][3] === 0){//item not in cart

            }else if(data[arrayIndex][3] === 1){//delete item from cart 
                for(let i=0; i < props.cartData.length - 1 ; i++){
                    if(i < arrayIndex){
                        dataAmmend[i] = data[i];
                    }else{
                        dataAmmend[i] = data[i+1];
                    }
                }
            }else{//change quantity of cart item
                dataAmmend = data;
                dataAmmend[arrayIndex][3] -= 1;
            }
        }else{
            if(data[arrayIndex][3] === 1){//delete item from cart
                dataAmmend = [];
            }else{
                dataAmmend = data;
                dataAmmend[3] -= 1;
            }
        }
        console.log("new cart data:");
        console.log(dataAmmend);
        props.setCartData([...dataAmmend]);
    }
    const addItem = (e) =>{
        /*const index = e.traget.name;
        let dataAmmend = data;
        dataAmmend[index][3] += 1;
    }*/
    const checkout = async() =>{
        const reqData = {
            username: props.username,
            password: props.password,
            data: data
        }
        const request = await fetch("http://localhost/GroceryGuys/PHP/checkout.php",{
            method: "POST",
            body: JSON.stringify(reqData)
        })
        const response = await request.json();
        if(response["success"] === true){
            window.alert("Order has been succesfully placed");
        }else{
            window.alert(response["error"]);
        }
    }
    const handleCheckout = () =>{
        checkout();
    }

    if(data.length > 1){

    }

    if(hidden){
        return(
            <div className="col-1 shoppingCartHidden">
                <button className="shoppingCartBtn" onClick={handleClick}><img src="./showCart.png" alt="showCartIco"></img></button>
            </div>
        );
    }else{
        console.log(data);
        //console.log("data length"+data[0].length);
        return(
            <>
                <div className="col-1 shoppingCart">
                    <h2>My Cart</h2>
                    <button className="checkoutBtn">Checkout</button>
                    <div className="row ">
                                    <ul>
                                        { ( data.length > 1 || Array.isArray(data[0])) &&
                                            data.map((d, index)=>(
                                                <>
                                                    <li className="row" id={d[0]+"itemName"}>
                                                        <p>{d[1]+"(x"+d[3]+")"}</p>
                                                    </li>
                                                    <li className="row" id={d[0]+"totalPrice"}>    
                                                        <p>{"price: "+d[4]/*total price*/}</p>
                                                    </li>
                                                </>
                                            
                                        ))}
                                    </ul>
                                </div>
                                <div className="buttons row">
                                    <button className="hideCart"><img src="./hideCart.png" alt="hideCartIco"/></button>
                                    <button className="checkoutBtn" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            </>
        );
    }
}

                                                   /* <li className="row" id={d[0]+"quantity"}>
                                                        <button className="loginBtn" name={d[0]+"/"+index} id={"remove"+d[0]} onClick={removeItem}>-</button><button className="loginBtn" name={d[0]+"/"+index} id={"add"+d[0]} onClick={addItem}>+</button>
                                                    </li>*/
export default ShoppingCart;