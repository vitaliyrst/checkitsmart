import React, {useRef} from 'react';
import {useHitTest} from "@react-three/xr";
import {Circle, Ring} from "@react-three/drei";

const ARHitTest = React.memo(({onSetMatrix}) => {
    const mesh = useRef();
    const material = useRef();

    useHitTest(hit => {
        if (hit && material.current && material.current.transparent) {
            material.current.opacity = 0.9;
        }
        if (mesh.current && hit) {
            hit.decompose(mesh.current.position, mesh.current.rotation, mesh.current.scale);
        }
    });

    const handlePointerDown = () => onSetMatrix(mesh.current.matrix);

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
});

export default ARHitTest;