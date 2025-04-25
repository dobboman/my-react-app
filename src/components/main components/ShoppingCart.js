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
    const removeItem = (e)=>{
        let dataAmmend;
        const index = e.traget.name;
        if(data[index][3] === 0){
            for(let i=0; i < data; i++){
                if(i !== index){
                    dataAmmend[i] = data[i];
                }
            }
        }else{
            dataAmmend = data;
            dataAmmend[index][3] -= 1;
        }
        props.setCartData(dataAmmend);
    }
    const addItem = (e) =>{
        const index = e.traget.name;
        let dataAmmend = data;
        dataAmmend[index][3] += 1;
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
        if(response === true){
            window.alert("Order has been succesfully placed");
        }else{
            window.alert("Order has failed");
        }
    }
    const handleCheckout = () =>{
        checkout();
    }
        return(
            <>
                {hidden === true &&
                    <div className="col-1 shoppingCartHidden">
                        <button className="shoppingCartBtn" onClick={handleClick}><img src="./showCart.png" alt="cannyfind"></img></button>
                    </div>
                }
                {hidden === false &&
                    <div className="col-1 shoppingCart">
                        <h2 className="row">My Cart</h2>
                        <div className="row">
                            <ul>
                                { 
                                    
                                    data.map((d, index)=>(
                                    <li className="row" id={d[0]}>
                                        <p className="col-3">{d[1]/*item name*/}</p>
                                        <p className="col-3">{d[2] /*price*/}</p>
                                        <p className="col-3"><button name={index} id={"remove".d[0]} onClick={removeItem}>remove</button>{d[3]/*qautity*/}<button name={index} id={"add".d[0]} onClick={addItem}>add</button></p>
                                        <p className="col-3">{d[4]/*total price*/}</p>
                                    </li>
                                    
                                ))}
                            </ul>
                        </div>
                        <div className="buttons row">
                            <button className="hideCart col-6"><image src="./hideCart"></image></button>
                            <button className="checkoutBtn col-6" onClick={handleCheckout}>Checkout</button>
                        </div>
                    </div>
                }
            </>    
        );
}

export default ShoppingCart;