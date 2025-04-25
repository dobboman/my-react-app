const PhoneInput = (props) =>{
    const focusHandler = (e) =>{
        props.showPrompts("phone");
    }
    const blurHandler = (e) =>{
        props.hidePrompts("phone");
    }
    return(
        <>
            <h3>Phone Number</h3>
            <input id="phoneNum" type="tel" required onKeyUp={props.validate} onFocus={focusHandler} onBlur={blurHandler}/>
            <div className={props.promptClass}>
                <p id="phonePrompts" className={props.pClass}>{props.pClass} phone number</p>
            </div>
        </>
    );
}
export default PhoneInput;