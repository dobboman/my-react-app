import Sidebar from "../main components/Sidebar";


const Login = ()=>{
    return(
    <>

        <div className="col-1"></div>
        <div className="col-10 login">
            <div className="row">
                <h2>Login</h2>
            </div>
            <div className="row">
                <form id="loginInfo">
                <h3>Email</h3>
                <input id="email" type="email" required></input>
                <h3>Password</h3>
                <input id="password" type="password" required></input>
                <button id="loginBtn" type="submit" className="loginBtn">Login</button>    
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

export default Login;