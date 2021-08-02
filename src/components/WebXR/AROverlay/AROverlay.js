import React, {useEffect, useState} from 'react';
import './AROverlay.css';

import {useHistory, useParams} from "react-router";

import {useDispatch, useSelector} from "react-redux";
import {getAppDescription, getCartState, getLanguage, getReticleHit} from "../../../redux/selectors";
import {setIsCart, setPlaneDetected, setReticleHit} from "../../../redux/actions";

import {GAevent} from "../../../ga/events";

const AROverlay = ({product}) => {
    const {category} = useParams();
    const history = useHistory();
    const [changes, setChanges] = useState(false);

    const dispatch = useDispatch();
    const isCart = useSelector(getCartState);
    const description = useSelector(getAppDescription('webxroverlay'));
    const isHit = useSelector(getReticleHit);
    const cart = JSON.parse(localStorage.getItem('cart'));
    const language = useSelector(getLanguage);

    const handleGAEventClickReset = () => GAevent('AR SESSION', 'reset', 'reset');
    const handleGAEventClickAddToCart = (title) => GAevent('CART', 'add to cart', title);
    const handleGAEventClickOneClickBuy = () => GAevent('CART', 'one click buy', 'one click buy');
    const handleGAEventLeaveOrder = () => GAevent('CART', 'leave order', 'leave order');

    useEffect(() => {
        if (cart.length) {
            dispatch(setIsCart(true));
        } else {
            dispatch(setIsCart(false));
        }
    }, [cart, dispatch, changes]);

    const handleClickClose = async () => {
        await document.getElementById('ARButton').click();
    }

    const handleClickReset = () => {
        handleGAEventClickReset()
        dispatch(setReticleHit(false));
        dispatch(setPlaneDetected(false));
    }

    const handleClickCart = async () => {
        await document.getElementById('ARButton').click();
        history.push('/cart');
    }

    const handleRedirectToCart = async () => {
        await document.getElementById('ARButton').click();
        history.push(`/cart`);
    }

    const handleGoToOrderForm = async () => {
        product.quantity = 1;
        await document.getElementById('ARButton').click();
        handleGAEventClickOneClickBuy();

        localStorage.setItem('oneclickbuy', JSON.stringify([product]));
        history.push(`/cart/form`);
    }

    const handleAddToCart = () => {
        const temp = [];

        if (cart.length) {
            temp.push(...cart);
            product.quantity = 1;

            if (!temp.some(item => item.title === product.title)) {
                temp.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(temp));
            handleGAEventClickAddToCart(product.title);
        } else {
            product.quantity = 1;
            localStorage.setItem('cart', JSON.stringify([product]));
            handleGAEventClickAddToCart(product.title);
        }

        setChanges(true);
    }

    const handleLeaveOrder = async () => {
        await document.getElementById('ARButton').click();
        handleGAEventLeaveOrder();
        product.quantity = 1;
        localStorage.setItem('leaveorder', JSON.stringify([product]));
        history.push(`/cart/form`);
    }

    const getFirstButton = () => {
        if (cart.find(item => item.title === product.title) && !product.outofstock) {
            return <div className='ar_info_now_in_cart' onClick={handleRedirectToCart}>{description.nowInCart}</div>
        } else if (product.outofstock) {
            return <button className='ar_info_button_buy' onClick={handleLeaveOrder}>{description.leaveRequest}</button>
        } else {
            return <button className='ar_info_button_buy' onClick={handleAddToCart}>{description.addToCart}</button>
        }
    }

    return (
        <>
            <div className='ar_support_container'>
                <div className='ar_info_close_container' onClick={handleClickClose}>
                    <img className='ar_info_close' src={'/assets/images/other/close.svg'} alt='close'/>
                </div>

                <div className='ar_info_reset_container' onClick={handleClickReset}>
                    <img className='ar_info_reset' src={'/assets/images/other/reset.svg'} alt='reset'/>
                </div>

                <div className='ar_info_cart_container' onClick={handleClickCart}>
                    <img className='ar_info_cart' alt='cart'
                         src={isCart ? '/assets/images/other/is_cart.svg' : '/assets/images/other/cart.svg'}/>
                </div>
            </div>

            {isHit &&
            <div className='ar_info_container'>
                <div className='ar_info'>

                    <div className='ar_info_main'>
                        <div className='ar_info_main_title'>
                            {product.title}
                        </div>

                        {product.outofstock ?
                            <div className='ar_info_main_noprice'>{description.notInStock}</div> :
                            language === 'en' || language === 'EN' ?
                                <div className='ar_info_main_price'>
                                    {description.price} {(product.price).toFixed(2)}
                                </div> :
                                <div className='ar_info_main_price'>
                                    {(product.price).toFixed(2)} {description.price}
                                </div>
                        }
                    </div>

                    <div className='ar_info_additional'>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div>{category === 'carpets' ?
                                <span>{description.pileHeight}</span> :
                                <span>{description.color}</span>}
                                {product.color}
                            </div>
                            <div>
                                <span>
                                    {description.length}
                                </span>
                                {product.size[0]}
                            </div>

                            <div>
                                <span>
                                    {description.width}
                                </span>
                                {product.size[1]}
                            </div>

                            {product.size[2] &&
                            <div>
                                <span>{description.height}</span>
                                {product.size[2]}
                            </div>}
                        </div>
                    </div>

                    {getFirstButton()}
                </div>


                <div className='ar_button_one_click_buy_container'>
                    <button
                        className={!product.outofstock ? 'ar_button_one_click_buy' : 'ar_button_one_click_buy_not_visible'}
                        onClick={handleGoToOrderForm}
                    >
                        {description.oneClickBuy}
                    </button>
                </div>
            </div>}
        </>
    );
}

export default AROverlay;
