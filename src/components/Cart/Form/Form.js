import React, {useEffect, useState} from "react";
import './Form.css';

import {Link} from "react-router-dom";
import InputMask from 'react-input-mask';

import {useDispatch, useSelector} from "react-redux";
import {setIsCart} from "../../../redux/actions";
import {getAppDescription, getHeight, getLanguage, getLoading} from "../../../redux/selectors";

import {GAevent} from "../../../ga/events";
import {GApageView} from "../../../ga";

import emailjs from "emailjs-com";

import config from "../../../config/config";
import Fallback from "../../Loader/Loader";
import Footer from "../../Footer/Footer";

const Form = () => {
    const products = JSON.parse(localStorage.getItem('cart'));
    const productOneClickBuy = JSON.parse(localStorage.getItem('oneclickbuy'));
    const productLeaveOrder = JSON.parse(localStorage.getItem('leaveorder'));

    const dispatch = useDispatch();
    const loading = useSelector(getLoading);
    const height = useSelector(getHeight);
    const language = useSelector(getLanguage);
    const description = useSelector(getAppDescription('form'));

    const [orderDone, setOrderDone] = useState(false);
    const [inputValues, setInputValues] = useState({
        name: '',
        phone: '',
        email: '',
        nameDirty: false,
        phoneDirty: false,
        emailDirty: false,
        formErrors: {
            name: '',
            phone: '',
            email: ''
        },
        nameValid: false,
        phoneValid: false,
        emailValid: false,
        formValid: false
    });

    useEffect(() => {
        GApageView(window.location.pathname);
    }, [language]);

    const handleGAEventCheckOut = (email) => {
        if (inputValues.formValid) {
            GAevent('CART', 'checkout', email);
        }
    }

    const handleUserInput = (eo) => {
        let name = eo.target.name;
        let value = eo.target.value;

        let nameDirty = inputValues.nameDirty;
        let phoneDirty = inputValues.phoneDirty;
        let emailDirty = inputValues.emailDirty;

        let nameValid = inputValues.nameValid;
        let phoneValid = inputValues.phoneValid;
        let emailValid = inputValues.emailDirty;

        let formErrors = inputValues.formErrors;
        let formValid = inputValues.formValid;

        switch (name) {
            case 'name':
                nameDirty = false;

                if (value.trim().length === 0) {
                    nameValid = false;
                    formErrors.name = description.errorNameEmpty
                } else if (!(/^[a-zA-ZА-Яа-яёЁ ]+$/i).test(value)) {
                    nameValid = false;
                    formErrors.name = description.errorNameWrong;
                } else {
                    nameValid = true;
                    formErrors.name = '';
                }
                break;
            case 'phone':
                phoneDirty = false;

                if (value.trim().length === 0) {
                    phoneValid = false;
                    formErrors.phone = description.errorPhoneEmpty;
                } else if (!(/^\+375 \((25|29|33|44)\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/i).test(value)) {
                    phoneValid = false;
                    formErrors.phone = description.errorPhoneWrong;
                } else {
                    phoneValid = true;
                    formErrors.phone = '';
                }
                break;
            case 'email':
                emailDirty = false;

                if (value.trim().length === 0) {
                    emailValid = false;
                    formErrors.email = description.errorEmailEmpty;
                } else if (!(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i).test(value)) {
                    emailValid = false;
                    formErrors.email = description.errorEmailWrong;
                } else {
                    emailValid = true;
                    formErrors.email = '';
                }
                break;
            default:
                break;
        }

        if (name === 'phone' && value === '+375 (__) ___-__-__') {
            value = '';
        }

        if (nameValid && phoneValid && emailValid) {
            formValid = true;
        }

        setInputValues({
            ...inputValues,
            [name]: value,
            nameValid,
            phoneValid,
            emailValid,
            formErrors,
            formValid,
            nameDirty,
            phoneDirty,
            emailDirty
        });
    }

    const handleBlurInput = (eo) => {
        const name = eo.target.name;
        const value = eo.target.value;

        let nameDirty = inputValues.nameDirty;
        let phoneDirty = inputValues.phoneDirty;
        let emailDirty = inputValues.emailDirty;

        if (value.length > 0) {
            switch (name) {
                case 'name' :
                    nameDirty = true;
                    break;
                case 'phone' :
                    phoneDirty = true;
                    break;
                case 'email' :
                    emailDirty = true;
                    break;
                default:
                    break;
            }
        }

        setInputValues({
            ...inputValues,
            nameDirty,
            phoneDirty,
            emailDirty
        });
    }

    const handleSubmitForm = (eo) => {
        eo.preventDefault();

        let message;
        let totalPrice;

        if (productOneClickBuy.length) {
            const product = productOneClickBuy[0];
            totalPrice = product.price.toFixed(2);

            message = `
            <table style="border-collapse:collapse;width:100%;height:20px;border-color:#ffffff">
                <tbody>
                    <tr style="height:10px">
                        <td style="width:33.0739%;height:10px;text-align:left">
                            <span style="font-size:14pt">${product.title}</span>
                        </td>
                        <td style="width:33.0739%;height:10px;text-align:center">
                            <span style="font-size:14pt">${product.quantity} шт.</span>
                        </td>
                        <td style="width:33.0739%;height:10px;text-align:right">
                            <span style="font-size:14pt">${(product.price).toFixed(2)} BYN</span>
                        </td>
                    </tr> 
                </tbody>
            </table>`;
        } else if (productLeaveOrder.length) {
            const product = productLeaveOrder[0];
            totalPrice = product.price.toFixed(2);

            message = `
            <table style="border-collapse:collapse;width:100%;height:20px;border-color:#ffffff">
                <tbody>
                    <tr style="height:10px">
                        <td style="width:33.0739%;height:10px;text-align:left">
                            <span style="font-size:14pt">${product.title}</span>
                        </td>
                        <td style="width:33.0739%;height:10px;text-align:center">
                            <span style="font-size:14pt">${product.quantity} ${description.quantity}</span>
                        </td>
                        <td style="width:33.0739%;height:10px;text-align:right">
                            <span style="font-size:14pt">${(product.price).toFixed(2)} ${description.price}</span>
                        </td>
                    </tr> 
                </tbody>
            </table>`;
        } else {
            totalPrice = products
                .reduce((acc, {price, quantity}) => (acc + (Number(price) * quantity)), 0).toFixed(2);

            message = `
            <table style="border-collapse:collapse;width:100%;height:20px;border-color:#ffffff">
                <tbody>${products.map(product => (`
                    <tr style="height:10px">
                        <td style="width:33.0739%;height:10px;text-align:left">
                            <span style="font-size:14pt">${product.title}</span>
                        </td>
                        <td style="width:33.0739%;height:10px;text-align:center">
                            <span style="font-size:14pt">${product.quantity} ${description.quantity}</span>
                        </td>
                        <td style="width:33.0739%;height:10px;text-align:right">
                            <span style="font-size:14pt">${(product.price * product.quantity).toFixed(2)} ${description.price}</span>
                        </td>
                    </tr>`))} 
                </tbody>
            </table>`;
        }

        if (inputValues.formValid) {
            if (!productLeaveOrder.length) {
                emailjs.send(
                    config.emailjs.serviceId,
                    config.emailjs.templateCustomerId,
                    {
                        'email': inputValues.email,
                        'name': inputValues.name,
                        'message': message,
                        'total': totalPrice
                    },
                    config.emailjs.userId
                )
                    .then((response) => {
                        console.log('SUCCESS!', response.status, response.text);
                    }, (err) => {
                        console.log('FAILED...', err);
                    });
            }


            if (productLeaveOrder.length) {
                emailjs.send(
                    config.emailjs.serviceId,
                    config.emailjs.templateSellerId,
                    {
                        'theme': 'CheckItSmart Оформление заявки',
                        'to_email': 'vitaliy.klubkou@gmail.com',
                        'customer_email': inputValues.email,
                        'customer_phone': inputValues.phone,
                        'customer_name': inputValues.name,
                        'message': message,
                        'total': totalPrice
                    },
                    config.emailjs.userId)
                    .then((response) => {
                        console.log('SUCCESS!', response.status, response.text);
                    }, (err) => {
                        console.log('FAILED...', err);
                    });
            } else {
                emailjs.send(
                    config.emailjs.serviceId,
                    config.emailjs.templateSellerId,
                    {
                        'theme': 'CheckItSmart Информация о заказе',
                        'to_email': 'vitaliy.klubkou@gmail.com',
                        'customer_email': inputValues.email,
                        'customer_phone': inputValues.phone,
                        'customer_name': inputValues.name,
                        'message': message,
                        'total': totalPrice
                    },
                    config.emailjs.userId)
                    .then((response) => {
                        console.log('SUCCESS!', response.status, response.text);
                    }, (err) => {
                        console.log('FAILED...', err);
                    });
            }


            if (productOneClickBuy.length) {
                localStorage.removeItem('oneclickbuy');
                setOrderDone(true);
            } else {
                localStorage.removeItem('cart');
                setOrderDone(true);
                dispatch(setIsCart(false));
            }

        } else {
            setInputValues({...inputValues, nameDirty: true, phoneDirty: true, emailDirty: true});
        }
    }

    if (loading || !description) {
        return <Fallback/>
    }

    return (
        <div className='cart_form_container'>
            {!orderDone &&
            <div className='cart_form_header_container'>
                <div className='cart_form_header_wrapper'>
                    <Link className='cart_form_arrow_left_link' to={'/catalog'}>
                        <img src={'/assets/images/other/arrow_left.svg'}
                             alt='arrow_left'
                        />
                    </Link>
                    <div className='cart_form_header'>
                        {productLeaveOrder.length ? description.leaveRequest : description.checkout}
                    </div>
                </div>
            </div>}

            {orderDone ?
                <div className='cart_form_after_order_message'>
                    <div className='cart_form_after_order_title'>
                        {productLeaveOrder.length ?
                            description.thx :
                            description.txhRequest
                        }
                    </div>
                    <div className='cart_form_after_order_text'>
                        {productLeaveOrder.length ?
                            description.outOfStock :
                            description.outOfStockRequest
                        }
                    </div>
                    <Link className='cart_link_button_container' to={'/catalog'}>
                        <button className='cart_link_button' type='button'>
                            {description.goToCatalog}
                        </button>
                    </Link>
                </div> :

                <>
                    <div className='cart_form_message'>
                        {productLeaveOrder.length ?
                            description.outOfStock :
                            description.outOfStockRequest
                        }
                    </div>

                    <form className='cart_form' onSubmit={handleSubmitForm}>

                        <div className='cart_form_group'>
                            <input id='name' name='name' type='text' placeholder=' ' value={inputValues.name}
                                   onChange={handleUserInput}
                                   onBlur={handleBlurInput}
                                   className={(inputValues.nameDirty && !inputValues.nameValid)
                                       ? 'cart_form_input error'
                                       : 'cart_form_input'}
                            />
                            <label className={(inputValues.nameDirty && !inputValues.nameValid)
                                ? 'cart_form_group_label error'
                                : 'cart_form_group_label'}>{description.inputName}
                            </label>
                            {inputValues.nameDirty &&
                            <span className='cart_form_error'>{inputValues.formErrors.name}</span>}
                        </div>

                        <div className='cart_form_group'>
                            <InputMask id='phone' name='phone' type='tel' placeholder=' '
                                       mask="+375 (99) 999-99-99"
                                       value={inputValues.phone}
                                       onChange={handleUserInput}
                                       onBlur={handleBlurInput}
                                       className={(inputValues.phoneDirty && !inputValues.phoneValid)
                                           ? 'cart_form_input error'
                                           : 'cart_form_input'}
                            />

                            <label className={(inputValues.phoneDirty && !inputValues.phoneValid)
                                ? 'cart_form_group_label error'
                                : 'cart_form_group_label'}>{description.inputPhone}
                            </label>
                            {inputValues.phoneDirty &&
                            <span className='cart_form_error'>{inputValues.formErrors.phone}</span>}
                        </div>

                        <div className='cart_form_group'>
                            <input id='email' name='email' type='text' placeholder=' '
                                   value={inputValues.email}
                                   onChange={handleUserInput}
                                   onBlur={handleBlurInput}
                                   className={(inputValues.emailDirty && !inputValues.emailValid)
                                       ? 'cart_form_input error'
                                       : 'cart_form_input'}
                            />
                            <label className={(inputValues.emailDirty && !inputValues.emailValid)
                                ? 'cart_form_group_label error'
                                : 'cart_form_group_label'}>{description.inputEmail}
                            </label>
                            {inputValues.emailDirty &&
                            <span className='cart_form_error'>{inputValues.formErrors.email}</span>}
                        </div>

                        <button className='cart_form_button_submit' type='submit'
                                style={{marginTop: height - 260 + 'px'}}
                                onClick={() => handleGAEventCheckOut(inputValues.email)}>
                            {productLeaveOrder.length ?
                                description.buttonRequest :
                                description.buttonOrder
                            }
                        </button>
                    </form>
                </>
            }
            <div style={{marginTop: height - 260 + 'px'}} className='form_footer'>
                <Footer/>
            </div>
        </div>
    );
}

export default Form;
