import React, {useEffect, useState} from 'react';
import './Header.css';

import {Link} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {getAppDescription, getCartState, getCatalog, getLanguage} from "../../redux/selectors";
import {setLanguage} from "../../redux/actions";

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);



    const dispatch = useDispatch();
    const isCart = useSelector(getCartState);
    const description = useSelector(getAppDescription('catalog'));
    const catalog = useSelector(getCatalog);
    const language = useSelector(getLanguage);
    const descriptionLang = useSelector(getAppDescription('footer'));

    useEffect(() => {}, [language]);

    const handleClickOpenMenu = () => setOpenMenu(!openMenu);

    const handleSwitchLanguage = (language) => {
        localStorage.setItem('languageApp', JSON.stringify(language));
        dispatch(setLanguage(language));
    }

    const getMenu = () => {
        return (catalog.map((item, index) => (
            <Link className={'menu_category_list_item_link'}
                  to={`/catalog/${item.slug}`}
                  onClick={handleClickOpenMenu}
            >
                <div key={index} className='menu_category_list_item'>
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
                        <img src={'/assets/images/header/menu.svg'} alt='menu' onClick={handleClickOpenMenu}/>
                    </div>

                    <Link to={'/cart'}>
                        <img src={isCart ? '/assets/images/header/is_cart.svg' : '/assets/images/header/cart.svg'}
                             alt='cart'/>
                    </Link>
                </div> :

                <div className='menu_open_container'>
                    <img src={'/assets/images/header/header_close.svg'} alt='close menu'
                         onClick={handleClickOpenMenu}
                    />

                    <div className='menu_category_list'>
                        {getMenu()}
                    </div>

                    <div className='menu_line'/>
                    <div>
                        {description.video}
                    </div>
                    <div className='menu_line'/>

                    {getLanguages()}
                </div>
            }
        </header>
    );
};

export default Header;