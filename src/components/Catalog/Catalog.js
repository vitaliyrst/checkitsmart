import React, {useEffect} from 'react';
import './Catalog.css';

import {useSelector} from "react-redux";
import {getAppDescription, getCartState, getCatalog, getLoading, getOs} from "../../redux/selectors";

import {GAevent} from "../../ga/events";
import {GApageView} from "../../ga";

import {Link} from "react-router-dom";

import Fallback from "../Loader/Loader";

const Catalog = () => {
    const loading = useSelector(getLoading);
    const isCart = useSelector(getCartState);
    const data = useSelector(getCatalog);
    const os = useSelector(getOs);
    const description = useSelector(getAppDescription('catalog'));

    useEffect(() => {
        GApageView(window.location.pathname);
    }, []);

    const handleGAEventSelectCategory = (title) => GAevent('CATALOG', `select category`, title);

    const getCatalogList = () => {

        return data.map(category => {
            const {id, slug, title, image} = category;

            return (
                <li key={id} className='catalog_item'
                    style={{backgroundImage: (`url("${image}")`)}}>
                    <Link
                        className='item_link_category'
                        to={`/catalog/${slug}`}
                        onClick={() => handleGAEventSelectCategory(title)}
                    >
                        <span className='item_link_category_title'>{title}</span>
                    </Link>
                </li>
            );
        });
    }

    if (loading) {
        return <Fallback/>;
    }

    return (
        <div className='catalog_container'>

            <div className='catalog_header_container'>
                <div className='catalog_header'>{description.header}</div>

                {(os === 'android' || os === 'pc') &&
                <Link className='catalog_header_link' to={'/cart'}>
                    <img src={isCart ? '/assets/images/other/is_cart.svg' : '/assets/images/other/cart.svg'}
                         alt='cart'/>
                </Link>
                }
            </div>

            <ul className='catalog_list'>
                {getCatalogList()}

                <li className='catalog_item'
                    style={{backgroundImage: (`url("/assets/images/catalog/how_it_works.png")`)}}>

                    <Link className='item_link_category' to='/catalog/video'>
                        <span className='item_link_category_title'>
                            {description.video}
                        </span>
                    </Link>

                </li>
            </ul>
        </div>
    );
};

export default Catalog;
