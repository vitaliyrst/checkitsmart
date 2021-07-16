import React, {useEffect, useState} from "react";
import './Footer.css';

import {useDispatch, useSelector} from "react-redux";
import {setLanguage} from "../../redux/actions";
import {getAppDescription, getLanguage} from "../../redux/selectors";

const Footer = () => {
    const dispatch = useDispatch();
    const language = useSelector(getLanguage);
    const description = useSelector(getAppDescription('footer'));

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

    if (!description) {
        return null;
    }

    return (
        <div className='footer_container'>
            <div className='footer_header'>{description.switchLanguage}</div>
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
