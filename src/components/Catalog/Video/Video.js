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
                   poster='https://firebasestorage.googleapis.com/v0/b/checkitsmartcom.appspot.com/o/video%2Fexample.mp4?alt=media&token=821f9eb3-f856-47b2-af3e-17226cd0b13d'
            >
                <source
                    src='https://firebasestorage.googleapis.com/v0/b/checkitsmartcom.appspot.com/o/video%2Fexample.mp4?alt=media&token=821f9eb3-f856-47b2-af3e-17226cd0b13d'
                    type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                />
            </video>
        </div>
    )
}

export default Video;
