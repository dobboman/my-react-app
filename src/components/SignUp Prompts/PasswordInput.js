const PasswordInput = (props) =>{
    const focusHandler = (e) =>{
        //console.log("focusHandlerEmail");
        props.showPrompts("password");
    }
    const blurHandler = (e) =>{
        //console.log("blureHandlerEmail");
        props.hidePrompts("password");
    }
    return(
        <>
            <h3>Password</h3>
            <input id="password" type="password" required onKeyUp={props.validate} onFocus={focusHandler} onBlur={blurHandler}/>
            <h3>Re-enter Password</h3>
            <input id="passwordConfirm" type="password" required onClick={console.log("passowrd onclick")} onKeyUp={props.validate} onFocus={focusHandler} onBlur={blurHandler} pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z]) (?=.*[]).{8,}"/>

            <div className={props.promptClass}>
                <p id="spaces" className={props.spaces}><b>No Spaces</b> in password</p>
                <p id="lower" className={props.lower}>A <b>Lowercase</b> letter</p>
                <p id="caps" className={props.caps}>A <b>Uppercase</b> letter</p>
                <p id="number" className={props.number}>A <b>number</b></p>
                <p id="length" className={props.length}><b>password </b>longer than 8<b> character</b></p>
                <p id="specialChar" className={props.specialChar}>A <b>Special</b> Character</p>
                <p id="passwordMatch" className={props.passwordMatch}>A <b>Passwords</b> match</p>
            </div>
        </>
    );
}

export default PasswordInput; 