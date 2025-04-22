import { sha256 } from "js-sha256";
import { Link, redirect, useNavigate } from "react-router-dom";



const SignUp = (props) =>{
    const nav = useNavigate();
    const sigupHandeler = (event) =>{
        event.preventDefault();
        if(document.getElementById('password').value === document.getElementById('passwordConfirm').value){
            signupRequest();
        };
    };
    const signupRequest = async() =>{
        const pass = sha256(document.getElementById('password').value);
        const email = document.getElementById('email').value;
        const phoneNum = document.getElementById('phoneNum').value;
        console.log(pass, email, phoneNum);
        const data = {
            username: email,
            password: pass,
            phoneNumber: phoneNum
        };
        const serverRequest = await fetch("http://localhost/GroceryGuys/PHP/SignUp.php",{
            method: "POST",
            body: JSON.stringify(data)
        });
        const response = await serverRequest.json();
        console.log(response);
        if(response === true){
            console.log('entered set pass and usr statement');
            props.setUsername(email);
            props.setPassword(pass);
            nav(-1);
        };
    };
    
    return(
        <>
            <div className="col-1"></div>
            <div className="col-10 login">
                <div className="row">
                    <h2>SignUp</h2>
                </div>
                <div className="row">
                    <form onSubmit={sigupHandeler}>
                        <h3>Email</h3>
                        <input id="email" type="email"></input>
                        <h3>Phone Number</h3>
                        <input id="phoneNum" type="tel"></input>
                        <h3>Password</h3>
                        <input id="password" type="password"></input>
                        <h3>Re-enter Password</h3>
                        <input id="passwordConfirm" type="password"></input>
                        <button type="submit">SignUp</button>
                    </form>
                </div>
            </div>
            <div className="col-1"></div> 
        </>
    );
}
export default SignUp;