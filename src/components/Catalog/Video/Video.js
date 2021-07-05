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
                   poster='https://firebasestorage.googleapis.com/v0/b/check-it-smart.appspot.com/o/video%2Fexample.mp4?alt=media&token=740ddaf0-4a51-48be-b454-6b67dbfb1748'
            >
                <source
                    src='https://firebasestorage.googleapis.com/v0/b/check-it-smart.appspot.com/o/video%2Fexample.mp4?alt=media&token=740ddaf0-4a51-48be-b454-6b67dbfb1748'
                    type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                />
            </video>
        </div>
    )
}

export default Video;