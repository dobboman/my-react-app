import ProductGrid from "./ProductGrid";
import {useState} from "react"
    
function ProductDropdown(props){
    const [drop, setDrop] = useState(false);
    const [tableData, setTableData] = useState(null);

    if(tableData === null && props.dataLoaded === true){
        switch(props.catagory){
            default:
                break;
                case "Chicken":
                    console.log("tableData chicken set");
                    setTableData(props.chickItems);
                    break;
                case "Beef":
                    console.log("tableData beef set");
                    setTableData(props.beefItems);
                    break;
                case "Pork":
                    console.log("tableData pork set");
                    setTableData(props.porkItems);
                    break;
                case "Fish":
                    console.log("tableData fish set");
                    setTableData(props.fishItems);
                    break;
                    //Vegetables
                case "Vegetables":
                    console.log("tableData veg set");
                    setTableData(props.vegItems);
                    break;
        }
    }

    

    function handleClick(){
        if(drop === false){
            setDrop(true);
        }else{
            setDrop(false);
        }
    }
   
    if(drop === false){
        return(
            <div>
                <button className={props.className} onClick={handleClick}>{props.catagory}</button>
            </div>
        );
    } else{
        if(props.catagory === "Meats"){
            return(
                <div>
                    <button className={props.className} onClick={handleClick}>{props.catagory}</button>
                    <ProductDropdown className="dropdownSml" catagory="Chicken" data={props.itemsData} setItemsData={props.setItemsData} addToCart = {props.addToCart}
                        vegItems={props.vegItems} chickItems={props.chickItems} beefItems={props.beefItems} porkItems={props.porkItems} fishItems={props.fishItems}
                        dataLoaded={props.dataLoaded} cartData={props.cartData} setCartData={props.setCartData} quantity={props.quantity} setQuantity={props.setQuantity}
                    />
                    <ProductDropdown className="dropdownSml" catagory="Beef" data={props.itemsData} setItemsData={props.setItemsData} addToCart = {props.addToCart}
                        vegItems={props.vegItems} chickItems={props.chickItems} beefItems={props.beefItems} porkItems={props.porkItems} fishItems={props.fishItems}
                        dataLoaded={props.dataLoaded} cartData={props.cartData} setCartData={props.setCartData} quantity={props.quantity} setQuantity={props.setQuantity}
                    />
                    <ProductDropdown className="dropdownSml" catagory="Pork" data={props.itemsData}  setItemsData={props.setItemsData} addToCart = {props.addToCart}
                        vegItems={props.vegItems} chickItems={props.chickItems} beefItems={props.beefItems} porkItems={props.porkItems} fishItems={props.fishItems}
                        dataLoaded={props.dataLoaded} cartData={props.cartData} setCartData={props.setCartData} quantity={props.quantity} setQuantity={props.setQuantity}
                    />
                    <ProductDropdown className="dropdownSml" catagory="Fish" data={props.itemsData}  setItemsData={props.setItemsData} addToCart = {props.addToCart}
                        vegItems={props.vegItems} chickItems={props.chickItems} beefItems={props.beefItems} porkItems={props.porkItems} fishItems={props.fishItems}
                        dataLoaded={props.dataLoaded} cartData={props.cartData} setCartData={props.setCartData} quantity={props.quantity} setQuantity={props.setQuantity}
                    />
                </div>
            );
        }else{
            return(
                <div>
                    <button className={props.className} onClick={handleClick}>{props.catagory}</button>
                    <ProductGrid catagory={props.catagory} data={tableData} cartData={props.cartData} setCartData={props.setCartData} quantity={props.quantity} setQuantity={props.setQuantity}/>
                </div>
            );
        }


    }
}




export default ProductDropdown;