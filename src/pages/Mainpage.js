import Aboutus from "../components/main page/Aboutus";
import Products from "../components/main page/Products";
import Sidebar from "../components/main components/Sidebar";
import ShoppingCart from "../components/main components/ShoppingCart";
import { useState } from "react";

function Mainpage(props){
   const [loggedIn, setLoggedIn] = useState(false);
   const [itemsData, setItemsData] = useState(null);
   const [vegItems, setVegItems] = useState([[]]);
   const [chickItems, setChickItems] = useState([[]]);
   const [beefItems, setBeefItems] = useState([[]]);
   const [porkItems, setPorkItems] = useState([[]]);
   const [fishItems, setFishItems] = useState([[]]);
   const [dataLoaded, setDataLoaded] = useState(false);

   const getTableData = async() =>{
    console.log("inside getTableData");
    //console.log(JSON.stringify(props.catagory));
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
        for(let i=0; i < responseData.length; i++){
            if(responseData[i][4] === catagories[c]){
                data[index] = responseData[i];
                index++;
            }
        }
        console.log(catagories[c]+" data: "+data);
        switch(catagories[c]){
            default:
                break;
                case "Chicken":
                    setChickItems(data);
                    break;
                case "Beef":
                    setBeefItems(data);
                    break;
                case "Pork":
                    setPorkItems(data);
                    break;
                case "Fish":
                    setFishItems(data);
                    break;
                case "Vegetables":
                    setVegItems(data);
                    break;
        }
    }
    setDataLoaded(true);
    setItemsData(requestData);
    
    /*props.setTableData(
        responseData
    );*/
}

    if(itemsData === null){
        console.log("getTableData()")
        getTableData();
    }
    if(props.username !== '' && props.password !== '' && loggedIn === false ){
        setLoggedIn(true);
        console.log(props.username);
        console.log(props.password);
        //console.log(loggedIn);
    }

    const logout = () =>{
        //const confirmLogout = confirm("Are you sure you want to logout");
        if(window.confirm("Are you sure you want to logout") === true){
            props.setUsername('');
            props.setPassword('');
            setLoggedIn(false);
            console.log("usrnm & psswrd should be reset");
        }
        
    }
    const addItemToCart = () =>{}

    return(
        <>
        <Sidebar logout={logout} loggedIn={loggedIn}/>
        <div className="row">
            <div className="col-1 spacerCol">
                <p>stuff</p>
            </div>
            <div className="col-10 ">
                <div className="aboutus">
                    <Aboutus/>
                </div>
                <div className="pt-2">
                    <div className="products">
                    <Products itemsData={itemsData} setItemsData={setItemsData} addItemToCart={addItemToCart} setVeg={setVegItems} setChick={setChickItems} setBeef={setBeefItems} setPork={setPorkItems} setFish={setFishItems}
                                    vegItems={vegItems} chickItems={chickItems} beefItems={beefItems} porkItems={porkItems} fishItems={fishItems} dataLoaded={dataLoaded}
                    />
                    </div>
                </div>
            </div>
        </div>
        <ShoppingCart/>
        </>
    );
}

export default Mainpage;