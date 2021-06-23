import React from "react";
import './ARHelper.css';

const ARHelper = ({data, classes, img}) => {

    return (
        <div className={`ar_helper_container ${classes}`}>
            {data.map(text => (
                <div className='ar_helper'>{text}</div>
            ))}
            {img && <img className='ar_helper_plane_image' src={img} alt='helper' />}
        </div>
    );
}

export default ARHelper;