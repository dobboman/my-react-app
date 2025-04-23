const PhoneInput = (props) =>{
    return(
        <>
            <h3>Phone Number</h3>
            <input id="phoneNum" type="tel" required onKeyUp={props.validate} onFocus={props.showPrompts("phone")} onBlur={props.hidePrompts("phone")}/>
            <div className={props.promptClass}>
                <p className={props.pClass}>{props.pClass} phone number</p>
            </div>
        </>
    );
}
export default PhoneInput;