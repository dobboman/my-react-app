import { useRef } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import {sha256} from 'js-sha256';
import CAPTCHA from "../components/CAPTCHA";
import { useState } from "react";
import Banner from "../components/main components/Banner";


const Login = (props) =>{

    const emailRef = useRef();
    const passwordRef = useRef();
    const captchaRef = useRef();
    const nav = useNavigate();
    const [captchaInfo, setCaptchaInfo] = useState(null);

    const loginHandler = (event) =>{
        event.preventDefault();
        console.log("login handeler callled")
        loginRequest();
        
    }
    const loginRequest = async() =>{
        const pass = sha256(passwordRef.current.value); //hashed client side aswell to minimize risk of post being intersepted, also allows this value passed to server to be stored in session as it is not in plain text form
        const email = emailRef.current.value;
        const captchaAns = captchaRef.current.value;
        const data = {
                email: email,
                password: pass,
                captchaID: captchaInfo[0],
                captchaAns: captchaAns
            };
           
        const requestData = await fetch("http://localhost/GroceryGuys/PHP/login.php" ,{ 
            method: "POST",
            body: JSON.stringify(data)
        });
        const responseData = await requestData.json();
        //console.log(responseData);
        
        if(responseData["success"] === true){
            console.log('entered set pass and usr statement');
            props.setUserID(...responseData["userID"]);
            props.setLoggedIn(true);
            redirect("http://localhost/GrocerGuys/HomePage");
            nav(-1);

        }else{
            console.log("alert should show");
            window.alert(responseData["error"]);
        }
    }
    const getCaptchaInfo = async() =>{
        const request = await fetch("http://localhost/GroceryGuys/PHP/getCAPTCHA.php",{
            method: "GET"
        })
        const response = await request.json();
       
       setCaptchaInfo(response);
        
    }
    if(captchaInfo === null){//get captcha ID and URL
        getCaptchaInfo();
    }
    
    return(
    <>
        <Banner/>
        <div className="col-1"></div>
        <div className="col-10 login">
            <div className="row">
                <form id="loginInfo" onSubmit={loginHandler}>
                <h3>Email</h3>
                <input id="email" ref={emailRef} type="email" required></input>
                <h3>Password</h3>
                <input id="password" ref={passwordRef} type="password" required></input>
                {captchaInfo !== null &&
                    <CAPTCHA ref={captchaRef} img={captchaInfo[1]}/>    
                }
                <button id="loginBtn" className="loginBtn" >Login</button>
                </form>
            </div>
            <div className="row">
                <h3>Don't have an account with us?</h3>
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

export default Login;