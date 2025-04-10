import { useState } from "react";


function Sidebar(props) {
        const clickHandelerLogin= () =>{
            if(props.loginORout === "Login"){
                //props.setLogin("Logout");
                props.handleClick();
            }
            else{
                //props.setLogin("Login");
            }
        }
        const clickHandelerOrders = () =>{

        }
        return (
                <div className="sidebar">
                    <button className="sidebarContent" onClick={clickHandelerLogin}>{props.loginORout}</button>
                    <button className="sidebarContent" onClick={clickHandelerOrders}>Orders</button>
                </div>
        );
   
    
}

export default Sidebar;