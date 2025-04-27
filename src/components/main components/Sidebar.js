import { useState } from "react";
import { Link } from "react-router-dom";


function Sidebar(props) {
    const logout = () =>{
        //props.setPassword('');
        //props.setUsername('');

        props.logout();
    }

    console.log(props.getLoggedIn());
    if(props.getLoggedIn() === "loggedIn"){
        return(
            <>
                <div className="sidebar">
                    <button type="button" className="loginBtn" onClick={logout}>Logout</button>
                    <Link to="/Orders">
                            <button type="button" className="loginbtn">Orders</button>
                    </Link> 
                </div>
                
            </>
        );
    }else{
        return (
            <div className="sidebar">
                <Link to="/login">
                    <button type="button" className="loginBtn">Login</button>
                </Link>
            </div>
        );
    }
        
        
}
        /*            <button className="sidebarContent" onClick={clickHandelerOrders}>Orders</button>
        <button className="sidebarContent" onClick={clickHandelerLogin}>{props.loginORout}</button>*/
    
export default Sidebar;