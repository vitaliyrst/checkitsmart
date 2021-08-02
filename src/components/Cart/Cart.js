import React, {useEffect, useRef, useState} from "react";
import './Cart.css';

import {Link, useHistory} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {setIsCart} from "../../redux/actions";
import {getAppDescription, getLanguage, getLoading} from "../../redux/selectors";

import {GAevent} from "../../ga/events";
import {GApageView} from "../../ga";

import Fallback from "../Loader/Loader";
import Footer from "../Footer/Footer";

const Cart = () => {
    const products = useRef(JSON.parse(localStorage.getItem('cart')));

    const [changes, setChanges] = useState(0);
    const history = useHistory();

    const dispatch = useDispatch();
    const loading = useSelector(getLoading);
    const description = useSelector(getAppDescription('cart'));
    const language = useSelector(getLanguage);

    const handleGAEventDeleteFromCart = (title) => GAevent('CART', 'delete from cart', title);
    const handleGAEventGoToOrderForm = () => {
        const price = products.current
            .reduce((acc, {price, quantity}) => (acc + (Number(price) * quantity)), 0).toFixed(2);
        GAevent('CART', 'go to order form', price);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
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

    const handleClickProduct = (category, id) => {
        history.push(`/catalog/${category.toLowerCase()}/${id}`);
    }

    const getProductsList = () => {
        if (!products.current.length) {
            return (
                <div className='cart_no_items_container'>
                    <div className='cart_no_items'>
                        {description.nocart}
                    </div>
                </div>
            );
        } else {
            const price = products.current
                .reduce((acc, {price, quantity}) => (acc + (Number(price) * quantity)), 0).toFixed(2);

            return (
                <div className='cart_items_list_container'>
                    <ul className='cart_items_list'>
                        {products.current.map((item, index) => {
                            return (
                                <li key={index} className='cart_list_item'>
                                    <div className='cart_list_item_wrapper'>

                                        <div className='cart_list_item_image_container'
                                             onClick={() => handleClickProduct(item.category, item.id)}>
                                            <img className='cart_list_item_image' src={item.image} alt={item.title}/>
                                        </div>

                                        <div className='cart_list_item_description_wrapper'>
                                            <div className='cart_list_item_title_container'>
                                                <div className='cart_item_title'
                                                     onClick={() => handleClickProduct(item.category, item.id)}>
                                                    {item.title}
                                                </div>
                                                <img className='cart_list_item_button_delete'
                                                     src={'/assets/images/other/delete.svg'} alt={'delete'}
                                                     onClick={() => handleClickDelete(item.title)}
                                                />
                                            </div>

                                            <div className='cart_list_item_counter_container'>
                                                <div className='cart_list_item_counter_wrapper'>
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
                                                {
                                                    language === 'en' || language === 'EN' ?
                                                        <div className='cart_list_price_by_item'>
                                                            {description.price2} {(item.price).toFixed(2)}
                                                        </div> :
                                                        <div className='cart_list_price_by_item'>
                                                            {(item.price).toFixed(2)} {description.price2}
                                                        </div>
                                                }
                                            </div>

                                            {
                                                language === 'en' || language === 'EN' ?
                                                    <div className='cart_item_price'>
                                                        {description.price} {(item.price * item.quantity).toFixed(2)}
                                                    </div> :
                                                    <div className='cart_item_price'>
                                                        {(item.price * item.quantity).toFixed(2)} {description.price}
                                                    </div>
                                            }
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
                            {
                                language === 'en' || language === 'EN' ?
                                    <div className='cart_list_items_total_price'>{description.price} {price} </div> :
                                    <div className='cart_list_items_total_price'>{price} {description.price}</div>
                            }
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
                    <img src={'/assets/images/other/arrow_left.svg'} alt='arrow_left' onClick={() => history.goBack()}/>
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
