import React from 'react';
import './Catalog.css';
import {Link} from "react-router-dom";
import {GAevent} from "../../ga/events";

const Catalog = ({data}) => {
    const handleGAEventSelectCategory = (title) => GAevent('CATALOG', `select category`, title);
    const handleGAEventSelectVideo = () => GAevent('CATALOG', 'select video', 'video');

    const getCatalogList = () => {
        const categories = Object.keys(data);

        return categories.map(category => {
            const {id, slug, title, image} = data[category];

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

            <div className='catalog_header'>
                Каталог
            </div>

            <ul className='catalog_list'>
                {getCatalogList()}

                <li className='catalog_item_video' onClick={() => handleGAEventSelectVideo}>
                    <Link className='item_link_video' to='/video'>
                        Как это работает?
                    </Link>
                </li>

            </ul>
        </div>
    );
}

export default Catalog;