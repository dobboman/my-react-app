const EmailInput = (props) =>{
    const onFocusHandler=(e)=>{
        props.showPrompts("email");
    }
    const onBlurHandler=(e)=>{
        props.hidePrompts("email");
    }
    
    return(
        <>
            <h3>Email</h3>
            <input id="email" type="email" name="email" required onKeyUp={props.validate} onFocus={onFocusHandler} onBlur={onBlurHandler}/>
            <div className={props.promptClass}>
                <p className={props.pClass}>{props.pClass} email address</p>
            </div>
        </>
    );
}

export default EmailInput;
            