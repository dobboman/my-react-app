import ProductDropdown from "./dropdowns/ProductDropdown";


function Products(props){
    //console.log(props.quantity);
    return(
        <div className="row">
            <h2>Products</h2>
            <ProductDropdown className="dropdown" catagory="Meats" itemsData={props.itemsData} setItemsData={props.setItemsData} addToCart={props.addItemToCart}                vegItems={props.vegItems} chickItems={props.chickItems} beefItems={props.beefItems} porkItems={props.porkItems} fishItems={props.fishItems}
                dataLoaded={props.dataLoaded} cartData={props.cartData} setCartData={props.setCartData} quantity={props.quantity} setQuantity={props.setQuantity}
            />
            <ProductDropdown className="dropdown" catagory="Vegetables" vegItems={props.vegItems} cartData={props.cartData} 
                setCartData={props.setCartData} quantity={props.quantity} setQuantity={props.setQuantity} dataLoaded={props.dataLoaded}
            />
        </div>
    );
}

export default Products