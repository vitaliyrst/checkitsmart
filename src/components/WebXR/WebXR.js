import React, {useEffect, useState, Suspense, useRef} from 'react';
import './WebXR.css';

import store from "../../redux/store";
import {Provider, useDispatch, useSelector} from "react-redux";
import {getPlaneDetected, getReticleHit} from "../../redux/selectors";
import {setPlaneDetected, setReticleHit} from "../../redux/actions";

import {unmountComponentAtNode} from "@react-three/fiber";
import {ARCanvas, DefaultXRControllers} from "@react-three/xr";

import {GAevent} from "../../ga/events";
import {GApageView} from "../../ga";

import {ARButton} from "./ARButton";
import ARHelper from "./AROverlay/ARHelper";
import ARModel from "./ARModel/ARModel";
import ARHitTest from "./ARHitTest/ARHitTest";
import AROverlay from "./AROverlay/AROverlay";
import ARLoader from "./ARLoader/ARLoader";


const WebXR = React.memo(({product}) => {
    const canvas = useRef();
    const time = useRef(Date.now());

    const [buttonReady, setButtonReady] = useState(false);
    const [sessionReady, setSessionReady] = useState(false);

    const dispatch = useDispatch();
    const isHit = useSelector(getReticleHit);
    const planeDetected = useSelector(getPlaneDetected);

    const handleGAEventSessionDuration = (time) => GAevent('AR SESSION', 'session duration', `${time} seconds`);

    const handleSetButtonReady = (state) => setButtonReady(state);
    const handleStartSession = (gl) => {
        const arConfig = {
            requiredFeatures: ['hit-test', 'depth-sensing'],
            optionalFeatures: ['dom-overlay'],
            depthSensing: {
                usagePreference: ["cpu-optimized"],
                dataFormatPreference: ["luminance-alpha"],
            },
            domOverlay: {root: document.querySelector('.canvas_container')}
        }
        document.body.append(ARButton.createButton(gl, arConfig, handleSetButtonReady));

        gl.xr.addEventListener('sessionend', () => {
            const timeEnd = Date.now();
            handleGAEventSessionDuration((timeEnd - time.current) / 1000);

            dispatch(setReticleHit(false));
            dispatch(setPlaneDetected(false));
        });

    }

    useEffect(() => {
        GApageView(window.location.pathname);

        return () => {
            if (document.getElementById('ARButton')) {
                document.body.removeChild(document.getElementById('ARButton'));
            }
            unmountComponentAtNode(document.querySelector('canvas'));
        }
    }, []);

    useEffect(() => {
        if (buttonReady) {
            document.getElementById('ARButton').click();
            setSessionReady(true);
        }
    }, [buttonReady]);

    return (
        <div className='canvas_container' ref={canvas}>
            <ARCanvas className='ARCanvas' onCreated={({gl}) => handleStartSession(gl)}>
                <Provider store={store}>
                    <directionalLight position={[0, 1, 6]} intensity={1}/>
                    <directionalLight position={[0, 1, -6]} intensity={1}/>
                    <directionalLight position={[6, 1, 0]} intensity={1}/>
                    <directionalLight position={[-6, 2, 0]} intensity={1}/>
                    <directionalLight position={[0, -5, 0]} intensity={1}/>

                    <Suspense fallback={<ARLoader/>}>
                        {(!isHit && sessionReady) && <ARHitTest/>}
                        {isHit && <ARModel product={product}/>}
                    </Suspense>

                    <DefaultXRControllers/>
                </Provider>
            </ARCanvas>

            {!planeDetected && sessionReady &&
            <ARHelper classes={'ar_helper_plane'}
                      data={['Перемещай устройство,', 'для определения поверхности']}
                      img={'/assets/images/other/hand.svg'}/>}

            {planeDetected && sessionReady && !isHit &&
            <ARHelper data={['Кликни на круг,', 'чтобы поставить туда объект']}/>}

            {isHit && <AROverlay product={product}/>}
        </div>
    )
});

export default WebXR;
