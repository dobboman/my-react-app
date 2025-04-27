
import './App.css';
import Mainpage from './pages/Mainpage';
import { useState } from 'react';
import Login from './pages/Login';
import {BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider} from "react-router-dom";
import SignUp from './pages/SignUp';
import Layout from './pages/Layout';
import StaffOrdersPage from './pages/StaffOrdersPage';
//import ShoppingCart from './components/main components/ShoppingCart';
//import Sidebar from './components/main components/Sidebar';

function App() {
  //const [page, setPage] = useState("home");
  const [userID, setUserID] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState('');

  /*const router = createBrowserRouter([
    {path: '/', element: <Layout/>},
    {index , element: <Mainpage setPassword={setPassword} setUsername={setUsername} username={username} password={password}/>},
    {path: '/login', element: <Login setPassword={setPassword} setUsername={setUsername}/>},
    {path: '/signup', element: <SignUp setPassword={setPassword} setUsername={setUsername}/>},

  ]);*/

  return(
    <BrowserRouter basename='GroceryGuys'>
      <Routes>
        <Route path='/HomePage' element={ <Layout/> }>
          <Route index element={ <Mainpage setUsername={setUserID} userID={userID}/> }/>
        </Route>
          <Route path='/Login' element={ <Login setUserID={setUserID}/> }/>
          <Route path='/SignUp' element={<SignUp setUserID={setUserID}/>}/>
          <Route path='/Orders' element={<StaffOrdersPage userID={userID} isLoggedIn={isLoggedIn}/>}/>
      </Routes>
    </BrowserRouter>
  );
  /*return(
    <RouterProvider router={router}/>
  );*/

 
}

export default App;
