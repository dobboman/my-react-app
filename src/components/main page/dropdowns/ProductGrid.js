function ProductGrid(props){
    const data = props.data;
    //const numOfRows = props.tableData.numOfRows;
    return(
        <table className="productTable">
            <thead>
                <tr className="tableContent">
                    <th>Item</th>
                    <th>Image</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(d => (
                        <tr key={d[0]}>     
                            <td>{d[1]}</td>
                            <td>{d[2]}</td>
                            <td>{d[3]}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default ProductGrid;