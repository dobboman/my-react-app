import { useRef } from "react";
import Sidebar from "../components/main components/Sidebar";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useNavigation } from "react-router-dom";


const Login = (props) =>{

    const usernameRef = useRef();
    const passwordRef = useRef();
    const nav = useNavigate();

    const loginHandler = (event) =>{
        event.preventDefault();
        console.log("login handeler callled")
        if(loginRequest()){
            nav(-1);
            //redirect("http://localhost");
        } else{
            alert("Email address already associated with account");
        }
        
    }
    const loginRequest = async() =>{
        const data = [usernameRef.current.value, passwordRef.current.value];
        const pass = passwordRef.current.value;
        const usrnm = usernameRef.current.value;
        const requestData = await fetch("http://localhost/PHP/login.php" ,{ 
            method: "POST",
            body: JSON.stringify(data)
        });
        const responseData = await requestData.json();
        console.log(responseData);
        console.log(responseData.data);
        if(responseData === true){
            console.log('entered set pass and usr statement')
            props.setUsername(usrnm);
            props.setPassword(pass);
            return true;
        }
        return false;
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
                <button id="signUpBtn" className="signUpBtn">Signup</button>
            </div>
        </div>
        <div className="col-1">

        </div>
    </>
    );
}

//<button id="loginBtn" type="submit" className="loginBtn" onClick={loginHandler}>Login</button>    
export default Login;