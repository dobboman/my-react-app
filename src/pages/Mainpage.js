import Aboutus from "../components/main page/Aboutus";
import Products from "../components/main page/Products";
import Sidebar from "../components/main components/Sidebar";
import ShoppingCart from "../components/main components/ShoppingCart";
import { useState } from "react";

function Mainpage(props){
   const [loggedIn, setLoggedIn] = useState(false);
   const [shoppingCartItems, setShoppingCartItems] = useState([]);
   const [itemsData, setItemsData] = useState([[]]);
   const [vegItems, setVegItems] = useState([[]]);
   const [chickItems, setChickItems] = useState([[]]);
   const [beefItems, setBeefItems] = useState([[]]);
   const [porkItems, setPorkItems] = useState([[]]);
   const [fishItems, setFishItems] = useState([[]]);

    if(props.username !== '' && props.password !== '' && loggedIn === false ){
        setLoggedIn(true);
        console.log(props.username);
        console.log(props.password);
        //console.log(loggedIn);
    }

    const logout = () =>{
        //const confirmLogout = confirm("Are you sure you want to logout");
        if(window.confirm("Are you sure you want to logout") === true){
            props.setUsername('');
            props.setPassword('');
            setLoggedIn(false);
            console.log("usrnm & psswrd should be reset");
        }
        
    }
    const addItemToCart = (dataAmmend) =>{
        /*const id = e.target.id;
        let shoppingCartItemsAmmend = shoppingCartItems;
        shoppingCartItemsAmmend += {};*/
        
        
    }

    return(
        <>
        <Sidebar logout={logout} loggedIn={loggedIn}/>
        <div className="row">
            <div className="col-1 spacerCol">
                <p>stuff</p>
            </div>
            <div className="col-10 ">
                <div className="aboutus">
                    <Aboutus/>
                </div>
                <div className="pt-2">
                    <div className="products">
                        <Products itemsData={itemsData} setItemsData={setItemsData} addItemToCart={addItemToCart} setVeg={setVegItems} setChick={setChickItems} setBeef={setBeefItems} setPork={setPorkItems} setFish={setFishItems}
                                    vegItems={vegItems} chickItems={chickItems} beefItems={beefItems} porkItems={porkItems} fishItems={fishItems}
                        />
                    </div>
                </div>
            </div>
        </div>
        <ShoppingCart/>
        </>
    );
}

export default Mainpage;