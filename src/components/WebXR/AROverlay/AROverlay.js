import React from 'react';
import './AROverlay.css';
import {GAevent} from "../../../ga/events";
import {useHistory, useParams} from "react-router";

const AROverlay = ({product: {title, price, color, size, mfrLink}, onHit}) => {
    const {category} = useParams();
    const history = useHistory();

    const handleGAEventClickClose = () => GAevent('AR MODEL', 'click close', title);
    const handleGAEventClickReset = () => GAevent('AR MODEL', 'click reset', title);
    const handleGAEventClickRedirect = () => GAevent('AR MODEL', 'click redirect to store', title);
    const handleGAEventClickSize = () => GAevent('AR MODEL', 'click size', title);

    const handleClickClose = async () => {
        handleGAEventClickClose();
        await document.getElementById('ARButton').click();
    }

    const handleClickReset = () => {
        handleGAEventClickReset();
        onHit(false);
    }

    const handleClickBuy = async () => {
        handleGAEventClickRedirect();
        await document.getElementById('ARButton').click();
        window.open(mfrLink);
    }

    const handleClickSize = async () => {
        handleGAEventClickSize();
        await document.getElementById('ARButton').click();
        history.push(`/size/${category}`);
    }

    return (
        <>
            <div className='ar_support_container'>
                <div className='ar_info_close_container' onClick={handleClickClose}>
                    <span className='ar_info_close'/>
                </div>
                <div className='ar_info_reset_container' onClick={handleClickReset}>
                    <img className='ar_info_reset' src='/assets/images/other/reset.svg' alt='reset'/>
                </div>
            </div>

            <div className='ar_info_container'>
                <div className='ar_info'>
                    <div className='ar_info_main'>
                        <div className='ar_info_main_title'>
                            {title}
                        </div>
                        <div className='ar_info_main_price'>
                            {price} BYN
                        </div>
                    </div>

                    <div className='ar_info_additional'>
                        <div>
                            <span>Цвет: </span>{color}
                        </div>
                        <div>
                            <span>Размеры, см: </span>{size}
                        </div>
                    </div>

                    <button className='ar_info_button_buy' onClick={handleClickBuy}>Посмотреть карточку товара</button>
                </div>

                <div className='ar_button_size_container'>
                    <button className='ar_button_size' onClick={handleClickSize}>Подобрать по размерам</button>
                </div>
            </div>
        </>
    );
}

export default AROverlay;