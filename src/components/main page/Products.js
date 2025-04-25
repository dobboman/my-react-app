import ProductDropdown from "./dropdowns/ProductDropdown";


function Products(props){
    return(
        <div className="row">
            <h2>Products</h2>
            <ProductDropdown className="dropdown" catagory="Meats" itemsData={props.itemsData} setItemsData={props.setItemsData} addToCart={props.addItemToCart}/>
            <ProductDropdown className="dropdown" catagory="Vegetables" itemsData={props.itemsData} setItemsData={props.setItemsData} addToCart={props.addItemToCart}/>
        </div>
    );
}

export default Products