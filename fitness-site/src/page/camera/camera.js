import React, { useRef, useState, useEffect, useSyncExternalStore } from 'react'
import './camera.css'
import { ReactDOM } from "react";
import * as mediapipePose from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose } from "@mediapipe/pose";
import { Url_BackEnd } from '../../function_set/backendUrl';
import api from '../../service/axios'

function Camera({ setStateResultData, stateResultData }) {
    const canvasRef = useRef(null)
    const videoRef = useRef(null)
    const poseRef = useRef(null);
    const [accuracy, setAccuracy] = useState(0)
    const [counter, setCounter] = useState(0)
    const [cambtn_classname, setCamBtnClassName] = useState('btn_camera')
    const [cambtnsvg_classname, setCamBtnSVGClassName] = useState('svg_css')
    const [counter_classname, setCounterClassName] = useState('counter_css')
    const [state_change_exercise, setState_Change_Exercise] = useState(false)
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
        // api.post('/training', {data:results, kind_exercise:stateResultData.kind_exercise, state_change_exercise:state_change_exercise})
        api.post('/webcam_model', {data:results, kind_exercise:stateResultData.kind_exercise, state_change_exercise:state_change_exercise})
            .then((res) => {
                const newdata = res.data.data.poseLandmarks[0]
                // const newdata = res.data
                
                console.log(newdata)
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

        if (stateResultData.btnStateStart === true) {
            videoRef.current.play()
            var myInterval = setInterval(() => {
                const video = videoRef.current;
                if (video)
                    poseRef.current.send({ image: video });
            }, 200);
            return () => {
                clearInterval(myInterval);
            }
        }
    }, [stateResultData.btnStateStart])

    useEffect(() => {
        if(state_change_exercise === true) setState_Change_Exercise(false)
        else if(state_change_exercise === false) setState_Change_Exercise(true)
    }, [stateResultData.kind_exercise]);

    useEffect(() => {
        console.log(state_change_exercise)
        userPose.onResults(onResults);
        poseRef.current = userPose;
        return () => {
            poseRef.current.close();
        };
    }, [state_change_exercise])
    return (
        <>
            <video ref={videoRef} width='0px' height='0px' controls>
                <source src='video1.mp4'></source>
            </video>
            <div className='camera-main-div'>
                <div className='webcam-css'></div>
                <canvas ref={canvasRef} width='1150vw' height='670vw' style={{
                    position: 'absolute',
                    width: '60vw',
                    display: 'flex',
                    zIndex: '0'
                }}></canvas>

                <progress min='0' max='100' value={accuracy}
                    style={{
                        zIndex: '1',
                        width: '1vw',
                        height: '35vw',
                        writingMode: 'vertical-rl',
                        marginLeft: '60vw',
                        accentColor: 'aqua',
                        boxShadow: '0 0 30px 10px rgba(0, 142, 236, 0.815)'
                    }}
                ></progress>

                <button className={cambtn_classname} onClick={() => {
                    if (cambtn_classname === 'btn_camera') {
                        setCamBtnClassName('btn_camera_active')
                        setCamBtnSVGClassName('svg_css_active')
                    }
                    else {
                        setCamBtnClassName('btn_camera')
                        setCamBtnSVGClassName('svg_css')
                    }
                }}>
                    <svg
                        className={cambtnsvg_classname}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em">
                        <path
                            fillRule="evenodd"
                            d="M0 5a2 2 0 012-2h7.5a2 2 0 011.983 1.738l3.11-1.382A1 1 0 0116 4.269v7.462a1 1 0 01-1.406.913l-3.111-1.382A2 2 0 019.5 13H2a2 2 0 01-2-2V5zm11.5 5.175l3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 00-1 1v6a1 1 0 001 1h7.5a1 1 0 001-1V5a1 1 0 00-1-1H2z"
                        />
                    </svg>
                </button>
                <p className='accuracy_css_best'>{accuracy + "%"}</p>
                <div className='counter_background_css'>
                    <p className={counter_classname}>{counter}</p>
                </div>
            </div>
        </>
    )
}

export default Camera;