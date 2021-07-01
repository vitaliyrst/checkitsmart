import React, {useState} from "react";
import './Form.css';
import {Link} from "react-router-dom";
import emailjs from "emailjs-com";

const Form = () => {
    const products = JSON.parse(localStorage.getItem('cart'));
    const [inputValues, setInputValues] = useState({
        name: '', phone: '',
        nameDirty: false, phoneDirty: false,
        formErrors: {
            name: 'Введите имя', phone: 'Введите телефон'
        },
        nameValid: false,
        phoneValid: false,
        formValid: false
    });

    /* emailjs.send(
                   'service_q5q2fnl',
                   'template_dpwum5j',
                   {
                       'to_email': 'alexkovaluoff@gmail.com',
                       'to_name': 'Александр',
                       'message': `${products[0].title} - ${products[0].price} BYN`,
                   },
                   'user_6F5Ox5sigEyetq7qxDLRN')
                   .then((response) => {
                       console.log('SUCCESS!', response.status, response.text);
                   }, (err) => {
                       console.log('FAILED...', err);
                   });*/

    const handleUserInput = (eo) => {
        const name = eo.target.name;
        const value = eo.target.value;

        let nameDirty = inputValues.nameDirty;
        let phoneDirty = inputValues.phoneDirty;

        let nameValid = inputValues.nameValid;
        let phoneValid = inputValues.phoneValid;

        let formErrors = inputValues.formErrors;
        let formValid = inputValues.formValid;

        switch (name) {
            case 'name':
                nameDirty = false;

                if (value.trim().length === 0) {
                    nameValid = false;
                    formErrors.name = 'Введите имя'
                } else if (value.trim().length  <= 4) {
                    nameValid = false;
                    formErrors.name = 'Слишком короткое имя';
                } else {
                    nameValid = true;
                    formErrors.name = '';
                }
                break;
            case 'phone':
                phoneDirty = false;

                if (value.trim().length === 0) {
                    phoneValid = false;
                    formErrors.phone = 'Введите телефон'
                } else if (value.trim().length  <= 4) {
                    phoneValid = false;
                    formErrors.phone = 'Номер должен состоять из семи цифр';
                } else {
                    phoneValid = true;
                    formErrors.phone = '';
                }
                break;
            default:
                break;
        }

        if (nameValid && phoneValid) {
            formValid = true;
        }

        setInputValues({
            ...inputValues,
            [name]: value,
            nameValid,
            phoneValid,
            formErrors,
            formValid,
            nameDirty,
            phoneDirty
        });
    }

    const handleBlurInput = (eo) => {
        const name = eo.target.name;

        let nameDirty = inputValues.nameDirty;
        let phoneDirty = inputValues.phoneDirty;

        switch (name) {
            case 'name' :
                nameDirty = true;
                break;
            case 'phone' :
                phoneDirty = true;
                break;
            default:
                break;
        }

        setInputValues({
            ...inputValues,
            nameDirty,
            phoneDirty
        });
    }

    const handleSubmitForm = (eo) => {
        eo.preventDefault();

        if (inputValues.formValid) {
            /*emailjs.send(
                'service_q5q2fnl',
                'template_dpwum5j',
                {
                    'to_email': 'alexkovaluoff@gmail.com',
                    'to_name': 'Александр',
                    'message': `${products[0].title} - ${products[0].price} BYN`,
                },
                'user_6F5Ox5sigEyetq7qxDLRN')
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                }, (err) => {
                    console.log('FAILED...', err);
                });*/
        } else {
            setInputValues({...inputValues, nameDirty: true, phoneDirty: true});
        }
    }

    return (
        <div className='cart_form_container'>
            <div className='cart_form_header_container'>
                <div className='cart_form_header_wrapper'>
                    <Link className='cart_form_arrow_left_link_back' to={'/catalog'}>
                        <img className='cart_form_header_arrow_left' src={'/assets/images/other/arrow_left.svg'}
                             alt='arrow_left'
                        />
                    </Link>

                    <div className='cart_form_header'>
                        Оформление заказа
                    </div>

                </div>
            </div>

            <div className='cart_form_message'>
                Мы свяжемся с Вами для уточнения деталей заказа
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
                        : 'cart_form_group_label'}>Имя
                    </label>
                    {inputValues.nameDirty && <span className='cart_form_error'>{inputValues.formErrors.name}</span>}
                </div>

                <div className='cart_form_group'>
                    <input id='phone' name='phone' type='number' placeholder=' '
                           value={inputValues.phone}
                           onChange={handleUserInput}
                           onBlur={handleBlurInput}
                           className={(inputValues.phoneDirty && !inputValues.phoneValid)
                               ? 'cart_form_input error'
                               : 'cart_form_input'}
                    />
                    <label className={(inputValues.phoneDirty && !inputValues.phoneValid)
                        ? 'cart_form_group_label error'
                        : 'cart_form_group_label'}>Телефон
                    </label>
                    {inputValues.phoneDirty && <span className='cart_form_error'>{inputValues.formErrors.phone}</span>}
                </div>

                <button className='cart_form_button_submit' type='submit'>
                    Оформить заказ
                </button>
            </form>
        </div>
    );
}

export default Form;
