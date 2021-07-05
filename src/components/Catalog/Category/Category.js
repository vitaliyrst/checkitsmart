import React, {useEffect, useRef, useState} from 'react';
import './Category.css';

import {useDispatch, useSelector} from "react-redux";
import {hideLoader} from "../../../redux/actions";
import {getCartState, getCatalog, getLoading, getOs} from "../../../redux/selectors";

import {Link, useHistory, useParams} from 'react-router-dom';

import {GAevent} from "../../../ga/events";
import WebXR from "../../WebXR/WebXR";

const Category = () => {
    const appleARRef = useRef();
    const params = useParams();
    const history = useHistory();

    const [selectProduct, setSelectProduct] = useState(null);

    const dispatch = useDispatch();
    const os = useSelector(getOs);
    const loading = useSelector(getLoading);
    const catalog = useSelector(getCatalog);
    const isCart = useSelector(getCartState);
    const category = catalog.find(item => item['slug'] === params.category);

    const handleGAEventClickStartAR = (title) => GAevent(`CATEGORY ${category.title}`, 'click start AR', title);

    const handleClickAppleAR = (eo, product) => {
        localStorage.setItem('cart', JSON.stringify(product));
        eo.currentTarget.querySelector('#ar-link').click();


        appleARRef.current.addEventListener('message', (eo) => {
            if (eo.data === "_apple_ar_quicklook_button_tapped") {
                document.location.href('https://checkitsmart.com/cart/form');
            }
        });
    }

    const handleSetProduct = (product, title = '') => {
        setSelectProduct(product);
        handleGAEventClickStartAR(title);
    }

    useEffect(() => {
        category && dispatch(hideLoader());
    }, [category, dispatch]);

    const getCategoryProducts = () => {
        return category['products'].map(product => {
                return !os ?
                    getAndroidProducts(product) :
                    getIOSProducts(product)
            }
        );
    }

    const getIOSProducts = (product) => {
        const {id, usdz, image, title, price} = product
        return (
            <li key={id} className='category_item' onClick={(eo) => handleClickAppleAR(eo, product)}>
                <div className='category_item_image_container'>
                    <a ref={appleARRef} className='category_item_apple_link' id="ar-link" href={usdz} rel='ar'>
                        <img className='category_item_image' src={image} alt={title}/>
                    </a>
                </div>
                <div className='category_item_title'>{title}</div>
                <div className='category_item_price'>{price} BYN</div>
            </li>
        );
    }

    const getAndroidProducts = (product) => {
        const {id, title, image, price} = product;
        return (
            <li key={id} className='category_item' onClick={() => setSelectProduct(product)}>
                <div className='category_item_image_container'>
                    <img className='category_item_image' src={image} alt={title}/>
                </div>
                <div className='category_item_title'>{title}</div>
                {typeof price === 'number' ?
                    <div className='category_item_price'>{price} BYN</div> :
                    <div className='category_item_noprice'>{price}</div>}
            </li>
        );
    }

    return (
        <>
            {!selectProduct && !loading &&
            <div className='category_container'>

                <div className='category_header_container'>
                    <div className='category_header_wrapper'>
                        <Link className='category_arrow_left_link' to={'/catalog'}>
                            <img className='category_header_arrow_left' src={'/assets/images/other/arrow_left.svg'}
                                 alt='arrow_left'/>
                        </Link>
                        <div className='category_header'>{category.title}</div>
                    </div>

                    <Link className='category_header_link' to={'/cart'}>
                        <img src={isCart ? '/assets/images/other/is_cart.svg' : '/assets/images/other/cart.svg'}
                             alt='cart'/>
                    </Link>
                </div>

                <ul className='category_list'>{getCategoryProducts()}</ul>
            </div>}

            {selectProduct &&
            <WebXR product={selectProduct} onSetProduct={handleSetProduct}/>}
        </>
    );
}

export default Category;