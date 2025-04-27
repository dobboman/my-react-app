
import './App.css';
import Mainpage from './pages/Mainpage';
import { useState } from 'react';
import Login from './pages/Login';
import {BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider} from "react-router-dom";
import {CookiesProvider, useCookies} from 'react-cookie';
import SignUp from './pages/SignUp';
import Layout from './pages/Layout';
import StaffOrdersPage from './pages/StaffOrdersPage';
import Cookies from 'js-cookie';
//import ShoppingCart from './components/main components/ShoppingCart';
//import Sidebar from './components/main components/Sidebar';

function App() {
  //const [page, setPage] = useState("home");
  const [userID, setUserID] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState('');
  //const [cookies, setCookies] = useCookies([('loggedIn',false)])
  //const provider = CookiesProvider;
  if(Cookies.get("loggedIn") === undefined || Cookies.get("loggedIn") === null){
    Cookies.set("loggedIn", false)
  }

  const getLoggedIn = () =>{
    return Cookies.get("loggedIn");
  }
  const setLoggedIn = (input) =>{
    console.log("setLoggedIn called");
    Cookies.remove("loggedIn");
    Cookies.set("loggedIn", "loggedIn");
    console.log(Cookies.get('loggedIn'));
  }
  const setLoggedOut = (input) =>{
    console.log("setLoggedOut called");
    Cookies.remove("loggedIn");
    Cookies.set("loggedIn", "loggedOut");
    console.log(Cookies.get('loggedIn'));
  }


  return(
    //<CookiesProvider defaultSetOptions={{path: '/'}}>
    <BrowserRouter basename='GroceryGuys'>
        <Routes>
          <Route path='/HomePage' element={ <Layout/> }>
            <Route index element={ <Mainpage setUserID={setUserID} userID={userID} isLoggedIn = {isLoggedIn} getLoggedIn={getLoggedIn} setLoggedIn={setLoggedIn} setLoggedOut={setLoggedOut} /> }/>
          </Route>
            <Route path='/Login' element={ <Login setUserID={setUserID} setIsLoggedIn={setIsLoggedIn} setLoggedIn={setLoggedIn} /> }/>
            <Route path='/SignUp' element={<SignUp setUserID={setUserID} setIsLoggedIn={setIsLoggedIn} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/Orders' element={<StaffOrdersPage userID={userID} isLoggedIn={isLoggedIn} getLoggedIn={getLoggedIn} setLoggedIn={setLoggedIn}/>}/>
        </Routes>
    </BrowserRouter>
      //</CookiesProvider>
  );
  /*return(
    <RouterProvider router={router}/>
  );*/

 
}

export default App;
