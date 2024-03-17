import React, { useRef, useState, useEffect, useSyncExternalStore } from 'react'
import './camera.css'
import { ReactDOM } from "react";
import * as mediapipePose from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose } from "@mediapipe/pose";
import Webcam from 'react-webcam';
import api from '../../../service/axios'
import { Analysis_exercise } from '../../function_set/analysis'
let max_accuracy = 0
let prev_accuracy = 0
function Camera({ setStateResultData, stateResultData, exerciseResult, setExerciseResult }) {
    const canvasRef = useRef(null)
    const videoRef = useRef(null)
    const poseRef = useRef(null);
    const webcamRef = useRef(null)

    const [accuracy, setAccuracy] = useState(0)
    const [counter, setCounter] = useState(0)
    const [timeTrack, setTimeTrack] = useState(0)
    const [sumAccuracy, setSumAccuracy] = useState(0)

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
        const webcamElement = webcamRef.current.video;
        const videoElement = videoRef.current;

        const canvasCtx = canvasElement.getContext("2d");

        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(webcamElement, 0, 0, canvasElement.width, canvasElement.height);

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
                    lineWidth: 0.1,
                    fillColor: 'aqua',
                    radius: '1'
                }
            );
        }

        const landmark = results.poseLandmarks
        if (landmark) {
            let state_pose = true

            for (let i = 0; i < 33; i++) {
                if (landmark[i].x > 1 ||
                    landmark[i].x < 0 ||
                    landmark[i].y > 1 ||
                    landmark[i].y < 0)
                    state_pose = false
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
        if (!iswebcamEnable) return
        if (stateResultData.btnStateStart === true) {
            videoRef.current.play()
            var myTime = setInterval(() => {
                setTimeTrack(prev => prev + 1)
            }, 1000)
            var myInterval = setInterval(() => {
                if (iswebcamEnable) {
                    const video = webcamRef.current.video
                    // const video = videoRef.current;
                    if (video)
                        poseRef.current.send({ image: video });
                }
            }, 100);
            return () => {
                clearInterval(myInterval);
                clearInterval(myTime)
                const canvasElement = canvasRef.current;
                const canvasCtx = canvasElement.getContext("2d");
                canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            }
        }
        else if (stateResultData.btnStateStart === false) {
            setTipSpeaker("Let's start Exercise!")
            const currentDay = new Date()
            const averageAccuracy = sumAccuracy / counter
            const newData = {
                year: currentDay.getFullYear(),
                month: currentDay.getMonth() + 1,
                date: currentDay.getDate(),
                day: currentDay.getDay(),
                hour: currentDay.getHours(),
                minute: currentDay.getMinutes(),
                index: stateResultData.kind_exercise.index,
                category: stateResultData.kind_exercise.category,
                exercise: stateResultData.kind_exercise.exercise,
                counter: counter,
                accuracy: averageAccuracy,
                durtime: timeTrack
            }
            setExerciseResult(newData)
        }
    }, [stateResultData.btnStateStart, iswebcamEnable])

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
        const newAccuracy = sumAccuracy + max_accuracy
        setSumAccuracy(newAccuracy)
        if (max_accuracy > 90) setTipSpeaker("Very good, keep it like this")
        else if (max_accuracy < 1) setTipSpeaker("Let's Start Exercise")
        else setTipSpeaker("Please, more correctly")
        max_accuracy = 0
    }, [counter])




    useEffect(() => {
        if (!iswebcamEnable || stateResultData.btnStateStart) {
            const canvasElement = canvasRef.current;
            const canvasCtx = canvasElement.getContext('2d');
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            return
        }
        const interval = setInterval(() => {
            const canvasElement = canvasRef.current;
            const webcamElement = webcamRef.current.video;
            const canvasCtx = canvasElement.getContext('2d');
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(webcamElement, 0, 0, canvasElement.width, canvasElement.height);

        }, 50);
        return () => clearInterval(interval);
    }, [iswebcamEnable, stateResultData.btnStateStart]);

    return (
        <div className='flex justify-center w-[100vw] h-[70vw] xl:w-[48vw] xl:h-[40vw] border rounded-xl mb-[0.5vw] ml-[1vw]'>
            <video id='unrealvideo'
                ref={videoRef}
                key={unreal_video_key}
                width='0px'
                height='10px'
                controls onEnded={() => {
                    const video = document.getElementById("unrealvideo")
                    video.currentTime = 0
                    video.play()
                }}>
                <source src={unreal_video_url}></source>
            </video>

            <div className='relative w-[90vw] h-[25vw] mt-[2vw] '>
                <p className='text-[red]'> {tipSpeaker}</p>
                <div className='relative mt-[1%] w-[100%] h-[100%] bg-black'>
                    <div className='w-[10%] h-[100%] bg-[red]'>
                        {iswebcamEnable && (
                            <Webcam className=''
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                            />
                        )
                        }
                    </div>
                    <canvas ref={canvasRef} className='absolute top-0 left-0 bg-black w-[100%]' width='770' height='480'></canvas>
                </div>

                <div className='absolute top-0 left-0 mt-[10%] w-[10%] h-[100%]'>
                    <progress className='w-[5px] h-[50vw] xl:h-[27vw]' min='0' max='100' value={accuracy}
                        style={{
                            zIndex: '1',
                            writingMode: 'vertical-rl',
                            marginTop: '1vw',
                            accentColor: 'aqua',
                            // boxShadow: '0 0 5px 5px rgba(0, 142, 236, 0.815)'
                        }}
                    ></progress>
                </div>

                <div className='flex relative w-[100%] h-[45%] xl:h-[20%] mt-[25vw] xl:mt-[-5%]'>
                    <button className='flex justify-center items-center ml-[45%] w-[8vw] h-[8vw] mt-[-6%] xl:w-[4vw] xl:h-[4vw] xl:mt-[5%] border rounded-[50%] shadow-xl
                        hover:shadow-[0_0_30px_5px_rgba(0,142,236,0.815)] duration-200'
                        onClick={async () => {
                            try {
                                await navigator.mediaDevices.getUserMedia({ video: true })
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
                            }
                            catch (err) {
                                alert("Camera is not connected")
                            }

                            iswebcamEnable === true ? setWebCamEnable(false) : setWebCamEnable(true)
                            // if (cambtn_classname === 'btn_camera') {
                            //     setCamBtnClassName('btn_camera_active')
                            //     setWebCamEnable(true)
                            // }
                            // else {
                            //     setCamBtnClassName('btn_camera')
                            //     setCamBtnSVGClassName('svg_css')
                            //     setWebCamEnable(false)
                            // }
                        }}>
                        <svg className={`${iswebcamEnable === true ? 'fill-[red]' : 'fill-[white]'} duration-500`}
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

                </div>

                <div className='flex justify-between items-center w-[100%] h-[30%] mt-[3%]'>
                    <p className='text-[#5534A5] mr-[10%] ml-[10%]'>{accuracy + "  %"}</p>
                    <p className='text-[#5534A5] mr-[10%] ml-[10%]'>{counter + "  times"}</p>
                    <p className='text-[#5534A5] mr-[10%] ml-[10%]'>{timeTrack + "  s"}</p>
                </div>
            </div>
        </div>
    )
}

export default Camera;