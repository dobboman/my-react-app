import ProductDropdown from "./dropdowns/ProductDropdown";


function Products(props){
    return(
        <div className="row">
            <h2>Products</h2>
            <ProductDropdown className="dropdown" catagory="Meats" tableData={props.tableData} setTableData={props.setTableData}/>
            <ProductDropdown className="dropdown" catagory="Vegetables" tableData={props.tableData} setTableData={props.setTableData}/>
        </div>
    );
}

export default Products