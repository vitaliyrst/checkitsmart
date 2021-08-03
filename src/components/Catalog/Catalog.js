import React, {useEffect, useRef, useState} from 'react';
import './Catalog.css';

import {useSelector} from "react-redux";
import {getAppDescription, getCartState, getCatalog, getLoading} from "../../redux/selectors";

import {GAevent} from "../../ga/events";
import {GApageView} from "../../ga";

import {Link} from "react-router-dom";

import Fallback from "../Loader/Loader";
import Footer from "../Footer/Footer";

const Catalog = () => {
    const loading = useSelector(getLoading);

    const isCart = useSelector(getCartState);
    const description = useSelector(getAppDescription('catalog'));
    const data = useSelector(getCatalog);

    const [openVideo, setOpenVideo] = useState(false);
    const videoRef = useRef();
    const width = useRef(window.innerWidth >= 416 ? ((416 - 48) / 2) : (window.innerWidth - 48) / 2);

    useEffect(() => {
        if(navigator.userAgent.includes("Instagram")){
           document.body.style.backgroundColor = '#ff0000';
           document.querySelector('#root').style.backgroundColor = '#ff0000';
        }

        GApageView(window.location.pathname);
    }, []);

    const handleGAEventSelectCategory = (title) => GAevent('CATALOG', `select category`, title);

    const handleClickVideo = () => {
        document.body.style.overflowY = 'hidden';
        setOpenVideo(true);
        videoRef.current.play();
    }
    const handleClickCloseVideo = () => {
        document.body.style.overflowY = 'auto';
        setOpenVideo(false);
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    }

    const getCatalogList = () => {
        return data.map(category => {
            const {id, slug, title, image} = category;

            return (
                <li key={id} className='catalog_item'
                    style={{
                        backgroundImage: (`url("${image}")`),
                        flexBasis: width.current,
                        height: 1.22 * width.current
                    }}>
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

    if (loading || !description) {
        return <Fallback/>;
    }

    return (
        <div className='catalog_container'>

            <div className='catalog_header_container'>
                <div className='catalog_header'>{description.header}</div>

                <Link className='catalog_header_link' to={'/cart'}>
                    <img src={isCart ? '/assets/images/other/is_cart.svg' : '/assets/images/other/cart.svg'}
                         alt='cart'/>
                </Link>
            </div>

            <ul className='catalog_list'>
                {getCatalogList()}

                <li className='catalog_item'
                    style={{
                        backgroundImage: (`url("/assets/images/catalog/how_it_works.png")`),
                        flexBasis: width.current,
                        height: 1.22 * width.current
                    }}>

                    <div className='item_link_category' onClick={handleClickVideo}>
                        <span className='item_link_category_title'>
                            {description.video}
                        </span>
                    </div>

                </li>
            </ul>
            {!loading && <Footer/>}

            <div className='video_container' style={{display: openVideo ? 'block' : 'none'}}
                 onClick={handleClickCloseVideo}>
                <div className='video_wrapper'>
                    <div className='video_close'>
                        <img src={'./assets/images/catalog/video_close.svg'} alt='video_close'
                             onClick={handleClickCloseVideo}/>
                    </div>
                    <video ref={videoRef} preload='auto' controls='controls'>
                        <source
                            src='https://firebasestorage.googleapis.com/v0/b/checkitsmartcom.appspot.com/o/video%2Fexample.mp4?alt=media&token=821f9eb3-f856-47b2-af3e-17226cd0b13d'
                            type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                        />
                    </video>
                </div>
            </div>
            <a href={'https://onliner.by'}>Onliner</a>
        </div>
    );
};

export default Catalog;