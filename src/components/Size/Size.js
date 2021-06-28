import React, {useRef, useState} from 'react';
import './Size.css';
import {useParams} from "react-router";
import {GAevent} from "../../ga/events";
import WebXR from "../WebXR/WebXR";

const Size = React.memo(({data}) => {
    const {category} = useParams();
    const length = useRef();
    const width = useRef();
    const height = useRef();
    const scale = useRef({});
    const [selectProduct, setSelectProduct] = useState(null);

    const handleGAEventClickAcceptButton = () => {
        GAevent('SIZE', 'click accept button', `
        Длина ${length.current && length.current.value ? length.current.value : 1} 
        Ширина ${width.current && width.current.value ? width.current.value : 1} 
        Высота ${height.current && height.current.value ? height.current.value : 1}
        `);

        setSelectProduct(data[category]);
    }

    const handleClickInput = (eo) => {
        if (eo.target.value === '0') {
            eo.target.value = '';
            eo.target.style.color = '#FFFFFF';
        }
    }

    const handleBlurInput = (eo) => {
        if (eo.target.value === '') {
            eo.target.value = '0';
            eo.target.style.color = '#888788';
        } else {
            eo.target.style.color = '#FFFFFF';
        }
    }

    const handleSetProduct = (product) => setSelectProduct(product);

    const getInputs = () => {
        return data[category].sides.map((side, index) => {
            let ref;

            if (index === 0) {
                ref = length;
            }

            if (index === 1) {
                ref = width;
            }

            if (index === 2) {
                ref = height;
            }

            return (
                <div key={index} className='size_input_item'>
                    <label htmlFor={side[0]}>{side[1]}: </label>
                    <input ref={ref} className='size_input' id={side[0]} type='number' defaultValue='0'
                           onClick={handleClickInput} onBlur={handleBlurInput}
                    />
                    <span>см</span>
                </div>
            )
        });
    }

    const modelScale = () => {
        const {grayModel} = data[category];
        const [baseLength, baseWidth, baseHeight] = grayModel.size;

        if (baseLength && baseWidth && baseHeight) {
            scale.current = {
                z: (Number(length.current.value) === 0) ? 1 : Number(length.current.value) / baseLength,
                y: (Number(height.current.value) === 0) ? 1 : Number(height.current.value) / baseHeight,
                x: (Number(width.current.value) === 0) ? 1 : Number(width.current.value) / baseWidth
            }
        }

        if (baseLength && baseWidth && !baseHeight) {
            scale.current = {
                z: (Number(length.current.value) === 0) ? 1 : Number(length.current.value) / baseLength,
                y: 1,
                x: (Number(width.current.value) === 0) ? 1 : Number(width.current.value) / baseWidth,
            }
        }
    }

    return (
        <>
            {!selectProduct &&
            <div className='size_container'>

                <div className='size_header'>
                    Введите размеры объекта
                </div>

                <div className='size_image_container'>
                    <img className='size_image' src={data[category].figure} alt='size'/>
                </div>

                <div className='size_input_list'>
                    {getInputs()}
                </div>

                <div className='size_accept_button_container' onClick={modelScale}>
                    <button className='size_accept_button' type='button' onClick={handleGAEventClickAcceptButton}>
                        Применить
                    </button>
                </div>

            </div>
            }

            {selectProduct &&
            <WebXR
                product={data[category].grayModel}
                onSetProduct={handleSetProduct}
                scale={scale.current}
                mode={'grayModel'}
            />
            }
        </>
    );
});

export default Size;