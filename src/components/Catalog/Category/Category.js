import React, {useRef, useState} from 'react';
import './Category.css';
import {Link, useParams} from 'react-router-dom';
import {GAevent} from "../../../ga/events";
import WebXR from "../../WebXR/WebXR";
import Product from "./Product/Product";

const Category = React.memo(({data}) => {
    const {category} = useParams();

    const os = useRef(/iPhone|iPad|iPod/i.test(window.navigator.userAgent));
    const [selectProduct, setSelectProduct] = useState(null);

    const handleGAEventClickStartAR = (title) => GAevent('CATEGORY', 'click startAR', title);
    const handleGAEventClickSize = (title) => GAevent('CATEGORY', 'click size', title);

    const handleSetProduct = (product, title = '') => {
        if (!os.current) {
            setSelectProduct(product);
        }

        handleGAEventClickStartAR(title);
    }

    const getCategoryProducts = () => {
        const {products} = data[category];
        return products.map(product => (
            <Product
                key={product.id}
                product={product}
                os={os.current}
                category={category}
                onSelectProduct={handleSetProduct}
            />)
        );
    }

    return (
        <>
            {!selectProduct &&
            <div className='category_container'>

                <div className='category_header'>
                    {data[category].title}
                </div>

                <ul className='category_list'>
                    {getCategoryProducts()}
                </ul>

                {!os.current &&
                <Link className='category_link_size_container' to={`/size/${category}`}
                      onClick={() => handleGAEventClickSize(data[category].title)}>
                    <button className='category_link_size' type='button'>
                        Подобрать по размерам
                    </button>
                </Link>
                }

            </div>
            }

            {selectProduct &&
            <WebXR
                product={selectProduct}
                onSetProduct={handleSetProduct}
                scale={{x: 1, y: 1, z: 1}}
                mode={'model'}
            />
            }
        </>
    );
});

export default Category;