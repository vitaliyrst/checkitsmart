import React from "react";
import {Html, useProgress} from '@react-three/drei'


const ARLoader = () => {
    const progress = useProgress();
    return <Html center>{progress.progress} % loaded</Html>
}

export default ARLoader;