const NameInput = (props) =>{
    const onFocusHandler=(e)=>{
        //show(e.target.name);
        props.showPrompts("fullName");
    }
    const onBlurHandler=(e)=>{
        //hide(e.target.name);
        props.hidePrompts("fullName");
    }
return(
    <>
        <h3>Full Name</h3>
        <input id="fullname" type="text" placeholder="firstname lastname" onKeyUp={props.validate} onFocus={onFocusHandler} onBlur={onBlurHandler} />
        <div className={props.promptClass}>
            <p id="spaces" className={props.spacesClass}> there should only be <b>one space </b> inbetween first and last names</p>
            <p id="specialChars" className={props.specialChars}>No <b>special characters</b> present</p>
        </div>
    </>
);
}

export default NameInput;