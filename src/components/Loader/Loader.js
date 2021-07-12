import React from "react";
import './Loader.css';

const Fallback = () => {
    return (
        <div className='loader'>
            <img src={'/assets/images/other/spinner.svg'} alt='loader'/>
        </div>
    );
}

export default Fallback;
