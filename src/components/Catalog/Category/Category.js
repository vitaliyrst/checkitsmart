import React, {useEffect, useRef, useState} from 'react';
import './Category.css';

import {useDispatch, useSelector} from "react-redux";
import {fetchCategory} from "../../../redux/actions";
import {getAppDescription, getCartState, getCategory, getLanguage, getLoading, getOs} from "../../../redux/selectors";

import {Link, useHistory, useParams} from 'react-router-dom';

import {GAevent} from "../../../ga/events";
import {GApageView} from "../../../ga";

import WebXR from "../../WebXR/WebXR";
import Fallback from "../../Loader/Loader";
import Footer from "../../Footer/Footer";

const Category = () => {
    const dispatch = useDispatch();
    const loading = useSelector(getLoading);
    const os = useSelector(getOs);
    const language = useSelector(getLanguage);

    const isCart = useSelector(getCartState);
    const description = useSelector(getAppDescription('category'));
    const category = useSelector(getCategory);

    const params = useParams();
    const history = useHistory();
    const appleARRefs = useRef([]);
    const [selectProduct, setSelectProduct] = useState(null);

    useEffect(() => {
        GApageView(window.location.pathname);
        localStorage.setItem('oneclickbuy', JSON.stringify([]));
        localStorage.setItem('leaveorder', JSON.stringify([]));
        dispatch(fetchCategory(params.category, language));
    }, [dispatch, params.category, language]);

    const handleGAEventClickStartAR = (title) => GAevent(`CATEGORY ${category.title}`, 'click start AR', title);

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

    const handleClickAndroidAR = (eo, product) => {
        if (os === 'pc') {
            history.push('/qr');
        } else {
            setSelectProduct(product);
            handleGAEventClickStartAR(product.title);
        }
    }

    const addToRefs = (element) => {
        if (element && !appleARRefs.current.includes(element)) {
            appleARRefs.current.push(element);
        }
    }

    const getCategoryProducts = () => {
        if (category['products']) {
            return category['products'].map(product => {
                    return os === 'android' || os === 'pc' ?
                        getAndroidProducts(product) :
                        getIOSProducts(product)
                }
            );
        }
    }

    const getIOSProducts = (product) => {
        const {id, usdz, image, title, price} = product;

        return (
            <li key={id} className='category_item' onClick={(eo) => handleClickAppleAR(eo, product, id)}>
                <div className='category_item_image_container'>
                    <a ref={addToRefs} className='category_item_apple_link' id="ar-link"
                       href={os === 'pc' ? '/qr' : usdz} rel='ar'>
                        <img className='category_item_image' src={image} alt={title}/>
                        <img className='category_item_arlink' src={'/assets/images/other/ar-link.svg'} alt='ar'/>
                    </a>
                </div>
                <div className='category_item_title'>{title}</div>
                <div className='category_item_price'>{price.toFixed(2)} {description.price}</div>
            </li>
        );
    }

    const getAndroidProducts = (product) => {
        const {id, title, image, price} = product;

        return (
            <li key={id} className='category_item' onClick={(eo) => handleClickAndroidAR(eo, product)}>
                <div className='category_item_image_container'>
                    <img className='category_item_image' src={image} alt={title}/>
                    <img className='category_item_arlink' src={'/assets/images/other/ar-link.svg'} alt='ar'/>
                </div>
                <div className='category_item_title'>{title}</div>
                <div className='category_item_price'>{price.toFixed(2)} {description.price}</div>
            </li>
        );
    }

    const handleSetProduct = (product) => setSelectProduct(product);

    if (loading || !description) {
        return <Fallback/>
    }

    return (
        <>
            {!selectProduct &&
            <div className='category_container'>

                <div className='category_header_container'>

                    <div className='category_header_wrapper'>
                        <Link className='category_header_arrow_left_link' to={'/catalog'}>
                            <img src={'/assets/images/other/arrow_left.svg'}
                                 alt='arrow_left'/>
                        </Link>
                        <div className='category_header'>{category.title}</div>
                    </div>

                    {(os === 'android' || os === 'pc') &&
                    <Link className='category_header_cart_link' to={'/cart'}>
                        <img src={isCart ? '/assets/images/other/is_cart.svg' : '/assets/images/other/cart.svg'}
                             alt='cart'/>
                    </Link>
                    }
                </div>

                <ul className='category_list'>{getCategoryProducts()}</ul>
                {!loading && !selectProduct && <Footer/>}
            </div>}

            {selectProduct &&
            <WebXR product={selectProduct} onSetProduct={handleSetProduct}/>}
        </>
    );
}

export default Category;
