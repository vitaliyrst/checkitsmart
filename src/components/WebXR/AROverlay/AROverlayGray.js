import React from 'react';
import './AROverlayGray.css';
import {GAevent} from "../../../ga/events";

const AROverlayGray = ({product: {title, size}, onHit, scale}) => {
    const handleGAEventClickClose = () => GAevent('AR GRAY', 'click close', title);
    const handleGAEventClickReset = () => GAevent('AR GRAY', 'click reset', title);
    const handleGAEventClickSize = () => GAevent('AR GRAY', 'click size', title);

    const handleClickClose = async () => {
        handleGAEventClickClose();
        await document.getElementById('ARButton').click();
    }

    const handleClickReset = () => {
        handleGAEventClickReset();
        onHit(false);
    }

    const handleClickSize = async () => {
        handleGAEventClickSize();
        await document.getElementById('ARButton').click();
    }

    const scaleSizes = [
        Math.round(size[0] * scale.x),
        Math.round(size[1] * scale.y),
        Math.round(size[2] * scale.z)
    ];

    return (
        <>
            <div className='ar_gray_support_container'>
                <div className='ar_gray_info_close_container' onClick={handleClickClose}>
                    <img className='ar_info_close' src='/assets/images/other/close.svg' alt='close'/>
                </div>
                <div className='ar_gray_info_reset_container' onClick={handleClickReset}>
                    <img className='ar_gray_info_reset' src='/assets/images/other/reset.svg' alt='reset'/>
                </div>
            </div>

            <div className='ar_gray_info_container'>
                <div className='ar_gray_info'>
                    <div className='ar_gray_info_title'>
                        {title}
                    </div>
                    <div className='ar_gray_info_size'>
                        <span>Размеры, см: </span> {
                        (scaleSizes[2]) ?
                            `${scaleSizes[0]} X ${scaleSizes[1]} X ${scaleSizes[2]}` :
                            `${scaleSizes[0]} X ${scaleSizes[1]}`
                    }
                    </div>
                    <div className='ar_gray_info_test_model'>
                        модель имеет иллюстративный характер
                    </div>
                </div>

                <div className='ar_gray_button_size_container'>
                    <button className='ar_gray_button_size' onClick={handleClickSize}>Изменить размеры</button>
                </div>
            </div>
        </>
    );
}

export default AROverlayGray;