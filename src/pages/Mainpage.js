import Aboutus from "../components/main page/Aboutus";
import Products from "../components/main page/Products";
import Sidebar from "../components/main components/Sidebar";
import ShoppingCart from "../components/main components/ShoppingCart";
import { useState } from "react";
import { useCookies } from "react-cookie";

function Mainpage(props){
   //const [loggedIn, setLoggedIn] = useState(false);
   const [itemsData, setItemsData] = useState(null);
   const [vegItems, setVegItems] = useState([[]]);
   const [chickItems, setChickItems] = useState([[]]);
   const [beefItems, setBeefItems] = useState([[]]);
   const [porkItems, setPorkItems] = useState([[]]);
   const [fishItems, setFishItems] = useState([[]]);
   const [dataLoaded, setDataLoaded] = useState(false);
   const [shoppingCartData, setShoppingCartData] = useState(new Array(0));
   const [quantity, setQuantity] = useState([[]]);

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
        let quantityTemp = [[],[],[],[],[]];
        console.log(quantityTemp);
        
        for(let c=0; c <5 ; c++){
            let data =[];
            let index=0;
            for(let i=0; i < responseData.length; i++){
                if(responseData[i][4] === catagories[c]){
                    data[index] = responseData[i];//add item of match catagory into temp array

                    if( Array.isArray(shoppingCartData[0]) || shoppingCartData.length !== 0 ){//if cart !empty
                        console.log("cart should have items");
                        console.log(shoppingCartData);
                        //console.log(shoppingCartData[0].length);
                        for(let quantIndex=0; quantIndex < shoppingCartData.length ;quantIndex){
                            if(requestData[i][0] === shoppingCartData[quantIndex][0]){// if itemID in itemData = itemID in cart
                                quantityTemp[c][index] = shoppingCartData[quantIndex][3];//set quantity of item in cart 
                            }else{
                                console.log("catagory = "+c+ "index = "+index);
                                quantityTemp[c][index] = 0;//else set 0 as item not in cart
                            }
                        }
                    }else{
                        console.log("catagory = "+c+ "index = "+index);
                        quantityTemp[c][index] = 0;//cart empty so quantity of item must be 0
                    }
                    index++;
                }
            //console.log(catagories[c]+" data: "+data);
            //console.log(quantityTemp);
                switch(catagories[c]){//store value in temp arrray in corrosponding array for catagory
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
        }
        //if item in cart get quantity
        let quantityIndex;
        let qauntityValue;
        let currentItemCatagoty;
        /*if( !Array.isArray(shoppingCartData[0]) || shoppingCartData[0].length === 0 )//if cart isnt empty
        for(let i=0; i<shoppingCartData.length; i++){
            for(let index=0; index < responseData.length; index++){
                if(shoppingCartData[i][0] === responseData[index][0]){
                    currentItemCatagoty = responseData[index][4];
                    }
                    for(let quantIndex=0; quantIndex < quantity[currentItemCatagoty].length ; quantIndex++){
                        if(quantity[currentItemCatagoty][quantIndex]){
                            
                        }
                        }
                        }
                        }*/
                       
        setDataLoaded(true);
        setItemsData(requestData);
        setQuantity(quantityTemp);
        console.log("/////////////////////////inside getData///////////////////////")
        console.log(quantityTemp);
        console.log(vegItems);
        console.log(fishItems);
        console.log(porkItems);
        console.log(beefItems);
        console.log(chickItems);
    }


    if(itemsData === null){
        console.log("getTableData()")
        getTableData();
    }else{
        console.log("/////////////////////////after data is set///////////////////////");
        console.log(quantity);
        console.log(vegItems);
        console.log(fishItems);
        console.log(porkItems);
        console.log(beefItems);
        console.log(chickItems);
    }
    if(props.userID !== '' && props.isloggedIn === false ){
        props.setIsLoggedIn(true);
        //console.log(loggedIn);
    }

    const logout = async() =>{
        //const confirmLogout = confirm("Are you sure you want to logout");
        if(window.confirm("Are you sure you want to logout") === true){
            const serverRespone = await fetch("http://localhost/GroceryGuys/PHP/logout.php",{
                method: "GET",
            })
            const response = await serverRespone.json();
            if(response["status"] === "logged out"){
                //props.setIsLoggedIn(false);
                console.log("logout complete");
                props.setLoggedOut(false);
                props.setUserID(...'');
            }
        }
        
    }
    const addItemToCart = () =>{}

    console.log(props.getLoggedIn())

    return(
        <>
        <Sidebar logout={logout} getLoggedIn={props.getLoggedIn}/>
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
                    <Products itemsData={itemsData} setItemsData={setItemsData} cartData={shoppingCartData} setCartData={setShoppingCartData}
                        vegItems={vegItems} chickItems={chickItems} beefItems={beefItems} porkItems={porkItems} fishItems={fishItems} dataLoaded={dataLoaded}
                        quantity={quantity} setQuantity={setQuantity}                                    
                    />
                    </div>
                </div>
            </div>
        </div>
        <ShoppingCart cartData={shoppingCartData} setCartData={setShoppingCartData} />
        </>
    );
}

export default Mainpage;