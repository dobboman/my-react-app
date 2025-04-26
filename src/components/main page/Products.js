import ProductDropdown from "./dropdowns/ProductDropdown";


function Products(props){
    const setItemsData = (data) =>{
        props.setItemsData(data);
    }
    return(
        <div className="row">
            <h2>Products</h2>
            <ProductDropdown className="dropdown" catagory="Meats" itemsData={props.itemsData} setItemsData={setItemsData} addToCart={props.addItemToCart}
                setVeg={props.setVegItems} setChick={props.setChickItems} setBeef={props.setBeefItems} setPork={props.setPorkItems} setFish={props.setFishItems}
                vegItems={props.vegItems} chickItems={props.chickItems} beefItems={props.beefItems} porkItems={props.porkItems} fishItems={props.fishItems}
            />
            <ProductDropdown className="dropdown" catagory="Vegetables" itemsData={props.itemsData} setItemsData={setItemsData} addToCart={props.addItemToCart}
                setVeg={props.setVegItems} setChick={props.setChickItems} setBeef={props.setBeefItems} setPork={props.setPorkItems} setFish={props.setFishItems}
                vegItems={props.vegItems} chickItems={props.chickItems} beefItems={props.beefItems} porkItems={props.porkItems} fishItems={props.fishItems}
            />
        </div>
    );
}

export default Products