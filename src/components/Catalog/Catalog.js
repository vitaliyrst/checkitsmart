import React from 'react';
import './Catalog.css';

import {useSelector} from "react-redux";
import {getCartState} from "../../redux/selectors";

import {GAevent} from "../../ga/events";

import {Link} from "react-router-dom";

const Catalog = React.memo(() => {
    const isCart = useSelector(getCartState);
    const data = useSelector(({catalog: {catalog}}) => catalog);

    const handleGAEventSelectCategory = (title) => GAevent('CATALOG', `select category`, title);
    const handleGAEventSelectVideo = () => GAevent('CATALOG', 'select video', 'video');

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

    return (
        <div className='catalog_container'>

            <div className='catalog_header_container'>
                <div className='catalog_header'>Каталог</div>
                <Link className='catalog_header_link' to={'/cart'}>
                    <img src={isCart ? '/assets/images/other/is_cart.svg' : '/assets/images/other/cart.svg'}
                         alt='cart'/>
                </Link>
            </div>

            <ul className='catalog_list'>
                {getCatalogList()}

                <li className='catalog_item_video'
                    style={{backgroundImage: (`url("/assets/images/catalog/how_it_works.png")`)}}
                    onClick={() => handleGAEventSelectVideo}>

                    <Link className='item_link_video' to='/catalog/video'>
                        <div>
                            Как это работает?
                        </div>
                    </Link>

                </li>

            </ul>
        </div>
    );
});

export default Catalog;