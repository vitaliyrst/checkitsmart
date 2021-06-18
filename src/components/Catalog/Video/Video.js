import React, {useEffect} from 'react';
import './Video.css';
import {GAevent} from "../../../ga/events";

const Video = () => {

    const handleGAEventSendVideoDuration = (time) => {
        GAevent('VIDEO', 'duration video', `${time} seconds`);
    }

    useEffect(() => {
        const time = Date.now();

        return () => {
            const timeEnd = Date.now();
            handleGAEventSendVideoDuration((timeEnd - time) / 1000);
        }
    }, []);

    return (
        <div className='video_container'>
            <video autoPlay='autoPlay'
                   preload='auto'
                   controls='controls'
                   poster='./assets/video/example.mp4'
            >
                <source
                    src='./assets/video/example.mp4'
                    type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                />
            </video>
        </div>
    )
}

export default Video;