import React, { useRef, useState, useEffect, useSyncExternalStore } from 'react'
import './camera.css'
import { ReactDOM } from "react";
import * as mediapipePose from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose } from "@mediapipe/pose";
import Webcam from 'react-webcam';
import api from '../../service/axios'
import { Analysis_exercise } from '../../function_set/analysis'
let max_accuracy = 0
let prev_accuracy = 0
function Camera({ setStateResultData, stateResultData }) {
    const canvasRef = useRef(null)
    const videoRef = useRef(null)
    const poseRef = useRef(null);
    const webcamRef = useRef(null)

    const [accuracy, setAccuracy] = useState(0)
    const [counter, setCounter] = useState(0)

    const [cambtn_classname, setCamBtnClassName] = useState('btn_camera')
    const [cambtnsvg_classname, setCamBtnSVGClassName] = useState('svg_css')
    const [counter_classname, setCounterClassName] = useState('counter_css')
    const [tipSpeaker, setTipSpeaker] = useState('')
    const [calc_result, setCalcResult] = useState({
        accuracy: '',
        counter: '',
        state: false
    })

    const [state_change_exercise, setState_Change_Exercise] = useState(false)
    const [iswebcamEnable, setWebCamEnable] = useState(false)

    const [unreal_video_key, setUnrealVideoKey] = useState(0)
    const [unreal_video_url, setUnrealVideoUrl] = useState('')

    const onResults = (results) => {
        const canvasElement = canvasRef.current;
        // const webcamElement = webcamRef.current.video;
        const videoElement = videoRef.current;

        const canvasCtx = canvasElement.getContext("2d");

        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        // canvasCtx.drawImage(webcamElement, 0, 0, canvasElement.width, canvasElement.height);

        if (results.poseLandmarks) {
            drawConnectors(canvasCtx,
                results.poseLandmarks,
                mediapipePose.POSE_CONNECTIONS,
                { color: 'aqua', lineWidth: 1.5 }
            );

            drawLandmarks(canvasCtx,
                results.poseLandmarks,
                // [results.poseLandmarks[25], results.poseLandmarks[23], results.poseLandmarks[11]],
                {
                    color: 'gray',
                    lineWidth: 1,
                    fillColor: 'aqua',
                    radius: '3'
                }
            );
        }

        const landmark = results.poseLandmarks
        if (landmark) {
            let state_pose = false

            for (let i = 0; i < 33; i++) {
                if (landmark[i].x < 1 &&
                    landmark[i].x > 0 &&
                    landmark[i].y < 1 &&
                    landmark[i].y > 0)
                    state_pose = true
            }

            if (state_pose === true) {
                const new_calc_data = {
                    pose_data: results,
                    kind_exercise: stateResultData.kind_exercise,
                    state_change_exercise: state_change_exercise
                }
                // const result = Analysis_exercise(new_calc_data)
                setCalcResult(Analysis_exercise(new_calc_data));
            }
            else {
                setTipSpeaker("Your entire body must be in camera")
            }
        }
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

        if (stateResultData.btnStateStart === true && iswebcamEnable) {
            videoRef.current.play()

            var timeTracker = setInterval( () => {
                setTimeTrack(prev => prev +)
            }, 1000)

            var myInterval = setInterval(() => {
                if (iswebcamEnable) {
                    // const video = webcamRef.current.video
                    const video = videoRef.current;
                    if (video)
                        poseRef.current.send({ image: video });
                }
            }, 150);
            return () => {
                clearInterval(myInterval);
                clearInterval(timeTracker)
                const canvasElement = canvasRef.current;
                const canvasCtx = canvasElement.getContext("2d");
                canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            }
        }
        else if (stateResultData.btnStateStart === false)
            setTipSpeaker("Let's start Exercise!")
    }, [stateResultData.btnStateStart])

    useEffect(() => {
        const category = stateResultData.kind_exercise.category
        const exercise = stateResultData.kind_exercise.exercise
        const index = stateResultData.kind_exercise.index
        setUnrealVideoUrl(`video/${index}/${category}/${exercise}.mp4`)
        // setUnrealVideoUrl(`video/Exercise_2/Stretches/abdominal-stretch.mp4`)
        if (state_change_exercise === true) setState_Change_Exercise(false)
        else if (state_change_exercise === false) setState_Change_Exercise(true)
    }, [stateResultData.kind_exercise]);

    useEffect(() => {
        userPose.onResults(onResults);
        poseRef.current = userPose;
        return () => {
            poseRef.current.close();
        };
    }, [state_change_exercise])

    useEffect(() => {
        const new_data = { ...stateResultData, iswebcamEnable: iswebcamEnable }
        setStateResultData(new_data)
    }, [iswebcamEnable])

    useEffect(() => {
        setUnrealVideoKey(prev => prev + 1)
    }, [unreal_video_url])

    useEffect(() => {
        prev_accuracy = calc_result.accuracy

        if (max_accuracy < prev_accuracy) {
            max_accuracy = prev_accuracy
        }
        setAccuracy(calc_result.accuracy)
        setCounter(calc_result.counter)
    }, [calc_result])


    useEffect(() => {
        if (max_accuracy > 90) setTipSpeaker("Very good, keep it like this")
        else if (max_accuracy < 1) setTipSpeaker("Let's Start Exercise")
        else setTipSpeaker("Please, more correctly")
        max_accuracy = 0
    }, [counter])

    return (
        <>
            <video id='unrealvideo'
                ref={videoRef}
                key={unreal_video_key}
                width='100px'
                height='100px'
                controls onEnded={() => {
                    const video = document.getElementById("unrealvideo")
                    video.currentTime = 0
                    video.play()
                }}>
                <source src={unreal_video_url}></source>
            </video>

            <div className='camera-main-div'>
                <div className='webcam-div-css'>

                    {iswebcamEnable && (
                        <Webcam className='webcam-css'
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                        />
                    )
                    }

                </div>

                <canvas ref={canvasRef} width='950vw' height='670vw' style={{
                    position: 'absolute',
                    width: '47vw',
                    height: "35vw",
                    marginLeft: '12vw',
                    marginTop: '-1vw',
                    display: 'flex',
                    zIndex: '0',
                }}></canvas>
                <p style={{
                    color: "red",
                    zIndex: '0'
                }}> {tipSpeaker}</p>
                <progress min='0' max='100' value={accuracy}
                    style={{
                        zIndex: '1',
                        width: '1vw',
                        height: '35vw',
                        writingMode: 'vertical-rl',
                        marginLeft: '5vw',
                        marginTop: '-4vw',
                        accentColor: 'red   ',
                        boxShadow: '0 0 30px 10px rgba(0, 142, 236, 0.815)'
                    }}
                ></progress>

                <button className={cambtn_classname} onClick={async () => {
                    // try {
                    //     await navigator.mediaDevices.getUserMedia({ video: true })
                    //     if (cambtn_classname === 'btn_camera') {
                    //         setCamBtnClassName('btn_camera_active')
                    //         setCamBtnSVGClassName('svg_css_active')
                    //         setWebCamEnable(true)
                    //     }
                    //     else {
                    //         setCamBtnClassName('btn_camera')
                    //         setCamBtnSVGClassName('svg_css')
                    //         setWebCamEnable(false)
                    //     }
                    // }
                    // catch (err) {
                    //     alert("Camera is not connected")
                    // }
                    if (cambtn_classname === 'btn_camera') {
                        setCamBtnClassName('btn_camera_active')
                        setCamBtnSVGClassName('svg_css_active')
                        setWebCamEnable(true)
                    }
                    else {
                        setCamBtnClassName('btn_camera')
                        setCamBtnSVGClassName('svg_css')
                        setWebCamEnable(false)
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
                            d="M0 5a2 2 0 012-2h7.5a2 2 0 011.983 1.738l3.11-1.382A1 1 
                            0 0116 4.269v7.462a1 1 0 01-1.406.913l-3.111-1.382A2 2 
                            0 019.5 13H2a2 2 0 01-2-2V5zm11.5 5.175l3.5 1.556V4.269l-3.5 
                            1.556v4.35zM2 4a1 1 0 00-1 1v6a1 1 0 001 
                            1h7.5a1 1 0 001-1V5a1 1 0 00-1-1H2z"
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