import { useRef } from "react";
import Sidebar from "../components/main components/Sidebar";
import { Link } from "react-router-dom";


const Login = (props) =>{

    const usernameRef = useRef();
    const passwordRef = useRef();

    const loginHandler = async(e) =>{
        props.setUsername(usernameRef.current.value);
        props.setPassword(passwordRef.current.value);
        const requestData = await fetch("http://localhost/PHP/login.php" ,{ 

        })
        e.preventDefault();
    }

    return(
    <>
        <div className="col-1"></div>
        <div className="col-10 login">
            <div className="row">
                <h2>Login</h2>
            </div>
            <div className="row">
                <form id="loginInfo" method={loginHandler}>
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