import React, {useEffect, useRef, useState} from 'react';
import './Category.css';
import {Link, useParams} from 'react-router-dom';
import {GAevent} from "../../../ga/events";
import WebXR from "../../WebXR/WebXR";
import {useDispatch, useSelector} from "react-redux";
import {hideLoader} from "../../../redux/actions";
import {getCatalog, getLoading, getOs} from "../../../redux/selectors";

const Category = React.memo(() => {
    const [selectProduct, setSelectProduct] = useState(null);
    const appleARRef = useRef();
    const params = useParams();
    const dispatch = useDispatch();

    const os = useSelector(getOs);
    const loading = useSelector(getLoading);
    const catalog = useSelector(getCatalog);
    const category = catalog.find(item => item['slug'] === params.category);

    const handleGAEventClickStartAR = (title) => GAevent(`CATEGORY ${category.title}`, 'select model', title);
    const handleGAEventClickSize = (title) => GAevent(`CATEGORY ${category.title}`, 'select by size', title);
    const handleClickAppleAR = (eo, mfrLink) => {
        const button = eo.currentTarget.querySelector('#ar-link');
        button.click();

        appleARRef.current.addEventListener('message', (eo) => {
            if (eo.data === "_apple_ar_quicklook_button_tapped") {
                window.open(mfrLink);
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
        const {id, usdz, image, title, size, price, color, mfrLink} = product
        return (
            <li key={id} className='category_item' onClick={() => handleClickAppleAR(mfrLink)}>
                <div className='category_item_image_container'>
                    <a ref={appleARRef} className='category_item_apple_link' id="ar-link" href={usdz} rel='ar'>
                        <img className='category_item_image' src={image} alt={title}/>
                        <img className='category_item_ar_image' src='/assets/images/other/ar-link.svg'
                             alt='ar'/>
                    </a>
                </div>
                <div className='category_item_title'>{title}</div>
                <div className='category_additional_info_container'>
                    {getProductColor(color)}
                    <div className='category_item_size'><span>Размеры, см: </span>{size}</div>
                </div>
                <div className='category_item_price'>{price} BYN</div>
            </li>
        );
    }

    const getAndroidProducts = (product) => {
        const {id, title, image, price, size, color} = product;
        return (
            <li key={id} className='category_item' onClick={() => setSelectProduct(product)}>
                <div className='category_item_image_container'>
                    <img className='category_item_image' src={image} alt={title}/>
                    <img className='category_item_ar_image' src='/assets/images/other/ar-link.svg' alt='ar'/>
                </div>
                <div className='category_item_title'>{title}</div>
                <div className='category_additional_info_container'>
                    {getProductColor(color)}
                    <div className='category_item_size'><span>Размеры, см: </span>{size}</div>
                </div>
                <div className='category_item_price'>{price} BYN</div>
            </li>
        );
    }

    const getProductColor = (color) => {
        return category === 'carpets' ?
            <div className='category_item_color'><span>Высота ворса, мм: </span>{color}</div> :
            <div className='category_item_color'><span>Цвет: </span>{color}</div>
    }

    return (
        <>
            {!selectProduct && !loading &&
            <div className='category_container'>
                <div className='category_header'>{category.title}</div>
                <ul className='category_list'>{getCategoryProducts()}</ul>

                {!os &&
                <Link className='category_link_size_container' to={`/size/${category['slug']}`}
                      onClick={() => handleGAEventClickSize(category.title)}>
                    <button className='category_link_size' type='button'>
                        Подобрать по размерам
                    </button>
                </Link>
                }

            </div>
            }

            {selectProduct &&
            <WebXR product={selectProduct} onSetProduct={handleSetProduct} scale={{x: 1, y: 1, z: 1}} mode={'model'}/>
            }
        </>
    );
});

export default Category;