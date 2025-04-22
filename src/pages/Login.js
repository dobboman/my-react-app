import { useRef } from "react";
import Sidebar from "../components/main components/Sidebar";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import {sha256} from 'js-sha256';


const Login = (props) =>{

    const usernameRef = useRef();
    const passwordRef = useRef();
    const nav = useNavigate();

    const loginHandler = (event) =>{
        event.preventDefault();
        console.log("login handeler callled")
        loginRequest();
        /*const success = loginRequest();
        console.log("rtn form loginReq ".success);
        if(success){
            nav(-1);
            //redirect("http://localhost");
        } else{
            window.alert("Email address or password is incorrect");
        }*/
        
    }
    const loginRequest = async() =>{
        const pass = sha256(passwordRef.current.value); //hashed client side aswell as it will be stored for later use
        const usrnm = usernameRef.current.value;
        const data = {
                username: usrnm,
                password: pass
            };
           
        const requestData = await fetch("http://localhost/GroceryGuys/PHP/login.php" ,{ 
            method: "POST",
            body: JSON.stringify(data)
        });
        const responseData = await requestData.json();
        console.log(responseData);
        //console.log(responseData.data);
        if(responseData === true){
            console.log('entered set pass and usr statement');
            props.setUsername(usrnm);
            props.setPassword(pass);
            nav("http://localhost/GrocerGuys/HomePage");
        }else{
            console.log("alert should show");
            window.alert("Email or Password was incorrect");
        }
    }
    
    return(
    <>
        <div className="col-1"></div>
        <div className="col-10 login">
            <div className="row">
                <h2>Login</h2>
            </div>
            <div className="row">
                <form id="loginInfo" onSubmit={loginHandler}>
                <h3>Email</h3>
                <input id="email" ref={usernameRef} type="email" required></input>
                <h3>Password</h3>
                <input id="password" ref={passwordRef} type="password" required></input>

                    <button id="loginBtn" className="loginBtn" >Login</button>    

                </form>
            </div>
            <div className="row">
                <h3>Dont have an account with us?</h3>
                <Link to="/SignUp">
                    <button id="signUpBtn" className="signUpBtn">Signup</button>
                </Link>
            </div>
        </div>
        <div className="col-1">

        </div>
    </>
    );
}

//<button id="loginBtn" type="submit" className="loginBtn" onClick={loginHandler}>Login</button>    
export default Login;