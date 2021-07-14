import React, {useEffect, useState} from "react";
import './ARHelper.css';

const ARHelper = ({data, classes, img}) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (img) {
            setTimeout(() => {
                setActive(true);
            }, 1000);
        }
    }, [img]);

    return (
        <div className={`ar_helper_container ${classes}`}>
            {data.map((text, index) => (
                <div key={index} className='ar_helper'>{text}</div>
            ))}
            {img && active && <object className='ar_helper_plane_image' data={img} type='image/svg+xml'>ar</object>}
        </div>
    );
}

export default ARHelper;
