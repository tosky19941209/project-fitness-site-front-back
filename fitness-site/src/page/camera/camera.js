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
    const [kind_exercise, setKindExercise] = useState(null)
    const [test, setTest] = useState(null)
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
                setKindExercise(newdata.kind_exercise)
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
            var myInterval = setInterval(() => {
                const video = videoRef.current;
                if (video)
                    poseRef.current.send({ image: video });
            }, 80);
            return () => {
                clearInterval(myInterval);
            }
        }
    }, [stateVideoPlay])

    useEffect(() => {
        console.log("aoi_url:", api_url)
        userPose.onResults(onResults);
        poseRef.current = userPose;
        return () => {
            poseRef.current.close();
        };
    }, [api_url]);


    return (
        <>
            <div className='camera_enable'>
                <canvas ref={canvasRef} width='700px' height='600px' className='canvas_css'></canvas>
                <video ref={videoRef} width='500px' height='300px' controls muted="muted">
                    <source src='video1.mp4' type='video/mp4'>

                    </source>
                </video>
            </div>
            <button className='btn_start' onClick={() => {
                if (stateVideoPlay === false)
                    setVideoPlay(true)
                else setVideoPlay(false)

            }}>start</button>
            <p>{counter + kind_exercise}</p>
            <select width='100px' height='100px'
                onChange={(e) => {
                    setapiURL(e.target.value)
                    api.get('/changed_exercise', {params:{kind:""}})
                    .then(res => {
                        console.log(res)
                        setCounter(0)
                    })
                }}>
                <option>exercise_1</option>
                <option>exercise_2</option>
                <option>exercise_3</option>
            </select>
            <progress value={accuracy} max="100" className='test_css'></progress>
        </>
    )
}

export default Camera;