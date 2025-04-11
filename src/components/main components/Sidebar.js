import { useState } from "react";
import { Link } from "react-router-dom";


function Sidebar(props) {
    const logout = () =>{
        props.setPassword('');
        props.setUsername('');
    }

    if(props.loggedIn){
        return(
            <div className="sidebar">
                <button type="button" className="loginBtn" onClick={logout}>Login</button>
            </div> 
        );
    }else {
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