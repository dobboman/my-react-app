
import './App.css';
import Mainpage from './pages/Mainpage';
import { useState } from 'react';
import Login from './pages/Login';
import {BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider} from "react-router-dom";
import SignUp from './pages/SignUp';
import Layout from './pages/Layout';
//import ShoppingCart from './components/main components/ShoppingCart';
//import Sidebar from './components/main components/Sidebar';

function App() {
  //const [page, setPage] = useState("home");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
          <Route index element={ <Mainpage setPassword={setPassword} setUsername={setUsername} username={username} password={password}/> }/>
        </Route>
          <Route path='/Login' element={ <Login setPassword={setPassword} setUsername={setUsername}/> }/>
          <Route path='/SignUp' element={<SignUp setPassword={setPassword} setUsername={setUsername}/>}/>
      </Routes>
    </BrowserRouter>
  );
  /*return(
    <RouterProvider router={router}/>
  );*/

 
}

export default App;
