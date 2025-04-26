import ProductGrid from "./ProductGrid";
import {useState} from "react"

//const dropdown = false;
    
function ProductDropdown(props){
    //const drop = props.drop;
    const [drop, setDrop] = useState(false);
    const [tableData, setTableData] = useState(null);

    if(tableData === null && props.dataLoaded === true){
        //console.log("catagory = "+props.catagory);
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
            //console.log("da fug");
            //getTableData();
            setDrop(true);
        }else{
            //console.log("da fug 2");
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
                        setVeg={props.setVegItems} setChick={props.setChickItems} setBeef={props.setBeefItems} setPork={props.setPorkItems} setFish={props.setFishItems}
                        vegItems={props.vegItems} chickItems={props.chickItems} beefItems={props.beefItems} porkItems={props.porkItems} fishItems={props.fishItems}
                        dataLoaded={props.dataLoaded}
                    />
                    <ProductDropdown className="dropdownSml" catagory="Beef" data={props.itemsData} setItemsData={props.setItemsData} addToCart = {props.addToCart}
                        setVeg={props.setVegItems} setChick={props.setChickItems} setBeef={props.setBeefItems} setPork={props.setPorkItems} setFish={props.setFishItems}
                        vegItems={props.vegItems} chickItems={props.chickItems} beefItems={props.beefItems} porkItems={props.porkItems} fishItems={props.fishItems}
                        dataLoaded={props.dataLoaded}
                    />
                    <ProductDropdown className="dropdownSml" catagory="Pork" data={props.itemsData}  setItemsData={props.setItemsData} addToCart = {props.addToCart}
                        setVeg={props.setVegItems} setChick={props.setChickItems} setBeef={props.setBeefItems} setPork={props.setPorkItems} setFish={props.setFishItems}
                        vegItems={props.vegItems} chickItems={props.chickItems} beefItems={props.beefItems} porkItems={props.porkItems} fishItems={props.fishItems}
                        dataLoaded={props.dataLoaded}
                    />
                    <ProductDropdown className="dropdownSml" catagory="Fish" data={props.itemsData}  setItemsData={props.setItemsData} addToCart = {props.addToCart}
                        setVeg={props.setVegItems} setChick={props.setChickItems} setBeef={props.setBeefItems} setPork={props.setPorkItems} setFish={props.setFishItems}
                        vegItems={props.vegItems} chickItems={props.chickItems} beefItems={props.beefItems} porkItems={props.porkItems} fishItems={props.fishItems}
                        dataLoaded={props.dataLoaded}
                    />
                </div>
            );
        } /*else if(props.catagory === "Vegetables"){
            return(
                <div>
                    <button className={props.className} onClick={handleClick}>{props.catagory}</button>
                    <ProductGrid catagory={props.catagory} data={tableData}/>
                </div>
            );
        }*/else{
            return(
                <div>
                    <button className={props.className} onClick={handleClick}>{props.catagory}</button>
                    <ProductGrid catagory={props.catagory} data={tableData}/>
                </div>
            );
        }


    }
}




export default ProductDropdown;