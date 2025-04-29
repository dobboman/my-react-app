import { useState } from "react";
import currencyFormatter from "./currencyFormatter";

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
            props.setCartData([]);
        }else{
            window.alert(response["error"]);
        }
    }
    const handleCheckout = () =>{
        checkout();
    }

    let totalOrderPrice = 0;
    for(let i=0; i < data.length; i++){//this wont make the function in pure as the value is dependant on values in state array this is just formatting
        totalOrderPrice += parseFloat(data[i][3]) * parseFloat(data[i][4]);
    }
    console.log( totalOrderPrice);

    if(hidden){
        return(
            <div className="col-1 shoppingCartHidden">
                <button className="shoppingCartBtn" onClick={handleClick}><img src="./showCart.png" alt="showCartIco"></img></button>
            </div>
        );
    }else{
        console.log(data);
        return(
            <>
                <div className="col-1 shoppingCart">
                    <h2>My Cart</h2>
                    <div className="row ">
                                    <ul>
                                        { ( data.length > 1 || Array.isArray(data[0])) &&
                                            data.map((d, index)=>(
                                                <>
                                                    <li className="row" id={d[0]+"itemName"}>
                                                        <p>{d[1]+"(x"+d[3]+")"}</p>
                                                    </li>
                                                </>
                                            
                                        ))}
                                        <li className="row" id="total price">
                                            <p>Total: {currencyFormatter.format(totalOrderPrice)}</p>
                                        </li>
                                    </ul>
                    </div>
                    <div className="cartButtons">
                        <button className="checkoutBtn" onClick={handleCheckout}>Checkout</button>
                        <button className="cartBtn" onClick={handleClick}><img src="./hideCart.png" alt="hideCartIco"/></button>
                    </div>
                </div>
            </>
        );
    }
}

export default ShoppingCart;