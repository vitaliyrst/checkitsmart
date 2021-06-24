import React from 'react';
import './AROverlay.css';
import {GAevent} from "../../../ga/events";
import {useHistory, useParams} from "react-router";

const AROverlay = ({product: {title, price, color, size, mfrLink}, onHit}) => {
    const {category} = useParams();
    const history = useHistory();
    const newSize = size.split('X');

    const handleGAEventClickRedirect = () => GAevent('AR SESSION', 'redirect to store', title);

    const handleClickClose = async () => await document.getElementById('ARButton').click();
    const handleClickReset = () => onHit(false);

    const handleClickBuy = async () => {
        handleGAEventClickRedirect();
        await document.getElementById('ARButton').click();
        window.open(mfrLink);
    }

    const handleClickSize = async () => {
        await document.getElementById('ARButton').click();
        history.push(`/size/${category}`);
    }

    return (
        <>
            <div className='ar_support_container'>
                <div className='ar_info_close_container' onClick={handleClickClose}>
                    <img className='ar_info_close' src='/assets/images/other/close.svg' alt='close'/>
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
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div>{category === 'carpets' ?
                                <span>Высота ворса, мм: </span> :
                                <span>Цвет: </span>}
                                {color}
                            </div>
                            <div><span>Длина, см: </span>{newSize[0]}</div>
                            <div><span>Ширина, см: </span>{newSize[1]}</div>
                            {newSize[2] && <div><span>Высота, см: </span>{newSize[2]}</div>}
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