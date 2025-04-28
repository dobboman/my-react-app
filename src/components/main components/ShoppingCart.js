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

export default ShoppingCart;