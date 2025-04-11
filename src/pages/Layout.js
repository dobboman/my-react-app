import { Outlet, Link } from "react-router-dom";
import Banner from "../components/main components/Banner"; 

const Layout = () =>{
    return(
        <>
            <Banner/>
            <Outlet/>
        </>
    );
}

export default Layout;