import React, {useRef} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {setMatrix, setPlaneDetected, setReticleHit} from "../../../redux/actions";
import {getPlaneDetected} from "../../../redux/selectors";

import {useHitTest} from "@react-three/xr";
import {Circle, Ring} from "@react-three/drei";

/**
 * HitTest - нужен для обнаружения position scale rotation того, где пользователь нажал на камеру и установки реального объекта
 * @returns {JSX.Element}
 * @constructor
 */

const ARHitTest = () => {
    const mesh = useRef();
    const material = useRef();

    const dispatch = useDispatch();
    const planeDetected = useSelector(getPlaneDetected);

    /**
     * @property hit.decompose - сеттит position scale rotation на временный круг,
     * куда далее устанавливается реальный объект в компоненте WebXR
     */
    useHitTest(hit => {
        if (hit && !planeDetected) { // Нужно, чтобы после нажатия hit-test переставал работать (производительность)
            material.current.opacity = 0.9;
            dispatch(setPlaneDetected(true));
        }
        if (mesh.current && hit) {
            hit.decompose(mesh.current.position, mesh.current.rotation, mesh.current.scale);
        }
    });

    const handlePointerDown = () => {
        if (planeDetected) {
            dispatch(setMatrix(mesh.current.matrix));
            dispatch(setReticleHit(true));
        }
    }

    return (
        <mesh ref={mesh} onPointerDown={handlePointerDown}>
            <Ring args={[0.09, 0.12, 32]} rotation={[-Math.PI / 2, 0, 0]}>
                <meshStandardMaterial ref={material} color='#FFFFFF' transparent='true' opacity='0'/>
            </Ring>
            <Circle args={[0.15, 8]}>
                <meshStandardMaterial transparent='true' opacity='0'/>
            </Circle>
        </mesh>
    );
}

export default ARHitTest;
