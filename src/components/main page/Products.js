import ProductDropdown from "./dropdowns/ProductDropdown";


function Products(){
    return(
        <div className="row">
            <h2>Products</h2>
            <ProductDropdown className="dropdown" catagory="Meats" />
            <ProductDropdown className="dropdown" catagory="Vegetables"/>
        </div>
    );
}

export default Products