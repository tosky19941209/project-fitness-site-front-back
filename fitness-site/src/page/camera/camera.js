import React, { useRef, useState, useEffect, useSyncExternalStore } from 'react'
import './camera.css'
import { ReactDOM } from "react";
import * as mediapipePose from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose } from "@mediapipe/pose";
import api from '../../service/axios'

function Camera() {
    const canvasRef = useRef(null)
    const videoRef = useRef(null)
    const poseRef = useRef(null);
    const [stateVideoPlay, setVideoPlay] = useState(false)
    const [accuracy, setAccuracy] = useState('')
    const [counter, setCounter] = useState(0)
    const [api_url, setapiURL] = useState('exercise_1')

    const onResults = (results) => {
        const canvasElement = canvasRef.current;
        const videoElement = videoRef.current;

        const canvasCtx = canvasElement.getContext("2d");

        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        if (results.poseLandmarks) {
            drawConnectors(canvasCtx, results.poseLandmarks, mediapipePose.POSE_CONNECTIONS, { color: 'white', lineWidth: 1.5 });
            drawLandmarks(canvasCtx, results.poseLandmarks, { color: 'gray', lineWidth: 1, fillColor: 'gray', radius: '2' });
        }
        // console.log(typeof results)
        api.post(`/${api_url}`, results)
            .then((res) => {
                const newdata = res.data
                setCounter(newdata.counter)
                setAccuracy(newdata.accuracy)
            })

    };

    const userPose = new Pose({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
    });

    userPose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });


    useEffect(() => {

        if (stateVideoPlay == true) {
            videoRef.current.play()
            // var myInterval = setInterval(() => {
            //     const video = videoRef.current;
            //     if (video)
            //         poseRef.current.send({ image: video });
            // }, 80);
            // return () => {
            //     clearInterval(myInterval);
            // }
        }
    }, [stateVideoPlay])

    // useEffect(() => {
    //     console.log("aoi_url:", api_url)
    //     userPose.onResults(onResults);
    //     poseRef.current = userPose;
    //     return () => {
    //         poseRef.current.close();
    //     };
    // }, [api_url]);

    return (
        <>
            <div style={{
                width:"60vw",
                height:"35vw",
                backgroundColor:"aqua"
            }}></div>
        </>
    )
}

export default Camera;