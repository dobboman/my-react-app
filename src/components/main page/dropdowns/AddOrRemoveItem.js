const AddOrRemoveItem = (props) =>{
    return(
        <><button id="remove" name={props.name} onClick={props.onClickRemove}>-</button> {props.qauntity} <button id="add" name={props.name} onClick={props.onClickAdd}>+</button></>
    );
}

export default AddOrRemoveItem;