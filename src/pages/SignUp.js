import { sha256 } from "js-sha256";
import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";



const SignUp = (props) =>{
    const nav = useNavigate();
    const [lowercaseClass, setLowercaseClass] = useState("invalid");
    const [uppercaseClass, setUppercaseClass] = useState("invalid");
    const [numberClass, setNumberClass] = useState("invalid");
    const [specialCharClass, setSpecialCharClass] = useState("invalid");
    const [lengthClass, setLengthClass] = useState("invalid");
    const [passwordClass, setPasswordClass] = useState("invalid");
    const sigupHandeler = (event) =>{
        event.preventDefault();
        
        if(document.getElementById('password').value === document.getElementById('passwordConfirm').value){
            signupRequest();
        }else{
            window.alert("Passwors do not match");
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
            nav("http://localhost/GrocerGuys/HomePage");
        }else{
            window.alert("there is already an account with this email adress");
        };
    };
    const validateEmail = () =>{

    };
    const validatePhoneNum = () => {
        
    };
    const lowercaseLetters = /[a-z]/g;
    const uppercaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialChars = /D/g;
    const validatePassword = () => {
        const pass = document.getElementById("password").value;
        const passConfirm = document.getElementById("passwordConfirm").value;
        /*const lowercase = document.getElementById("lower").value;
        const uppercase = document.getElementById("caps").value;
        const number = document.getElementById("number").value;
        const length = document.getElementById("length").value;
        const specialChar = document.getElementById("specialChar").value;*/

        if(pass.match(lowercaseLetters)){
            setLowercaseClass("valid");
        }else{
            setLowercaseClass("invalid")
        }

        if(pass.match(uppercaseLetters)){
            setUppercaseClass("valid");
        }else{
            setUppercaseClass("invalid");
        }

        if(pass.match(numbers)){
            setNumberClass("valid");
        }else{
            setNumberClass("invalid");
        }

        if(pass.match(specialChars)){
            setSpecialCharClass("valid");
        }else{
            setSpecialCharClass("invalid");
        }

        if(pass.length > 8){
            setLengthClass("valid");
        }else{
            setLengthClass("invalid");
        }

        if(passConfirm === pass){
            setPasswordClass("valid");
        }else{
            setPasswordClass("invalid");
        }


    }
    
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
                        <input id="email" type="email" required onKeyUp={validateEmail}></input>
                        <h3>Phone Number</h3>
                        <input id="phoneNum" type="tel" required onKeyUp={validatePhoneNum}></input>
                        <h3>Password</h3>
                        <input id="password" type="password" required onKeyUp={validatePassword}></input>
                        <h3>Re-enter Password</h3>
                        <input id="passwordConfirm" type="password" required onKeyUp={validatePassword} pattern="(?=.*\d)(?=.*\D)(?=.*[A-Z])(?=.*[a-z]) (?=.*[]).{8,}"></input>
                        <div className="passwordPrompts">
                            <p id="lower" className={lowercaseClass}>A <b>Lowercase</b>letter</p>
                            <p id="caps" className={uppercaseClass}>A <b>Uppercase</b>letter</p>
                            <p id="number" className={numberClass}>A <b>number</b></p>
                            <p id="length" className={lengthClass}> <b>length</b>larger than<b>8</b></p>
                            <p id="specialChar" className={specialCharClass}>A <b>Special</b>Character</p>
                            <p id="passwordMatch" className={passwordClass}>A <b>Passwords</b>match</p>

                        </div>
                        <button type="submit">SignUp</button>
                    </form>
                </div>
            </div>
            <div className="col-1"></div> 
        </>
    );
}
export default SignUp;