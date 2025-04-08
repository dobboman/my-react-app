
function Sidebar(props) {
    
    return (
            <div className=" sidebar">
                <button className="sidebarContent">{props.loginout}</button>
                <button className="sidebarContent">Products</button>
                <button className="sidebarContent">Orders</button>
            </div>
    );
}

export default Sidebar;