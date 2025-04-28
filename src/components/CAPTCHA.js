const CAPTCHA = (props) =>{
    console.log(props.img);
    return(
        <div className="CAPTCHA">
            <img src={props.img} alt="CAPTCHA_IMG"/>
            <input type="text" id="CAPTCHA" ref={props.ref}></input>
        </div>
    );
    
}

export default CAPTCHA;