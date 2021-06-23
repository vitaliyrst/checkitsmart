import React, {useEffect, useState, Suspense, useRef} from 'react';
import './WebXR.css';
import {unmountComponentAtNode} from "@react-three/fiber";
import {ARCanvas, DefaultXRControllers} from "@react-three/xr";

import ARModel from "./ARModel/ARModel";
import ARHitTest from "./ARHitTest/ARHitTest";
import AROverlay from "./AROverlay/AROverlay";

import ARLoader from "./ARLoader/ARLoader";
import {ARButton} from "./ARButton";
import AROverlayGray from "./AROverlay/AROverlayGray";
import {GAevent} from "../../ga/events";
import ARHelper from "./AROverlay/ARHelper";

const WebXR = React.memo(({product, onSetProduct, scale, mode}) => {
    const canvas = useRef();
    const time = useRef(Date.now());

    const [isHit, setIsHit] = useState(false);
    const [buttonReady, setButtonReady] = useState(false);
    const [sessionReady, setSessionReady] = useState(false);
    const [matrix, setMatrix] = useState(null);
    const [planeDetected, setPlaneDetected] = useState(false);

    const handleGAEventSessionDuration = (time) => {
        GAevent('AR SESSION', 'duration session', `${time} seconds`);
    }

    const handleIsHit = (hit) => {
        setIsHit(hit);
        setPlaneDetected(false);
    }
    const handleSetMatrix = (matrix) => {
        setMatrix(matrix);
        setIsHit(true);
    }
    const handleSetButtonReady = (state) => setButtonReady(state);
    const handleSetPlaneDetected = (state) => setPlaneDetected(state);
    const handleStartSession = (gl) => {
        const arConfig = {
            requiredFeatures: ['hit-test'],
            optionalFeatures: ['dom-overlay'],
            domOverlay: {root: document.querySelector('.canvas_container')}
        }

        document.body.append(ARButton.createButton(gl, arConfig, handleSetButtonReady));

        gl.xr.addEventListener('sessionend', () => {
            console.log('session end')
            const timeEnd = Date.now();
            handleGAEventSessionDuration((timeEnd - time.current) / 1000);
            onSetProduct(null, product.title);
        });
    }

    useEffect(() => {
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
                <directionalLight position={[0, 1, 6]} intensity={1}/>
                <directionalLight position={[0, 1, -6]} intensity={1}/>
                <directionalLight position={[6, 1, 0]} intensity={1}/>
                <directionalLight position={[-6, 2, 0]} intensity={1}/>
                <directionalLight position={[0, -5, 0]} intensity={1}/>
                <Suspense fallback={<ARLoader/>}>
                    {(!isHit && sessionReady) &&
                    <ARHitTest onSetMatrix={handleSetMatrix} onPlaneDetected={handleSetPlaneDetected}
                               detected={planeDetected}/>}

                    {isHit &&
                    <ARModel product={product} matrix={matrix} scale={scale} mode={mode}/>}
                </Suspense>

                <DefaultXRControllers/>
            </ARCanvas>

            {!planeDetected && sessionReady &&
            <ARHelper
                classes={'ar_helper_plane'}
                data={['Перемещайте устройство,', 'для определения поверхности']}
                img={'/assets/images/other/helper.svg'}
            />
            }

            {planeDetected && sessionReady && !isHit &&
            <ARHelper data={['Кликни на круг,', 'чтобы поставить туда объект']}/>
            }

            {isHit && (mode === 'model') &&
            <AROverlay product={product} onHit={handleIsHit}/>}

            {isHit && (mode === 'grayModel') &&
            <AROverlayGray product={product} onHit={handleIsHit} scale={scale}/>}
        </div>
    )
});

export default WebXR;