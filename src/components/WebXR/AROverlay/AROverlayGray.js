import React from 'react';
import './AROverlayGray.css';

const AROverlayGray = ({product: {title, size}, onHit, scale}) => {
    const handleClickClose = async () => await document.getElementById('ARButton').click();
    const handleClickReset = () => onHit(false);
    const handleClickSize = async () => await document.getElementById('ARButton').click();

    const scaleSizes = [
        Math.round(size[0] * scale.z),
        Math.round(size[1] * scale.x),
        Math.round(size[2] * scale.y)
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
                    <div className='ar_gray_info_test_model'>
                        модель имеет иллюстративный характер
                    </div>
                    <div className='ar_gray_info_size'>
                        <div><span>Длина: </span>{scaleSizes[0]} см</div>
                        <div><span>Ширина: </span>{scaleSizes[1]} см</div>
                        {!isNaN(scaleSizes[2]) && <div><span>Высота: </span>{scaleSizes[2]} см</div>}
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