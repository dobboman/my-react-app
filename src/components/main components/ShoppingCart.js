import { useState } from "react";

function ShoppingCart(){
    const [hidden, setHidden] = useState(true)

    if(hidden){
        return(
            <div className="col-1 shoppingCartHidden">
                <button className="shoppingCartBtn"><img src="./cartIcon.png" alt="cannyfind"></img></button>
            </div>
        );
    }else{
        return(
            <div className="col-1 shoppingCart">
                <h2>My Cart</h2>
                <button className="checkoutBtn">Checkout</button>
            </div>
        );
    }
}

export default ShoppingCart;