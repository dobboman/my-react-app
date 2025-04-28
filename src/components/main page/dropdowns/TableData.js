import currencyFormatter from "../../main components/currencyFormatter";

const TableData = (props) => {
    const qauntity = props.qauntity;
    
    return(
        <>
            
            {props.qauntity !== null &&
                props.data.map((d,index) => (
                <tr key={d[0]}>     
                    <td>{d[1]}</td>
                    <td><img src={d[2]} alt="missing img"/></td>
                    <td>{ currencyFormatter.format(d[3])}</td>
                    <td id={index}><button id="remove" name={d[0]+"/"+index} onClick={props.onClickRemove}>-</button> {qauntity[props.catagoryNum][index]} <button id="add" name={d[0]+"/"+index} onClick={props.onClickAdd}>+</button></td>
                </tr>
            ))}
            
        </>
    );
}
export default TableData;