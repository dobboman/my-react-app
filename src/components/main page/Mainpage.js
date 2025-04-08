import Aboutus from "./Aboutus";
import Products from "./Products";

function Mainpage(){
    return(
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
    );
}

export default Mainpage;