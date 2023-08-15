import React from "react";
import './Loader.css';
import loader from "../../img/gif-load.gif";


const Loader = () => {
    
    return (
        <div className="loader-cont">
            <div className="loader">
            <img src={loader} alt="loading..."/>
            </div>
        </div>
        )
};

export default Loader;