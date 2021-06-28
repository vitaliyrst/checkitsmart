import React, {useRef} from "react";
import './CategoryItem.css';

const CategoryItem = React.memo(({product: {title, image, color, size, price, mfrLink, usdz}, os, onSelectProduct, product, category}) => {
    const ref = useRef();

    const handleClickLink = (eo) => {
        eo.currentTarget.querySelector('#ar-link').click();
        ref.current.addEventListener('message', (eo) => {
            if (eo.data === "_apple_ar_quicklook_button_tapped") {
                window.open(mfrLink);
            }
        })
    }

    const getProductColor = () => (category === 'carpets') ?
        <div className='category_item_color'><span>Высота ворса, мм: </span>{color}</div> :
        <div className='category_item_color'><span>Цвет: </span>{color}</div>

    return (
        <>
            {!os &&
            <li className='category_item' onClick={() => onSelectProduct(product)}>
                <div className='category_item_image_container'>
                    <img className='category_item_image' src={image} alt={title}/>
                    <img className='category_item_ar_image' src='/assets/images/other/ar-link.svg' alt='ar'/>
                </div>
                <div className='category_item_title'>{title}</div>
                <div className='category_additional_info_container'>
                    {getProductColor()}
                    <div className='category_item_size'><span>Размеры, см: </span>{size}</div>
                </div>
                <div className='category_item_price'>{price} BYN</div>
            </li>}

            {os &&
            <li className='category_item' onClick={handleClickLink}>
                <div className='category_item_image_container'>
                    <a ref={ref} className='category_item_apple_link' id="ar-link" href={usdz} rel='ar'>
                        <img className='category_item_image' src={image} alt={title}/>
                        <img className='category_item_ar_image' src='/assets/images/other/ar-link.svg'
                             alt='ar'/>
                    </a>
                </div>
                <div className='category_item_title'>{title}</div>
                <div className='category_additional_info_container'>
                    {getProductColor()}
                    <div className='category_item_size'><span>Размеры, см: </span>{size}</div>
                </div>
                <div className='category_item_price'>{price} BYN</div>

            </li>}
        </>
    );
});

export default CategoryItem;