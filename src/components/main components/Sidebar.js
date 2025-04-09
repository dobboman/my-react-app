import { useState } from "react";

function Sidebar(props) {
    const [hidden, setHidden] = useState(true);

    if(hidden === false){
        return (
                <div className="sidebar">
                    <button className="sidebarContent">{props.loginout}</button>
                    <button className="sidebarContent">Products</button>
                    <button className="sidebarContent">Orders</button>
                </div>
        );
    }else{
        return(
            <div className="sidebar">

            </div>
        );
    }
    
}

export default Sidebar;