import { sha256 } from "js-sha256";
import { Link, redirect, useNavigate } from "react-router-dom";



const SignUp = (props) =>{
    const nav = useNavigate();
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
        const lowercase = document.getElementById("lower").value;
        const uppercase = document.getElementById("caps").value;
        const number = document.getElementById("number").value;
        const length = document.getElementById("length").value;
        const specialChar = document.getElementById("specialChar").value;

        if(pass.match(lowercaseLetters)){
            lowercase.classList.remove("invalid");
            lowercase.classList.add("valid");
        }else{
            lowercase.classList.remove("valid");
            lowercase.classList.add("invalid");
        }

        if(pass.match(uppercaseLetters)){
            uppercase.classList.remove("invalid");
            uppercase.classList.add("valid");
        }else{
            uppercase.classList.remove("valid");
            uppercase.classList.add("invalid");
        }

        if(pass.match(numbers)){
            number.classList.remove("invalid");
            number.classList.add("valid");
        }else{
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        if(pass.match(specialChars)){
            specialChar.classList.remove("invalid");
            specialChar.classList.add("valid");
        }else{
            specialChar.classList.remove("valid");
            specialChar.classList.add("invalid");
        }

        if(pass.length > 8){
            length.classList.remove("invalid");
            length.classList.add("valid");
        }else{
            length.classList.remove("valid");
            length.classList.add("invalid");
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
                            <p id="lower" className="invalid">A <b>Lowercase</b>letter</p>
                            <p id="caps" className="invalid">A <b>Uppercase</b>letter</p>
                            <p id="number" className="invalid">A <b>number</b></p>
                            <p id="length" className="invalid">A <b>length</b></p>
                            <p id="specialChar" className="invalid">A <b>Special</b>Character</p>
                            <p id="passwordMatch" className="invalid">A <b>Passwords</b>match</p>

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