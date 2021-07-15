import React from "react";
import './Footer.css';
import {setLanguage} from "../../redux/actions";
import {useDispatch} from "react-redux";

const Footer = () => {
    const dispatch = useDispatch();
    const handleSwitchLanguage = (language) => {
        localStorage.setItem('languageApp', JSON.stringify(language));
        dispatch(setLanguage(language));
    }

    return (
        <div className='footer_container'>
            <div className='footer_header'>Перевести на</div>
            <ul className='footer_list'>
                <li className='footer_list_item' onClick={() => handleSwitchLanguage('ru')}>Русский</li>
                <li className='footer_list_item' onClick={() => handleSwitchLanguage('en')}>English</li>
                <li className='footer_list_item' onClick={() => handleSwitchLanguage('pl')}>Polski</li>
            </ul>
        </div>

    );
}

export default Footer;
