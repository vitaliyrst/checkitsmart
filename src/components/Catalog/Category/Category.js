import React, {useEffect} from 'react';
import './Category.css';

import {useDispatch, useSelector} from "react-redux";
import {fetchCategory, setScrollCategory} from "../../../redux/actions";
import {
    getAppDescription,
    getCartState,
    getCategory,
    getLanguage,
    getLoading,
    getScrollCategory
} from "../../../redux/selectors";

import {Link, useHistory, useParams} from 'react-router-dom';

import {GAevent} from "../../../ga/events";
import {GApageView} from "../../../ga";

import Fallback from "../../Loader/Loader";
import Footer from "../../Footer/Footer";

const Category = () => {
    const dispatch = useDispatch();
    const loading = useSelector(getLoading);
    const language = useSelector(getLanguage);

    const isCart = useSelector(getCartState);
    const description = useSelector(getAppDescription('category'));
    const category = useSelector(getCategory);
    const scroll = useSelector(getScrollCategory);

    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        GApageView(window.location.pathname);
        dispatch(fetchCategory(params.category, language, scroll));
    }, [dispatch, params.category, language, scroll]);

    const handleGAEventClickProduct = (title) => GAevent('CATEGORY', 'click product', title);

    const handleClickProduct = (eo, product) => {
        handleGAEventClickProduct(product.title);
        history.push(`/catalog/${params.category}/${product.id}`);
        dispatch(setScrollCategory(window.scrollY));
    }

    const getProduct = (product) => {
        const {id, title, image, price} = product;

        return (
            <li key={id} className='category_item'
                onClick={(eo) => handleClickProduct(eo, product)}
            >
                <div className='category_item_image_container'>
                    <img className='category_item_image' src={image} alt={title}/>
                </div>
                <div className='category_item_title'>{title}</div>
                {
                    language === 'en' || language === 'EN' ?
                        <div className='category_item_price'>{description.price} {price.toFixed(2)} </div>:
                        <div className='category_item_price'>{price.toFixed(2)} {description.price}</div>
                }
            </li>
        );
    }
/*
    navigator.permissions.query({name: 'xr'}).then(function (result) {
        if (result.state === 'granted') {
            console.log('free')
        } else if (result.state === 'prompt') {
            console.log('close')
        }
    });*/

    if (loading || !description || !category.products) {
        return <Fallback/>
    }

    return (
        <div className='category_container'>
            <div className='category_header_container'>

                <div className='category_header_wrapper'>
                    <Link className='category_header_arrow_left_link' to={'/catalog'}>
                        <img src={'/assets/images/other/arrow_left.svg'}
                             alt='arrow_left'/>
                    </Link>
                    <div className='category_header'>{category.title}</div>
                </div>

                <Link className='category_header_cart_link' to={'/cart'}>
                    <img src={isCart ? '/assets/images/other/is_cart.svg' : '/assets/images/other/cart.svg'}
                         alt='cart'/>
                </Link>
            </div>

            <ul className='category_list'>
                {category.products.map(product => getProduct(product))}
            </ul>

            <Footer/>
        </div>
    );
}

export default Category;