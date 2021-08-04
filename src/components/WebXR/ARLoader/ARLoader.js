import React, {useEffect, useRef} from "react";
import './ARLoader.css';
import {Html} from '@react-three/drei'
import {useThree} from "@react-three/fiber";

/**
 * Loader отображается пока модель еще не загружена, рендерим в fallback suspense в компоненте WebXR
 * @returns {JSX.Element}
 * @constructor
 */

const ARLoader = () => {
    const {camera} = useThree();
    const meshRef = useRef();
    const mesh = meshRef.current

    useEffect(() => {
        camera.add(mesh);

        return () => camera.remove(mesh);
    }, [camera, mesh]);

    return (
        <mesh ref={meshRef} position={[0, 0, -0.05]}>
            <Html>
                <div className='ar_loader_content'>
                    <img src={'/assets/images/other/spinner.svg'} alt='loader'/>
                </div>
            </Html>
        </mesh>
    );
}

export default ARLoader;
