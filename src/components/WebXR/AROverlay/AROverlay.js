import React, {useEffect} from 'react';
import './AROverlay.css';

import {useHistory, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getCartState} from "../../../redux/selectors";
import {setIsCart, setPlaneDetected, setReticleHit} from "../../../redux/actions";

import {GAevent} from "../../../ga/events";

const AROverlay = ({product}) => {
    const {category} = useParams();
    const history = useHistory();

    const dispatch = useDispatch();
    const isCart = useSelector(getCartState);

    const cart = JSON.parse(localStorage.getItem('cart'));

    const handleGAEventClickReset = () => GAevent('AR SESSION', 'reset', 'reset');
    const handleGAEventClickAddToCart = (title) => GAevent('CART', 'add to cart', title);
    const handleGAEventClickOneClickBuy = () => GAevent('CART', 'one click buy', 'one click buy');
    const handleGAEventLeaveOrder = () => GAevent('CART', 'leave order', 'leave order');

    useEffect(() => {
        const sameProduct = cart.some(item => item.title === product.title);

        if (sameProduct) {
            dispatch(setIsCart(true));
        } else {
            dispatch(setIsCart(false));
        }
    }, [cart, dispatch, product.title]);

    const handleClickClose = async () => {
        await document.getElementById('ARButton').click();
        history.back();
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
            dispatch(setIsCart(false));
        } else {
            product.quantity = 1;
            localStorage.setItem('cart', JSON.stringify([product]));
            handleGAEventClickAddToCart(product.title);
        }

        dispatch(setIsCart(true));
    }

    const handleLeaveOrder = async () => {
        await document.getElementById('ARButton').click();
        handleGAEventLeaveOrder();
        product.quantity = 1;
        localStorage.setItem('leaveorder', JSON.stringify([product]));
        history.push(`/cart/form`);
    }

    const getFirstButton = () => {
        if (isCart && !product.outofstock) {
            return <div className='ar_info_now_in_cart' onClick={handleRedirectToCart}>Уже в корзине</div>
        } else if (product.outofstock) {
            return <button className='ar_info_button_buy' onClick={handleLeaveOrder}>Оставить заявку</button>
        } else {
            return <button className='ar_info_button_buy' onClick={handleAddToCart}>Положить в корзину</button>
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

            <div className='ar_info_container'>
                <div className='ar_info'>

                    <div className='ar_info_main'>
                        <div className='ar_info_main_title'>
                            {product.title}
                        </div>

                        {product.outofstock ?
                            <div className='ar_info_main_noprice'>Нет в наличии</div> :
                            <div className='ar_info_main_price'>{(product.price).toFixed(2)} BYN</div>}
                    </div>

                    <div className='ar_info_additional'>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div>{category === 'carpets' ? <span>Высота ворса, мм: </span> : <span>Цвет: </span>}
                                {product.color}
                            </div>
                            <div><span>Длина, см: </span>{product.size[0]}</div>
                            <div><span>Ширина, см: </span>{product.size[1]}</div>

                            {product.size[2] &&
                            <div>
                                <span>Высота, см: </span>{product.size[2]}
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
                        Купить в 1 клик
                    </button>
                </div>
            </div>
        </>
    );
}

export default AROverlay;
