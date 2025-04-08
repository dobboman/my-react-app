import MeatDropdown from "./dropdowns/MeatDropdown";
import VegDropdown from "./dropdowns/VegDropdown";

function Products(){
    return(
        <div className="row">
            <h2>Products</h2>
            <MeatDropdown/>
            <VegDropdown/>
        </div>
    );
}

export default Products