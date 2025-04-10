
import './App.css';
import Banner from './components/main components/Banner';
import Mainpage from './components/main page/Mainpage';
import { useState } from 'react';
import Login from './components/signin & out/Login';
//import ShoppingCart from './components/main components/ShoppingCart';
//import Sidebar from './components/main components/Sidebar';

function App() {
  const [page, setPage] = useState("home");

  if(page === "home"){
    return (
      <>
        <Banner/>
        <Mainpage setPage={setPage}/>
      </>
    );
  }else if(page === "login"){
    return(
      <>
        <Banner/>
        <Login/>
      </>
    );
  }

 
}

export default App;
