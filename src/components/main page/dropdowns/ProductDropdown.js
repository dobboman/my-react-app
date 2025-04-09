import ProductGrid from "./ProductGrid";
import {useState} from "react"

//const dropdown = false;
    
function ProductDropdown(props){
    //const drop = props.drop;
    const [drop, setDrop] = useState(false);
    const [tableData, setTableData] = useState([]);

    function getTableData(catagory){
        setTableData([

        ]);
    }

    function handleClick(){
        if(drop === false){
            //console.log("da fug");
            getTableData(props.catagory);
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
                    <ProductDropdown className="dropdownSml" catagory="Chicken"/>
                    <ProductDropdown className="dropdownSml" catagory="Beef"/>
                    <ProductDropdown className="dropdownSml" catagory="Pork"/>
                    <ProductDropdown className="dropdownSml" catagory="Fish"/>
                </div>
            );
        } else if(props.catagory === "Vegetabels"){
            return(
                <div>
                    <button className={props.className} onClick={handleClick}>{props.catagory}</button>
                    <ProductGrid catagory={props.catagory}/>
                </div>
            );
        }else{
            return(
                <div>
                    <button className={props.className} onClick={handleClick}>{props.catagory}</button>
                    <ProductGrid catagory={props.catagory}/>
                </div>
            );
        }


    }
}




export default ProductDropdown;