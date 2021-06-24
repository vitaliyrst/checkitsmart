import React, {useEffect, useRef} from 'react';
import {useLoader, useThree} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DragControls} from "three/examples/jsm/controls/DragControls";

const ARModel = React.memo(({product: {arGLTF}, matrix, scale, mode}) => {
    const {camera, gl: {domElement}} = useThree();
    const gltf = useLoader(GLTFLoader, arGLTF);
    console.log(gltf)
    const overlay = useRef({
        support: document.querySelector((mode === 'model') ? '.ar_support_container' : '.ar_gray_support_container'),
        info: document.querySelector((mode === 'model') ? '.ar_info_container' : '.ar_gray_info_container')
    });

    const controls = useRef({});
    const axisYPosition = useRef(0);

    const handleDragMove = () => {
        overlay.current.support.style.display = 'none';
        overlay.current.info.style.display = 'none';

        (gltf.scene.position.y = axisYPosition.current);
    }

    const handlePointerDown = (eo) => {
        const target = eo.target;

        if (
            overlay.current.support.style.display === 'none' &&
            overlay.current.info.style.display === 'none'
        ) {
            overlay.current.support.style.display = 'block';
            overlay.current.info.style.display = 'block';
        } else if (
            target.className !== 'ar_gray_info_close_container' &&
            target.className !== 'ar_info_close' &&
            target.className !== 'ar_gray_info_reset_container' &&
            target.className !== 'ar_gray_info_reset' &&
            target.className !== 'ar_gray_button_size_container' &&
            target.className !== 'ar_gray_button_size' &&
            target.className !== 'ar_info_close_container' &&
            target.className !== 'ar_info_close' &&
            target.className !== 'ar_info_reset_container' &&
            target.className !== 'ar_info_reset' &&
            target.className !== 'ar_info_button_buy' &&
            target.className !== 'ar_button_size_container' &&
            target.className !== 'ar_button_size'
        ) {
            overlay.current.support.style.display = 'none';
            overlay.current.info.style.display = 'none';
        }
    }

    useEffect(() => {
        if (scale && matrix) {
            gltf.scene.scale.set(scale.x, scale.y, scale.z);
            gltf.scene.position.setFromMatrixPosition(matrix);
            axisYPosition.current = gltf.scene.position.y;
        }

        controls.current = new DragControls([gltf.scene], camera, domElement);
        controls.current.transformGroup = true;

        domElement.addEventListener('pointerdown', handlePointerDown);
        controls.current.addEventListener('drag', handleDragMove);
        overlay.current.support.style.display = 'block';
        overlay.current.info.style.display = 'block';

        return () => {
            domElement.removeEventListener('pointerdown', handlePointerDown, false);
            controls.current.removeEventListener('drag', handleDragMove, false);
        }
    }, [camera, domElement, gltf.scene, matrix, scale]);

    return (
        <>
            <primitive object={gltf.scene}/>
        </>
    )
});

export default ARModel;