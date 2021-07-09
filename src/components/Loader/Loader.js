import React from "react";
import './Loader.css';

import Loader from "react-loader-spinner";

const Fallback = () => {
    return (
        <Loader className='loader' type='Puff' color='#FF9038' width='175' height='175'/>
    );
}

export default Fallback;
