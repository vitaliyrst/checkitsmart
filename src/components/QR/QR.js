import React from "react";
import './QR.css';

const QR = () => {
    return (
        <div className='qr_container'>
            <div className='qr_header'>
                Сайт работает только на мобильном устройстве.
            </div>
            <div className='qr_wrapper'>
                <div className=''>
                    Отсканируйте на телефоне QR-код, чтобы открыть сайт
                </div>
                <img className='qr_image' src={'./assets/images/other/QR.svg'} alt='qr'/>
                <div>
                    или
                </div>
                <div>
                     переключитесь на мобильную версию сайта
                </div>
            </div>
            <div className='qr_link'>
                CheckItSmart.com
            </div>
        </div>
    );
}

export default QR;
