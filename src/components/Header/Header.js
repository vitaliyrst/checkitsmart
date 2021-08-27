import React, {useEffect, useRef, useState} from 'react';
import './Header.css';

import {Link} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {getAppDescription, getCartState, getCatalog, getLanguage} from "../../redux/selectors";
import {setLanguage} from "../../redux/actions";

const Header = () => {
    const videoRef = useRef();
    const [openMenu, setOpenMenu] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);

    const dispatch = useDispatch();
    const isCart = useSelector(getCartState);
    const description = useSelector(getAppDescription('catalog'));
    const catalog = useSelector(getCatalog);
    const language = useSelector(getLanguage);
    const descriptionLang = useSelector(getAppDescription('footer'));

    useEffect(() => {}, [language]);

    const handleClickOpenMenu = (state) => {
        setOpenMenu(state);

        if (state) {
            document.querySelector('.app_main').style.display = 'none';
        } else {
            document.querySelector('.app_main').style.display = 'block';
        }
    }

    const handleSwitchLanguage = (language) => {
        localStorage.setItem('languageApp', JSON.stringify(language));
        dispatch(setLanguage(language));
    }

    const handleClickVideo = () => {
        setOpenMenu(false);
        setOpenVideo(true);
        document.body.style.overflowY = 'hidden';
        videoRef.current.play();
    }

    const handleClickCloseVideo = () => {
        document.body.style.overflowY = 'auto';
        setOpenVideo(false);
        document.querySelector('.app_main').style.display = 'block';
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    }

    const getMenu = () => {
        return (catalog.map((item, index) => (
            <Link key={index} className={'menu_category_list_item_link'}
                  to={`/catalog/${item.slug}`}
                  onClick={() => handleClickOpenMenu(false)}
            >
                <div className='menu_category_list_item'>
                    {item.title}
                </div>
            </Link>
        )));
    }

    const getLanguages = () => {
        return (
            <>
                <div className='footer_header'>{descriptionLang.switchLanguage}</div>
                <ul className='footer_list'>
                    <li className={language === 'ru' ? 'footer_list_item_selected' : 'footer_list_item'}
                        onClick={() => handleSwitchLanguage('ru')}>Русский
                    </li>
                    <li className={language === 'en' ? 'footer_list_item_selected' : 'footer_list_item'}
                        onClick={() => handleSwitchLanguage('en')}>English
                    </li>
                    <li className={language === 'pl' ? 'footer_list_item_selected' : 'footer_list_item'}
                        onClick={() => handleSwitchLanguage('pl')}>Polski
                    </li>
                </ul>
            </>
        );
    }

    if (!descriptionLang) {
        return null;
    }

    return (
        <header className='app_header'>
            {!openMenu ?
                <div className='menu_container'>
                    <div>
                        <img src={'/assets/images/header/menu.svg'} alt='menu' onClick={() => handleClickOpenMenu(true)}/>
                    </div>

                    <Link to={'/cart'}>
                        <img src={isCart ? '/assets/images/header/is_cart.svg' : '/assets/images/header/cart.svg'}
                             alt='cart'/>
                    </Link>
                </div> :

                <div className='menu_open_container'>
                    <img src={'/assets/images/header/header_close.svg'} alt='close menu'
                         onClick={() => handleClickOpenMenu(false)}
                    />


                    <Link className='menu_link_catalog' to={'/catalog'} onClick={() => handleClickOpenMenu(false)}>
                        <div className='menu_catalog'>
                            {description.header}
                        </div>
                    </Link>
                    <div className='menu_line'/>

                    <div className='menu_category_list'>
                        {getMenu()}
                    </div>

                    <div className='menu_line'/>
                    <div className='menu_how_its_work' onClick={handleClickVideo}>
                        {description.video}
                    </div>
                    <div className='menu_line'/>

                    {getLanguages()}
                </div>
            }
            <div className='video_container' style={{display: openVideo ? 'block' : 'none'}}
                 onClick={handleClickCloseVideo}>
                <div className='video_wrapper'>
                    <div className='video_close'>
                        <img src={'/assets/images/catalog/video_close.svg'} alt='video_close'
                             onClick={handleClickCloseVideo}/>
                    </div>
                    <video ref={videoRef} preload='auto' controls='controls'>
                        <source
                            src='https://firebasestorage.googleapis.com/v0/b/checkitsmartcom.appspot.com/o/video%2Fexample.mp4?alt=media&token=821f9eb3-f856-47b2-af3e-17226cd0b13d'
                            type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                        />
                    </video>
                </div>
            </div>
        </header>
    );
};

export default Header;
