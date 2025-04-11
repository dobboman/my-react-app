import { useState } from "react";
import { Link } from "react-router-dom";


function Sidebar(props) {
    const logout = () =>{
        //props.setPassword('');
        //props.setUsername('');
        props.logout();
    }

    if(props.loggedIn){
        return(
            <div className="sidebar">
                <button type="button" className="loginBtn" onClick={logout}>Logout</button>
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