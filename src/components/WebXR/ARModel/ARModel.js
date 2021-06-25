import React, {useEffect, useRef} from 'react';
import {useLoader, useThree} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DragControls} from "../ARControls/ARDragControls";

const ARModel = ({product: {arGLTF}, matrix, scale, mode}) => {
    const {camera, gl: {domElement}} = useThree();
    const gltf = useLoader(GLTFLoader, arGLTF);

    const dragControls = useRef({});
    const axisYPosition = useRef(0);
    const startRotate = useRef({});

    useEffect(() => {
        if (scale && matrix) {
            gltf.scene.scale.set(scale.x, scale.y, scale.z);
            gltf.scene.position.setFromMatrixPosition(matrix);
            axisYPosition.current = gltf.scene.position.y;
        }

        dragControls.current = new DragControls([gltf.scene], camera, domElement);
        dragControls.current.transformGroup = true;

        domElement.addEventListener('pointerdown', handlePointerDown);
        /*        domElement.addEventListener('touchstart', (eo) => {
                    if (eo.targetTouches.length === 2) {
                        let dx = eo.targetTouches[1].pageX - eo.targetTouches[0].pageX;
                        let dy = eo.targetTouches[1].pageY - eo.targetTouches[0].pageY;
                        let distance = Math.sqrt(dx * dx + dy * dy);
                        let angle = Math.atan2(dy, dx);
                        startRotate.current = {touchStartDistance: distance, touchStartAngle: angle}
                    }
                })
                domElement.addEventListener('touchmove', (eo) => {

                    if (eo.targetTouches.length === 2) {
                        let dx = eo.targetTouches[1].pageX - eo.targetTouches[0].pageX;
                        let dy = eo.targetTouches[1].pageY - eo.targetTouches[0].pageY;
                        let distance = Math.sqrt(dx * dx + dy * dy);
                        let angle = Math.atan2(dy, dx);
                        let touchAngle = angle - startRotate.current.touchStartAngle
                        gltf.scene.rotateY(-touchAngle * 0.01)
                        console.log(touchAngle)
                        /!*console.log(gltf.scene.rotation);*!/
                    }
                })*/

        domElement.addEventListener('touchstart', (eo) => {
            eo.preventDefault();
            if (eo.targetTouches.length === 2) {
                startRotate.current.touchDown = true;
                startRotate.current.touchX = eo.touches[0].pageX;
                startRotate.current.touchY = eo.touches[0].pageY;

                overlay.current.support.style.display = 'none';
                overlay.current.info.style.display = 'none';
            }
        }, false);

        domElement.addEventListener('touchend', (eo) => {
            eo.preventDefault();
            startRotate.current.touchDown = false;
        }, false);

        domElement.addEventListener('touchmove', (eo) => {
            if (startRotate.current.touchDown) {
                startRotate.current.deltaX = eo.touches[0].pageX - startRotate.current.touchX;
                startRotate.current.deltaY = eo.touches[0].pageY - startRotate.current.touchY;
                startRotate.current.touchX = eo.touches[0].pageX;
                startRotate.current.touchY = eo.touches[0].pageY;
                gltf.scene.rotation.y += startRotate.current.deltaX / 100;
            }
        })

        dragControls.current.addEventListener('drag', handleDragMove);

        return () => {
            domElement.removeEventListener('pointerdown', handlePointerDown, false);
            dragControls.current.removeEventListener('drag', handleDragMove, false);
        }
    }, [camera, domElement, gltf.scene, matrix, scale]);

    const overlay = useRef({
        support: document.querySelector((mode === 'model') ? '.ar_support_container' : '.ar_gray_support_container'),
        info: document.querySelector((mode === 'model') ? '.ar_info_container' : '.ar_gray_info_container')
    });

    const handleDragMove = () => {
        if (!startRotate.current.touchDown) {
            gltf.scene.position.y = axisYPosition.current;

            overlay.current.support.style.display = 'none';
            overlay.current.info.style.display = 'none';
        }
    }

    const handlePointerDown = (eo) => {
        const target = eo.target;
        const overlayNormalModelDisplay = overlay.current.support.style;
        const overlayGrayModelDisplay = overlay.current.info.style;

        if (overlayNormalModelDisplay.display === 'none' && overlayGrayModelDisplay.display === 'none') {
            overlayNormalModelDisplay.display = 'block';
            overlayGrayModelDisplay.display = 'block';
        } else if (target === document.querySelector('canvas')) {
            overlayNormalModelDisplay.display = 'none';
            overlayGrayModelDisplay.display = 'none';
        }
    }

    return (<primitive object={gltf.scene}/>);
}

export default ARModel;