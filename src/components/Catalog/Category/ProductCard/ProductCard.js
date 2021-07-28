import React, {useEffect, useRef, useState} from 'react';
import './ProductCard.css';

import {Link} from "react-router-dom";
import {useHistory, useParams} from "react-router";

import {useDispatch, useSelector} from "react-redux";
import {fetchProduct, setIsCart} from "../../../../redux/actions";
import {getAppDescription, getCartState, getLanguage, getLoading, getOs, getProduct} from "../../../../redux/selectors";

import {GAevent} from "../../../../ga/events";
import {GApageView} from "../../../../ga";

import Fallback from "../../../Loader/Loader";
import WebXR from "../../../WebXR/WebXR";

const ProductCard = () => {
    const params = useParams();
    const history = useHistory();

    const dispatch = useDispatch();
    const loading = useSelector(getLoading);
    const language = useSelector(getLanguage);
    const os = useSelector(getOs);
    const isCart = useSelector(getCartState);
    const product = useSelector(getProduct);
    const description = useSelector(getAppDescription('product'));

    const cart = JSON.parse(localStorage.getItem('cart'));
    const appleARRefs = useRef([]);
    const [selectProduct, setSelectProduct] = useState(null);
    const [changes, setChanges] = useState(false);

    const handleGAEventClickStartAR = () => GAevent('PRODUCT', 'click start AR', product.title);

    useEffect(() => {
        if (!changes) {
            GApageView(window.location.pathname);
            localStorage.setItem('oneclickbuy', JSON.stringify([]));
            localStorage.setItem('leaveorder', JSON.stringify([]));
            dispatch(fetchProduct(params.category, params.id, language));
        }

        if (cart.length) {
            dispatch(setIsCart(true));
        } else {
            dispatch(setIsCart(false));
        }
    }, [dispatch, params.id, params.category, language, changes, cart.length]);

    const getARButton = () => {
        if (os === 'android' || os === 'pc') {
            return (
                <button className='product_item_button_ar' type='button' onClick={handleClickAndroidAR}>
                    {description.tryAr}
                </button>
            );
        } else {
            return (
                <a ref={addToRefs} className='product_item_button_ar_apple' id="ar-link"
                   onClick={handleClickAppleAR}
                   href={os === 'pc' ? '/qr' : product.usdz} rel='ar'>
                    {description.tryAr}
                    <img src={'/assets/images/other/fake.png'} alt='img'/>
                </a>
            );
        }
    }

    const handleSetSelectProduct = (product) => setSelectProduct(product);

    const handleClickAndroidAR = () => {
        if (os === 'pc') {
            history.push('/qr');
        } else {
            handleGAEventClickStartAR();
            setSelectProduct(product);
        }
    }

    const handleClickAppleAR = (eo, product) => {
        if (os === 'pc') {
            history.push('/qr');
        } else {
            product.quantity = 1;
            if (!product.outofstock) {
                localStorage.setItem('oneclickbuy', JSON.stringify([product]));
            } else {
                localStorage.setItem('leaveorder', JSON.stringify([product]));
            }
            handleGAEventClickStartAR(product.title);
            eo.currentTarget.querySelector('#ar-link').click();

            appleARRefs.current.forEach(item => {
                item.addEventListener('message', (eo) => {
                    if (eo.data === "_apple_ar_quicklook_button_tapped") {
                        history.push('/cart/form');
                    }
                });
            });
        }
    }

    const addToRefs = (element) => {
        if (element && !appleARRefs.current.includes(element)) {
            appleARRefs.current.push(element);
        }
    }

    const getCartButton = () => {
        if (cart.find(item => item.title === product.title) && !product.outofstock) {
            return (
                <div className='product_now_in_cart' onClick={handleRedirectToCart}>
                    {description.nowInCart}
                </div>
            );
        } else if (product.outofstock) {
            return (
                <button className='product_item_button_to_cart' type='button' onClick={handleLeaveOrder}>
                    {description.leaveRequest}
                </button>
            );
        } else {
            return (
                <button className='product_item_button_to_cart' type='button' onClick={handleAddToCart}>
                    {description.addToCart}
                </button>
            );
        }
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
        } else {
            product.quantity = 1;
            localStorage.setItem('cart', JSON.stringify([product]));
        }

        setChanges(true);
    }

    const handleRedirectToCart = () => {
        history.push(`/cart`);
    }

    const handleLeaveOrder = () => {
        product.quantity = 1;
        localStorage.setItem('leaveorder', JSON.stringify([product]));
        history.push(`/cart/form`);
    }

    if (loading || Object.keys(product).length === 0 || !description) {
        return <Fallback/>;
    }

    return (
        <>
            {!selectProduct &&
            <div className='product_container'>
                <div className='product_header_container'>

                    <div className='product_header_wrapper'>
                        <div className='product_header_arrow_left_link' onClick={() => history.goBack()}>
                            <img src={'/assets/images/other/arrow_left.svg'}
                                 alt='arrow_left'/>
                        </div>
                        <div className='product_header'>{product.category}</div>
                    </div>

                    <Link className='product_header_cart_link' to={'/cart'}>
                        <img src={isCart ? '/assets/images/other/is_cart.svg' : '/assets/images/other/cart.svg'}
                             alt='cart'/>
                    </Link>
                </div>

                <div className='product_item'>
                    <div className='product_item_image' style={{backgroundImage: `url("${product.image}")`}}/>
                    <div className='product_item_title'>
                        {product.title}
                    </div>
                    <div className='product_item_price'>
                        {product.price} {description.price}
                    </div>
                    <div className='product_item_color'>
                        {params.category === 'carpets' ?
                            <span className='product_item_additional_text'>{description.pileHeight}</span> :
                            <span className='product_item_additional_text'>{description.color}</span>}
                        {product.color}
                    </div>
                    <div className='product_item_length'>
                        <span className='product_item_additional_text'>{description.length}</span>
                        {product.size[0]}
                    </div>
                    <div className='product_item_width'>
                        <span className='product_item_additional_text'>{description.width}</span>
                        {product.size[1]}
                    </div>
                    {product.size[2] &&
                    <div className='product_item_height'>
                        <span className='product_item_additional_text'>{description.height}</span>
                        {product.size[2]}
                    </div>}
                    {product.description ?
                        <div className='product_item_description'>{product.description}</div> :
                        <div className='product_item_no_description'>{product.noDescription}</div>}
                    <div className='product_item_open_source'>
                        {description.license}
                    </div>
                    <div className='product_item_manufacturer_info'>
                        <div>{product.companyName}</div>
                        <div>{product.companyAdress}</div>
                        <div>{product.companyInn}</div>
                        <div>{product.companyLicense}</div>
                        <div>{product.companyAuthority}</div>
                        <div>{product.companyAuthorityDate}</div>
                    </div>
                </div>

                {getARButton()}
                {getCartButton()}

                <div className='product_button_wrapper' />
            </div>}

            {selectProduct &&
            <WebXR product={selectProduct} onSetProduct={handleSetSelectProduct}/>}
        </>
    );
}

export default ProductCard;