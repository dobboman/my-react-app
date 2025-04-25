const EmailInput = (props) =>{
    const focusHandler = (e) =>{
        //console.log("focusHandlerEmail");
        props.showPrompts("email");
    }
    const blurHandler = (e) =>{
        //console.log("blureHandlerEmail");
        props.hidePrompts("email");
    }
    return(
        <>
            <h3>Email</h3>
            <input id="email" type="email" required onKeyUp={props.validate} onFocus={focusHandler} onBlur={blurHandler}/>
            <div className={props.promptClass}>
                <p id="emailPrompts" className={props.pClass}>{props.pClass} email address</p>
            </div>
        </>
    );
}

export default EmailInput;
            