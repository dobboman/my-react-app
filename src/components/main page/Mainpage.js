import Aboutus from "./Aboutus";
import Products from "./Products";
import Sidebar from "../main components/Sidebar";
import ShoppingCart from "../main components/ShoppingCart";
import { useState } from "react";

function Mainpage(props){
    const [loginORout, setLoggedIn] = useState("Login");
    const handleClick = () =>{
        props.setPage("login");
    }

    return(
        <>
        <Sidebar setLogin={setLoggedIn} handleClick = {handleClick} loginORout={loginORout}/>
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
                        <Products/>
                    </div>
                </div>
            </div>
        </div>
        <ShoppingCart/>
        </>
    );
}

export default Mainpage;