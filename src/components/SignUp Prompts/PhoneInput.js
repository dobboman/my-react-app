const PhoneInput = (props) =>{
    const onFocusHandler=(e)=>{
        //show(e.target.name);
        props.showPrompts("phone")
    }
    const onBlurHandler=(e)=>{
        //hide(e.target.name);
        props.hidePrompts("phone");
    }
   
    return(
        <>
            <h3>Phone Number</h3>
            <input id="phoneNum" type="tel" name="phone" required onKeyUp={props.validate} onFocus={onFocusHandler} onBlur={onBlurHandler}/>
            <div className={props.promptClass}>
                <p className={props.pClass}>{props.pClass} phone number</p>
            </div>
        </>
    );
}
export default PhoneInput;