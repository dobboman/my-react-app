const EmailInput = (props) =>{
    return(
        <>
            <h3>Email</h3>
            <input id="email" type="email" required onKeyUp={props.validate} onFocus={props.showPrompts("email")} onBlur={props.hidePrompts("email")}/>
            <div className={props.promptClass}>
                <p className={props.pClass}>{props.pClass} email address</p>
            </div>
        </>
    );
}

export default EmailInput;
            