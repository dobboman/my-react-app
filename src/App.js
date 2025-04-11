
import './App.css';
import Mainpage from './pages/Mainpage';
import { useState } from 'react';
import Login from './pages/Login';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignUp from './pages/SignUp';
import Layout from './pages/Layout';
//import ShoppingCart from './components/main components/ShoppingCart';
//import Sidebar from './components/main components/Sidebar';

function App() {
  //const [page, setPage] = useState("home");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Layout/> }>
          <Route index element={ <Mainpage setPassword={setPassword} setUsername={setUsername} username={username} password={password}/> }/>
          <Route path='Login' element={ <Login setPassword={setPassword} setUsername={setUsername}/> }/>
          <Route path='SignUp' element={<SignUp setPassword={setPassword} setUsername={setUsername}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );

 
}

export default App;
