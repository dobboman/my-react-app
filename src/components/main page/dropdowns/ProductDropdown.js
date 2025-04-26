import ProductGrid from "./ProductGrid";
import {useState} from "react"

//const dropdown = false;
    
function ProductDropdown(props){
    //const drop = props.drop;
    const [drop, setDrop] = useState(false);
    //const [tableData, setTableData] = useState([[]]);

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
        props.setTableData(
            responseData
        );
    }

    function handleClick(){
        if(drop === false){
            //console.log("da fug");
            getTableData();
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
                    <ProductDropdown className="dropdownSml" catagory="Chicken" tableData={props.tableData} setTableData={props.setTableData}/>
                    <ProductDropdown className="dropdownSml" catagory="Beef" tableData={props.tableData} setTableData={props.setTableData}/>
                    <ProductDropdown className="dropdownSml" catagory="Pork" tableData={props.tableData} setTableData={props.setTableData}/>
                    <ProductDropdown className="dropdownSml" catagory="Fish" tableData={props.tableData} setTableData={props.setTableData}/>
                </div>
            );
        } else if(props.catagory === "Vegetables"){
            return(
                <div>
                    <button className={props.className} onClick={handleClick}>{props.catagory}</button>
                    <ProductGrid catagory={props.catagory} data={props.tableData}/>
                </div>
            );
        }else{
            return(
                <div>
                    <button className={props.className} onClick={handleClick}>{props.catagory}</button>
                    <ProductGrid catagory={props.catagory} data={props.tableData}/>
                </div>
            );
        }


    }
}




export default ProductDropdown;