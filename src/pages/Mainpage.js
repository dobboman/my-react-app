import Aboutus from "../components/main page/Aboutus";
import Products from "../components/main page/Products";
import Sidebar from "../components/main components/Sidebar";
import ShoppingCart from "../components/main components/ShoppingCart";
import { useState } from "react";

function Mainpage(props){
    /*const [loginORout, setLoggedIn] = useState("Login");
    const handleClick = () =>{
        props.setPage("login");
    }*/
   /*const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');*/
   const [loggedIn, setLoggedIn] = useState(false);

    if(props.username !== '' && props.password !== '' ){
        setLoggedIn(true);
    }

    console.log(props.username);
    console.log(props.password);
    console.log(loggedIn);

    return(
        <>
        <Sidebar setUsername= {props.setUsername} setPassword={props.setPassword} loggedIn={loggedIn}/>
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