import React, {useEffect, useState} from "react";
import './Footer.css';

import {useDispatch, useSelector} from "react-redux";
import {setLanguage} from "../../redux/actions";
import {getLanguage} from "../../redux/selectors";

const Footer = () => {
    const dispatch = useDispatch();
    const language = useSelector(getLanguage);

    const handleSwitchLanguage = (language) => {
        localStorage.setItem('languageApp', JSON.stringify(language));
        dispatch(setLanguage(language));
    }

    const [selected, setSelected] = useState({
        ru: false,
        en: false,
        pl: false
    });

    useEffect(() => {
        setSelected({...selected, [language]: true});
    }, [language]);

    return (
        <div className='footer_container'>
            <div className='footer_header'>Перевести на</div>
            <ul className='footer_list'>
                <li className={selected.ru ? 'footer_list_item_selected' : 'footer_list_item'}
                    onClick={() => handleSwitchLanguage('ru')}>Русский
                </li>
                <li className={selected.en ? 'footer_list_item_selected' : 'footer_list_item'}
                    onClick={() => handleSwitchLanguage('en')}>English
                </li>
                <li className={selected.pl ? 'footer_list_item_selected' : 'footer_list_item'}
                    onClick={() => handleSwitchLanguage('pl')}>Polski
                </li>
            </ul>
        </div>
    );
}

export default Footer;
