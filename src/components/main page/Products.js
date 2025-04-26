import ProductDropdown from "./dropdowns/ProductDropdown";


function Products(props){
    const setItemsData = (data) =>{
        props.setItemsData(data);
    }
    return(
        <div className="row">
            <h2>Products</h2>
            <ProductDropdown className="dropdown" catagory="Meats" itemsData={props.itemsData} setItemsData={setItemsData} addToCart={props.addItemToCart}/>
            <ProductDropdown className="dropdown" catagory="Vegetables" itemsData={props.itemsData} setItemsData={setItemsData} addToCart={props.addItemToCart}/>
        </div>
    );
}

export default Products