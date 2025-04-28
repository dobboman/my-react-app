import { sha256 } from "js-sha256";
import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import EmailInput from "../components/SignUp Prompts/EmailInput";
import PasswordInput from "../components/SignUp Prompts/PasswordInput";
import PhoneInput from "../components/SignUp Prompts/PhoneInput";
import NameInput from "../components/SignUp Prompts/NameInput";
import Banner from "../components/main components/Banner";



const SignUp = (props) =>{
    const nav = useNavigate();
    const [passwordPromptsClass, setPasswordPromptsClass] = useState("passwordPromptsHidden");
    const [emailPromtsClass, setEmailPromptsClass] = useState("invisible");
    const [phonePromtsClass, setPhonePromptsClass] = useState("invisible");
    const [namePromptClas, setNamePromptsClass] = useState("invisible");

    const [emailClass, setEmailClass] = useState("invalid");
    const [phoneClass, setPhoneClass] = useState("invalid");
    const [nameSpacesClass, setNameSpacesClass] = useState("invalid");
    const [nameSpecialCharsClass, setNameSpecialCharsClass] = useState("invalid");

    const [lowercaseClass, setLowercaseClass] = useState("invalid");
    const [uppercaseClass, setUppercaseClass] = useState("invalid");
    const [numberClass, setNumberClass] = useState("invalid");
    const [specialCharClass, setSpecialCharClass] = useState("invalid");
    const [lengthClass, setLengthClass] = useState("invalid");
    const [passwordClass, setPasswordClass] = useState("valid");
    const [spaceClass, setspaceClass] = useState("valid");

    const sigupHandeler = (event) =>{
        event.preventDefault();
        
        if(lowercaseClass === "valid" && uppercaseClass === "valid" && numberClass === "valid" && specialCharClass === "valid" && lengthClass === "valid" && passwordClass === "valid" && spaceClass === "valid"){
            signupRequest();
        }else{
            /*if(lowercaseClass === "invalid"){window.alert("Lowercase letters needed");};
            if(passwordClass === "invalid"){window.alert("Passwors do not match");};*/
            window.alert("Password invalid or don't match please see below");
            
        };
    };

    const signupRequest = async() =>{
        let errorMsgComponents = [];
        let validInputs = true;
        let index = 0;
        console.log(errorMsgComponents.length);
        if(emailClass === "invalid"){
            errorMsgComponents[index] = "email";
            index++
            validInputs = false;
        }
        if(nameSpacesClass === "invalid" || nameSpecialCharsClass === "invalid"){
            errorMsgComponents[index] = "name";
            index++
            validInputs = false;
        }
        if(phoneClass === "invalid"){
            errorMsgComponents[index] = "phone";
            index++
            validInputs = false;
        }
        if(lowercaseClass === "invalid" || uppercaseClass === "invalid" || numberClass === "invalid" || specialCharClass === "invalid" || lengthClass === "invalid" || passwordClass === "invalid" || spaceClass === "invalid"){
            errorMsgComponents[index] = "password";
            index++
            validInputs = false;
        }
        if(validInputs === false){
            let errorMsg = "invalid: ";
            for(let i=0; i < errorMsgComponents.length; i++){
                errorMsg += errorMsgComponents[i];
                if(i === errorMsgComponents.length -2){errorMsg += " & "};
                if(i < errorMsgComponents.length-2){ errorMsg += ", "};
            }
            window.alert(errorMsg);
        }else{//request server to make new entry in user table
            const email = document.getElementById('email').value;
            const name = document.getElementById("fullname").value;
            const phoneNum = document.getElementById('phoneNum').value;
            const pass = sha256(document.getElementById('password').value);
            console.log(pass, email, phoneNum);
            const data = {
                email: email,
                username: name,
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
        }
    };
    const lowercaseLetters = /[a-z]/g;
    const uppercaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialChars = /[!-\/:-@[-`{-~]/g;
    const spaces = /\s/g;
    const at = /@/g;
    const dotCom = /.com/g;
    const dotCoDotUk = /.co.uk/g;
    const dotAcdotUk = /.ac.uk/g;
    const phoneLength = /^\d{11,11}$/g;
    
    const validateEmail = () =>{
        const email = document.getElementById("email").value;
        if(email.match(at)){
            if(email.match(dotCom) || email.match(dotCoDotUk) || email.match(dotAcdotUk)){
                setEmailClass("valid");
            }else{
                setEmailClass("invalid");
            }
        }else{
            setEmailClass("invalid");
        }

    };
    const validateName = () =>{
        const name = document.getElementById("fullname").value;
        if(name.match(specialChars)){
            setNameSpecialCharsClass("invalid");
        }else{
            setNameSpecialCharsClass("valid");
        }
        if(name.match(spaces||[]).length > 1 || name.match(spaces||[]).length === 0){
            setNameSpacesClass("invalid");
        }else{
            setNameSpacesClass("valid");
        }
    };
    const validatePhoneNum = () => {
        const phone = document.getElementById("phoneNum").value;
        if(phone.match(phoneLength)){
            setPhoneClass("valid");
        }else{
            setPhoneClass("invalid");
        }

    };
    const validatePassword = () => {
        console.log("validate pass")
        const pass = document.getElementById("password").value;
        const passConfirm = document.getElementById("passwordConfirm").value;

        if(pass.match(lowercaseLetters) || passConfirm.match(lowercaseLetters)){
            setLowercaseClass("valid");
        }else{
            setLowercaseClass("invalid")
        }

        if(pass.match(uppercaseLetters) || passConfirm.match(uppercaseLetters)){
            setUppercaseClass("valid");
        }else{
            setUppercaseClass("invalid");
        }

        if(pass.match(numbers) || passConfirm.match(numbers)){
            setNumberClass("valid");
        }else{
            setNumberClass("invalid");
        }

        if(pass.match(specialChars) || passConfirm.match(specialChars)){
            setSpecialCharClass("valid");
        }else{
            setSpecialCharClass("invalid");
        }
        if(pass.match(spaces) || passConfirm.match(spaces)){
            setSpecialCharClass("invalid");
        }else{
            setSpecialCharClass("valid");
        }

        if(pass.length > 8  || passConfirm.length > 8){
            setLengthClass("valid");
        }else{
            setLengthClass("invalid");
        }

        if(passConfirm === pass){
            setPasswordClass("valid");
        }else{
            setPasswordClass("invalid");
        }
    };
    const showPrompts = (prompt) =>{
        
        switch(prompt){
            case "password":
                console.log("password focused");
                if(passwordPromptsClass !== "passwordPromtsVisible"){
                    setPasswordPromptsClass("passwordPromtsVisible");
                }
                /*hidePrompts("email");
                hidePrompts("phone");*/
                break;
            case "email":
                console.log("email focused");
                if(emailPromtsClass !== "visible"){
                    setEmailPromptsClass("visible");
                }
                /*hidePrompts("password");
                hidePrompts("phone");*/
                break;
            case "phone":
                console.log("phone focused");
                if(phonePromtsClass !== "visible"){
                    setPhonePromptsClass("visible");
                }
                /*hidePrompts("email");
                hidePrompts("password");*/
                break;
            case "fullName":
                console.log("fullName focused");
                if(phonePromtsClass !== "visible"){
                    setNamePromptsClass("visible");
                }
                break;
            default:
                break;
            }
    };
    const hidePrompts = (prompt) =>{
        switch(prompt){
            case "password":
                console.log("password unFocused");
                if(passwordPromptsClass !== "passwordPromptsHidden"){
                    setPasswordPromptsClass("passwordPromptsHidden");
                }
                break;
            case "email":
                console.log("email unfocused");
                if(emailPromtsClass !== "invisible"){
                    setEmailPromptsClass("invisible");
                }
                break;
            case "phone":
                console.log("phone unfocused");
                if(phonePromtsClass !== "invisible"){
                    setPhonePromptsClass("invisible");
                }
                break;
            case "fullName":
                console.log("fullName unfocused");
                if(phonePromtsClass !== "invisible"){
                    setNamePromptsClass("invisible");
                }
                break;
            default:
                break;
        }
    };
    
    return(
        <>
            <Banner/>
            <div className="col-1"></div>
            <div className="col-10 login">
                <div className="row">
                    <h2>SignUp</h2>
                </div>
                <div className="row">
                    <form onSubmit={sigupHandeler}>
                        <EmailInput validate={validateEmail} promptClass={emailPromtsClass} pClass={emailClass} showPrompts={showPrompts} hidePrompts={hidePrompts}/>

                        <NameInput validate={validateName} promptClass={namePromptClas} spacesClass={nameSpacesClass} specialChars={nameSpecialCharsClass} showPrompts={showPrompts} hidePrompts={hidePrompts}/>

                        <PhoneInput validate={validatePhoneNum} promptClass={phonePromtsClass} pClass={phoneClass} showPrompts={showPrompts} hidePrompts={hidePrompts}/>

                        <PasswordInput validate={validatePassword} promptClass={passwordPromptsClass} pClass={passwordClass} showPrompts={showPrompts} hidePrompts={hidePrompts}
                                    spaces={spaceClass} lower={lowercaseClass} caps={uppercaseClass} number={numberClass} length={lengthClass}
                                    specialChar={specialCharClass} passwordMatch={passwordClass}   
                        />                       
                        <button type="submit">SignUp</button>
                    </form>
                </div>
            </div>
            <div className="col-1"></div> 
        </>
    );
}
export default SignUp;