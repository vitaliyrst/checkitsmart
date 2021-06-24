import React, {useEffect, useRef} from "react";
import './ARLoader.css';
import {Html} from '@react-three/drei'
import {useThree} from "@react-three/fiber";


const ARLoader = () => {
    const {camera} = useThree();
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            camera.add(ref.current);
        }
        return () => {
            camera.remove(ref.current);
        }
    }, []);

    return (
        <mesh ref={ref} position={[0, 0, -0.05]}>
            <Html>
                <div className='ar_loader_content'>
                    <img src={'/assets/images/other/spinner.svg'} alt='loader'/>
                </div>
            </Html>
        </mesh>
    );
}

export default ARLoader;