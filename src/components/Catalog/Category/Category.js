import React, {useEffect} from 'react';
import './Category.css';

import {useDispatch, useSelector} from "react-redux";
import {fetchCategory, setScrollCategory} from "../../../redux/actions";
import {
    getAppDescription,
    getCategory,
    getLanguage,
    getLoading,
    getScrollCategory
} from "../../../redux/selectors";

import {useHistory, useParams} from 'react-router-dom';

import {GAevent} from "../../../ga/events";
import {GApageView} from "../../../ga";

import Fallback from "../../Loader/Loader";

const Category = () => {
    const dispatch = useDispatch();
    const loading = useSelector(getLoading);
    const language = useSelector(getLanguage);

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

    if (loading || !description || !category.products) {
        return <Fallback/>
    }

    return (
        <div className='category_container'>
            <div className='category_header'>
                {category.title}
            </div>

            <ul className='category_list'>
                {category.products.map(product => getProduct(product))}
            </ul>
        </div>
    );
}

export default Category;