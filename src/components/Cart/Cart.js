import React, {useRef, useState} from "react";
import './Cart.css';

import {Link} from "react-router-dom";

import {useDispatch} from "react-redux";
import {setIsCart} from "../../redux/actions";

import {GAevent} from "../../ga/events";

const Cart = () => {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    const dispatch = useDispatch();
    const [changes, setChanges] = useState(0);
    const products = useRef(JSON.parse(localStorage.getItem('cart')));

    const handleGAEventDeleteFromCart = (title) => GAevent('CART', 'delete from cart', title);
    const handleGAEventGoToOrderForm = () => {
        const price = products.current
            .reduce((acc, {price, quantity}) => (acc + (Number(price) * quantity)), 0).toFixed(2);
        GAevent('CART', 'go to order form', price);
    }


    const handleClickMinus = (title) => {
        const newProducts = products.current;
        products.current.forEach((item, index) => {
            if (item.title === title) {
                if (item.quantity > 1) {
                    item.quantity = item.quantity - 1;
                    newProducts.splice(index, 1, item);
                }
            }
        });

        localStorage.setItem('cart', JSON.stringify(newProducts));
        setChanges(changes + 1);
    }

    const handleClickPlus = (title) => {
        const newProducts = products.current;
        products.current.forEach((item, index) => {
            if (item.title === title) {
                if (item.quantity < 999) {
                    item.quantity = item.quantity + 1;
                    newProducts.splice(index, 1, item);
                }
            }
        });

        localStorage.setItem('cart', JSON.stringify(newProducts));
        setChanges(changes + 1);
    }

    const handleClickDelete = (title) => {
        const newProducts = products.current;

        products.current.forEach((item, index) => {
            if (item.title === title) {
                handleGAEventDeleteFromCart(item.title);
                newProducts.splice(index, 1);
            }
        });


        localStorage.setItem('cart', JSON.stringify(newProducts));
        setChanges(changes + 1);

        if (!newProducts.length) {
            dispatch(setIsCart(false));
        }
    }

    const getProductsList = () => {
        if (!products.current.length) {
            return <div className='cart_no_items'>В корзине ничего нет</div>
        } else {
            const quantity = products.current.reduce((acc, {quantity}) => (acc + quantity), 0);
            const price = products.current
                .reduce((acc, {price, quantity}) => (acc + (Number(price) * quantity)), 0).toFixed(2);

            return (
                <div className='cart_items_list_container'>
                    <div className='class_items_list_counter'>
                        <div className='class_items_list_counter_additional'>
                            В корзине {quantity} товара на сумму
                        </div>
                        <div className='class_items_list_counter_price'>
                            {price} BYN
                        </div>
                    </div>
                    <ul className='cart_items_list'>
                        {products.current.map((item, index) => {
                            return (
                                <li key={index} className='cart_list_item'>
                                    <div className='cart_list_item_wrapper'>

                                        <div className='cart_list_item_image_container'>
                                            <img className='cart_list_item_image' src={item.image} alt={item.title}/>
                                        </div>

                                        <div className='cart_list_item_description_wrapper'>
                                            <div className='cart_list_item_title_container'>
                                                <div className='cart_item_title'>{item.title}</div>
                                                <img className='cart_list_item_button_delete'
                                                     src={'/assets/images/other/delete.svg'} alt={'delete'}
                                                     onClick={() => handleClickDelete(item.title)}
                                                />
                                            </div>

                                            <div className='cart_list_item_counter_container'>
                                                <img className='cart_list_item_counter_minus'
                                                     src={'/assets/images/other/minus.svg'} alt={'minus'}
                                                     onClick={() => handleClickMinus(item.title)}
                                                />
                                                <div className='cart_list_item_counter_quantity'>
                                                    {item.quantity}
                                                </div>
                                                <img className='cart_list_item_counter_plus'
                                                     src={'/assets/images/other/plus.svg'} alt={'plus'}
                                                     onClick={() => handleClickPlus(item.title)}
                                                />
                                            </div>

                                            <div className='cart_item_price'>
                                                {(item.price * item.quantity).toFixed(2)} BYN
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className='cart_list_items_line'/>
                    <div className='cart_list_items_summary_container'>
                        <div className='cart_list_items_total'>Итог</div>
                        <div className='cart_list_items_total_price'>{price} BYN</div>
                    </div>
                </div>
            );
        }
    }

    const getButtonLink = () => {
        if (!products.current.length) {
            return (
                <Link className='cart_link_button_container' to={'/catalog'}>
                    <button className='cart_link_button' type='button'>
                        Перейти в каталог
                    </button>
                </Link>
            );
        } else {
            return (
                <Link className='cart_link_button_container' to={'/cart/form'}>
                    <button className='cart_link_button' type='button' onClick={handleGAEventGoToOrderForm}>
                        Перейти к оформлению заказа
                    </button>
                </Link>
            );
        }
    }

    return (
        <div className='cart_container'>
            <div className='cart_header_container'>
                <div className='cart_header_wrapper'>
                    <Link className='cart_arrow_left_link_back' to={'/catalog'}>
                        <img className='cart_header_arrow_left' src={'/assets/images/other/arrow_left.svg'}
                             alt='arrow_left'/>
                    </Link>
                    <div className='cart_header'>
                        Корзина
                    </div>
                </div>
            </div>
            {getProductsList()}
            {getButtonLink()}
        </div>
    )
}

export default Cart;
