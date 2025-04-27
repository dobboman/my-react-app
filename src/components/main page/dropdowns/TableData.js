const TableData = (props) => {
    const qauntity = props.qauntity;
    //console.log(props.qauntity);
    //console.log(props.catagory);
    let catagoryNum;
    switch(props.catagory){
        default:
            break;
        case "Chicken":
            catagoryNum = 0;
            break;
        case "Beef":
            catagoryNum = 1;
            break;
        case "Pork":
            catagoryNum = 2;
            break;
        case "Fish":
            catagoryNum = 3;
            break;
        case "Vegetables":
            catagoryNum = 4;
            break;
    }
    return(
        <>
            
            {props.qauntity !== null &&
                props.data.map((d,index) => (
                <tr key={d[0]}>     
                    <td>{d[1]}</td>
                    <td>{d[2]}</td>
                    <td>{d[3]}</td>
                    <td id={index}><button id="remove" name={d[0]+"/"+index} onClick={props.onClickRemove}>-</button> {qauntity[props.catagoryNum][index]} <button id="add" name={d[0]+"/"+index} onClick={props.onClickAdd}>+</button></td>
                </tr>
            ))}
            
        </>
    );
}
export default TableData;