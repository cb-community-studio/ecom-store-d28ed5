
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';


const ProductDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.productName}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.Price}</p>
    const tickTemplate3 = (rowData, { rowIndex }) => <i className={`pi ${rowData.stock?"pi-check": "pi-times"}`}  ></i>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="productCode" header="ProductCode"  style={{ minWidth: "8rem" }} />
            <Column field="productName" header="ProductName" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="Price" header="Price" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="stock" header="stock" body={tickTemplate3} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default ProductDataTable;