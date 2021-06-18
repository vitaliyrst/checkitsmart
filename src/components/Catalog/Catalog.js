import React from 'react';
import './Catalog.css';
import {Link} from "react-router-dom";
import {GAevent} from "../../ga/events";

const Catalog = ({data}) => {
    const handleGAEventClickSize = (title) => GAevent('SIZE', 'click size', title);
    const handleGAEventClickCategory = (title) => GAevent('CATEGORY', `click category`, title);
    const handleGAEventClickVideo = () => GAevent('VIDEO', 'click video', 'video');

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
                        onClick={() => handleGAEventClickCategory(title)}
                    >
                        <span className='item_link_category_title'>{title}</span>
                    </Link>
                    <Link
                        className='item_link_category_size'
                        to={`/size/${slug}`}
                        onClick={() => handleGAEventClickSize(title)}
                    >
                        <img
                            className='item_link_category_size_image'
                            src='/assets/images/other/ruler.png'
                            alt={title + ' size'}
                        />
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

                <li className='catalog_item_video' onClick={() => handleGAEventClickVideo}>
                    <Link className='item_link_video' to='/video'>
                        Как это работает?
                    </Link>
                </li>

            </ul>
        </div>
    );
}

export default Catalog;