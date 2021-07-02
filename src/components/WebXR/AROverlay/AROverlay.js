import React, {useEffect} from 'react';
import './AROverlay.css';
import {useHistory, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getCartState} from "../../../redux/selectors";
import {setIsCart} from "../../../redux/actions";

const AROverlay = ({product, onHit}) => {
    const dispatch = useDispatch();

    const {category} = useParams();
    const history = useHistory();

    const isCart = useSelector(getCartState);
    const cart = JSON.parse(localStorage.getItem('cart'));

    const handleClickClose = async () => await document.getElementById('ARButton').click();
    const handleClickReset = () => onHit(false);
    const handleClickCart = async () => {
        await document.getElementById('ARButton').click();
        history.push('/cart');
    }

    const handleRedirectToCart = async () => {
        await document.getElementById('ARButton').click();
        history.push(`/cart`);
    }

    useEffect(() => {
        const sameProduct = cart.some(item => item.title === product.title);
        if (sameProduct) {
            dispatch(setIsCart(true));
        } else {
            dispatch(setIsCart(false));
        }
    }, [cart, dispatch, product.title]);

    const handleAddToCart = () => {
        const temp = [];

        if (cart.length) {
            temp.push(...cart);
            product.quantity = 1;
            if (!temp.some(item => item.title === product.title)) {
                temp.push(product);
            }
            localStorage.setItem('cart', JSON.stringify(temp));
            dispatch(setIsCart(false));
        } else {
            product.quantity = 1;
            localStorage.setItem('cart', JSON.stringify([product]));
        }

        dispatch(setIsCart(true));
    }

    const handleGoToOrderForm = async () => {
        await document.getElementById('ARButton').click();
        history.push(`/cart/form`);
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
                    <img className='ar_info_cart'
                         src={isCart ? '/assets/images/other/is_cart.svg' : '/assets/images/other/cart.svg'}
                         alt='cart'
                    />
                </div>
            </div>

            <div className='ar_info_container'>
                <div className='ar_info'>
                    <div className='ar_info_main'>
                        <div className='ar_info_main_title'>
                            {product.title}
                        </div>
                        <div className='ar_info_main_price'>
                            {product.price} BYN
                        </div>
                    </div>

                    <div className='ar_info_additional'>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div>{category === 'carpets' ?
                                <span>Высота ворса, мм: </span> :
                                <span>Цвет: </span>}
                                {product.color}
                            </div>
                            <div><span>Длина, см: </span>{product.size[0]}</div>
                            <div><span>Ширина, см: </span>{product.size[1]}</div>
                            {product.size[2] && <div><span>Высота, см: </span>{product.size[2]}</div>}
                        </div>
                    </div>

                    {isCart ?
                        <div className='ar_info_is_cart' onClick={handleRedirectToCart}>Уже в корзине</div> :
                        <button className='ar_info_button_buy' onClick={handleAddToCart}>Положить в корзину</button>}

                </div>

                <div className='ar_button_size_container'>
                    <button className='ar_button_size' onClick={handleGoToOrderForm}>Купить в 1 клик</button>
                </div>
            </div>
        </>
    );
}

export default AROverlay;