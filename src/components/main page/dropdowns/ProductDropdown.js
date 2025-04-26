import ProductGrid from "./ProductGrid";
import {useState} from "react"

//const dropdown = false;
    
function ProductDropdown(props){
    //const drop = props.drop;
    const [drop, setDrop] = useState(false);
    

    const getTableData = async() =>{
        console.log("breast of the jimmy");
        console.log(JSON.stringify(props.catagory));
        const requestData = await fetch("http://localhost/GroceryGuys/PHP/getItems.php",{
            method: "POST",
            //headers: { "Content-Type": "application/json"},
            body: JSON.stringify(props.catagory)
        });
        const responseData = await requestData.json();
        console.log(responseData);
        
        const catagories = ["Chicken", "Beef", "Pork", "Fish", "Vegetables"]
        for(let c=0; c <5 ; c++){
            let data =[];
            let index=0;
            for(let i=0; i < props.itemsData.length; i++){
                if(props.itemsData[i][4] === catagories[c]){
                    data[index] = props.itemsData[i];
                    index++;
                }
            }
            console.log(catagories[c]+" data: "+data);
            switch(catagories[c]){
                default:
                    break;
                    case "Chicken":
                        props.setChick(data);
                        break;
                    case "Beef":
                        props.setBeef(data)
                        break;
                    case "Pork":
                        props.setPork(data)
                        break;
                    case "Fish":
                        props.setFish(data)
                        break;
                    case "Vegetables":
                        props.setVeg(data)
                        break;
                }

        }        
        props.setItemsData(
            responseData
        );
    }

    function handleClick(){
        if(drop === false){
            //console.log("da fug");
            if(props.itemsData === undefined){
                getTableData();
            }
            setDrop(true);
        }else{
            //console.log("da fug 2");
            setDrop(false);
        }
    }
    const setItemsData = (data) =>{
        props.setItemsData(data);
    }
    const getData = (catagory) =>{
        /*if(props.itemsData === undefined){return;}
        let data =[];
        let index=0;
        for(let i=0; i < props.itemsData.length; i++){
            if(props.itemsData[i][4] === catagory){
                data[index] = props.itemsData[i];
                index++;
            }
        }
        console.log(catagory+" data: "+data);
        return data;*/
        let data= []
        switch(catagory){
            default:
                break;
                case "Chicken":
                    data = props.chickItems;
                    break;
                case "Beef":
                    data = props.beefItems;
                    break;
                case "Pork":
                    data = props.porkItems;
                    break;
                case "Fish":
                    data = props.fishItems;
                    break;
                case "Vegetables":
                    data = props.vegItems;
                    break;
        }
        return data;
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
                    <ProductDropdown className="dropdownSml" catagory="Chicken" data={props.itemsData} setItemsData={setItemsData} addToCart = {props.addToCart}
                        setVeg={props.setVegItems} setChick={props.setChickItems} setBeef={props.setBeefItems} setPork={props.setPorkItems} setFish={props.setFishItems}
                        vegItems={props.vegItems} chickItems={props.chickItems} beefItems={props.beefItems} porkItems={props.porkItems} fishItems={props.fishItems}
                    />
                    <ProductDropdown className="dropdownSml" catagory="Beef" data={props.itemsData} setItemsData={setItemsData} addToCart = {props.addToCart}
                        setVeg={props.setVegItems} setChick={props.setChickItems} setBeef={props.setBeefItems} setPork={props.setPorkItems} setFish={props.setFishItems}
                        vegItems={props.vegItems} chickItems={props.chickItems} beefItems={props.beefItems} porkItems={props.porkItems} fishItems={props.fishItems}
                    />
                    <ProductDropdown className="dropdownSml" catagory="Pork" data={props.itemsData}  setItemsData={setItemsData} addToCart = {props.addToCart}
                        setVeg={props.setVegItems} setChick={props.setChickItems} setBeef={props.setBeefItems} setPork={props.setPorkItems} setFish={props.setFishItems}
                        vegItems={props.vegItems} chickItems={props.chickItems} beefItems={props.beefItems} porkItems={props.porkItems} fishItems={props.fishItems}
                    />
                    <ProductDropdown className="dropdownSml" catagory="Fish" data={props.itemsData}  setItemsData={setItemsData} addToCart = {props.addToCart}
                        setVeg={props.setVegItems} setChick={props.setChickItems} setBeef={props.setBeefItems} setPork={props.setPorkItems} setFish={props.setFishItems}
                        vegItems={props.vegItems} chickItems={props.chickItems} beefItems={props.beefItems} porkItems={props.porkItems} fishItems={props.fishItems}
                    />
                </div>
            );
        } else if(props.catagory === "Vegetables"){
            return(
                <div>
                    <button className={props.className} onClick={handleClick}>{props.catagory}</button>
                    <ProductGrid catagory={props.catagory} getData={getData} setItemsData={setItemsData} addToCart = {props.addToCart}/>
                </div>
            );
        }else{
            return(
                <div>
                    <button className={props.className} onClick={handleClick}>{props.catagory}</button>
                    <ProductGrid catagory={props.catagory} getData={getData} itemsData={props.itemsData} setItemsData={setItemsData} addToCart = {props.addToCart}/>
                </div>
            );
        }


    }
}




export default ProductDropdown;