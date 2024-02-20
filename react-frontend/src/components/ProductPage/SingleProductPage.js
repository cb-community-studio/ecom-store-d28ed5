import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SingleProductPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    
    useEffect(() => {
        //on mount
        client
            .service("product")
            .get(urlParams.singleProductId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Product", type: "error", message: error.message || "Failed get product" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/product", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Product</h3>
                </div>
                <p>product/{urlParams.singleProductId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">ProductName</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.productName}</p></div>
                    <label className="text-sm text-primary">Price</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.Price}</p></div>
                    <label className="text-sm text-primary">stock</label>
                    <div className="ml-3"><i className={`pi ${_entity?.stock?"pi-check": "pi-times"}`}  ></i></div>
            
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleProductPage);
