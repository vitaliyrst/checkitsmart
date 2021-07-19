import React, {useEffect, useRef, useState} from "react";
import './Cart.css';

import {Link} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {setIsCart} from "../../redux/actions";
import {getAppDescription, getHeight, getLoading} from "../../redux/selectors";

import {GAevent} from "../../ga/events";
import {GApageView} from "../../ga";

import Fallback from "../Loader/Loader";
import Footer from "../Footer/Footer";

const Cart = () => {
    const products = useRef(JSON.parse(localStorage.getItem('cart')));

    const containerRef = useRef();
    const [changes, setChanges] = useState(0);

    const dispatch = useDispatch();
    const loading = useSelector(getLoading);
    const height = useSelector(getHeight);
    const description = useSelector(getAppDescription('cart'));

    const handleGAEventDeleteFromCart = (title) => GAevent('CART', 'delete from cart', title);
    const handleGAEventGoToOrderForm = () => {
        const price = products.current
            .reduce((acc, {price, quantity}) => (acc + (Number(price) * quantity)), 0).toFixed(2);
        GAevent('CART', 'go to order form', price);
    }

    useEffect(() => {
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }

        GApageView(window.location.pathname);
    }, []);

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
            return <div className='cart_no_items'>{description.nocart}</div>
        } else {
            const quantity = products.current.reduce((acc, {quantity}) => (acc + quantity), 0);
            const price = products.current
                .reduce((acc, {price, quantity}) => (acc + (Number(price) * quantity)), 0).toFixed(2);

            return (
                <div className='cart_items_list_container'>
                    <div className='class_items_list_counter'>
                        <div className='class_items_list_counter_additional'>
                            {description.incart} {quantity} {description.incart2} {price} {description.price}
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
                                                <div className='cart_list_price_by_item'>
                                                    {(item.price).toFixed(2)} {description.price2}
                                                </div>
                                            </div>

                                            <div className='cart_item_price'>
                                                {(item.price * item.quantity).toFixed(2)} {description.price}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className={products.current.length >= 3 ? 'cart_footer_fixed' : 'cart_footer'}>
                        <Footer/>
                    </div>
                    <div className='cart_list_items_summary_container'>
                        <div className='cart_list_items_line'/>
                        <div className='cart_list_items_summary_wrapper'>
                            <div className='cart_list_items_total'>{description.summary}</div>
                            <div className='cart_list_items_total_price'>{price} {description.price}</div>
                        </div>
                        {getButtonLink()}
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
                        {description.gotocatalog}
                    </button>
                </Link>
            );
        } else {
            return (
                <Link className='cart_link_button_container' to={'/cart/form'}>
                    <button className='cart_link_button' type='button' onClick={handleGAEventGoToOrderForm}>
                        {description.gotoorderform}
                    </button>
                </Link>
            );
        }
    }

    if (loading || !description) {
        return <Fallback/>
    }

    return (
        <div className='cart_container'>
            <div className='cart_header_container'>
                <div className='cart_header_wrapper'>
                    <Link className='cart_header_arrow_left_link' to={'/catalog'}>
                        <img src={'/assets/images/other/arrow_left.svg'} alt='arrow_left'/>
                    </Link>
                    <div className='cart_header'>
                        {description.cart}
                    </div>
                </div>
            </div>
            {getProductsList()}
        </div>
    )
}

export default Cart;
