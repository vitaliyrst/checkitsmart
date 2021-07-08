import React from "react";
import {YMInitializer} from 'react-yandex-metrika';


const Yandex = () => {

    return (
        <div>
            <YMInitializer accounts={[82657150]} options={{webvisor: true, clickmap: true, trackLinks: true, accurateTrackBounce: true}} version="2"/>
        </div>
    );

}

export default Yandex;
