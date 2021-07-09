import React, {useEffect, useRef} from "react";
import './ARLoader.css';
import {Html} from '@react-three/drei'
import {useThree} from "@react-three/fiber";

const ARLoader = () => {
    const {camera} = useThree();
    const meshRef = useRef();

    useEffect(() => {
        camera.add(meshRef.current);

        return () => camera.remove(meshRef.current);
    }, [camera]);

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
