const TableData = (props) => {
    const qauntity = props.qauntity;
    return(
        <>
            
            {props.qauntity !== null &&
                props.data.map((d,index) => (
                <tr key={d[0]}>     
                    <td>{d[1]}</td>
                    <td>{d[2]}</td>
                    <td>{d[3]}</td>
                    <td id={index}><button id="remove" name={d[0]+"/"+index} onClick={props.onClickRemove}>-</button> {qauntity[index]} <button id="add" name={d[0]+"/"+index} onClick={props.onClickAdd}>+</button></td>
                </tr>
            ))}
            
        </>
    );
}
export default TableData;