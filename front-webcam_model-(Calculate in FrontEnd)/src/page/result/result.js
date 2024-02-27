import React, { useEffect, useRef, useState } from "react";
import './Result.css'
import api from '../../service/axios'
import { isDisabled } from "@testing-library/user-event/dist/utils";
function Result({ setStateResultData, stateResultData }) {
    const [videokey, setVideoKey] = useState(0)
    const [accuracy, setAccuracy] = useState(0)
    const [btn_name, setBtnName] = useState('Start')
    const [isSelectDisabled, setIsSelectDisabled] = useState(false);
    const [sampleVideoURL, setSampleVideo] = useState('')
    const [number_category, setNumberCategory] = useState('')
    const [number_exercise, setNumberExercise] = useState('')
    const [iswebcamEnable, setWebCamEnable] = useState(false)
    const selectCategoryRef = useRef(null)
    const selectExerciseRef = useRef(null)

    const select_kind_exercise = [
        'exercise_1',
        'exercise_2',
        'exercise_3',
        'exercise_4',
        'exercise_5',
        'exercise_6',
        'exercise_7',
        'exercise_8',
        'exercise_9',
        'exercise_10',
    ]

    const select_exercise_category = [
        'House',
        'Gym'
    ]

    useEffect(() => {
        const category = selectCategoryRef.current.value
        const exercise = selectExerciseRef.current.value
        console.log("OK!!!!!!!!!!!!!!!!")
        const json_exercsise = {
            category: category,
            exercise: exercise
        }
        const new_data = { ...stateResultData, kind_exercise: json_exercsise }
        setStateResultData(new_data)
        if (exercise !== 'Select Exercise') {
            api.get('/video_load', { params: { category: category, exercise: exercise }, responseType: 'blob' })
                .then(res => {
                    const blob = new Blob([res.data], { type: res.data.type });
                    setSampleVideo(URL.createObjectURL(blob));
                })
                .catch(err => {
                })
        }
    }, [number_category, number_exercise])

    useEffect(() => {
        setVideoKey(prev => prev + 1)
    }, [sampleVideoURL])

    useEffect(() => {
        setWebCamEnable(stateResultData.iswebcamEnable)
    }, [stateResultData.iswebcamEnable])

    return (
        <div className="result_main">

            <video id='samplevideo' className="videoPlay_css" key={videokey} autoPlay={true} controls width='500vm' height='400vm' onEnded={() => {
                const video = document.getElementById('samplevideo')
                video.currentTime = 0;
                video.play()
            }}>
                <source src={sampleVideoURL} type="video/mp4"></source>
            </video>

            <div className="d-flex justify-content-center align-itmes-center">

                <select ref={selectCategoryRef} disabled={isSelectDisabled} className="form-control category_css" onChange={(e) => {
                    setNumberCategory(e.target.value)
                }}>
                    {
                        select_exercise_category.map((item, index) => ((
                            <option>{item}</option>
                        )))
                    }
                </select>

                <select ref={selectExerciseRef} disabled={isSelectDisabled} className="form-control exercise_css" onChange={(e) => {
                    setNumberExercise(e.target.value)
                }}>
                    {
                        select_kind_exercise.map((item, index) => ((
                            <option>{item}</option>
                        )))
                    }
                </select>

            </div>

            <button className="btn_start" onClick={(e) => {
                if (isSelectDisabled === true)
                    setIsSelectDisabled(false)
                else
                    setIsSelectDisabled(true)

                if (iswebcamEnable === true) {
                    if (stateResultData.btnStateStart === false) {
                        setBtnName("Stop")
                        const new_data = { ...stateResultData, btnStateStart: true }
                        setStateResultData(new_data)
                    }

                    else {
                        const new_data = { ...stateResultData, btnStateStart: false }
                        setStateResultData(new_data)
                        setBtnName("Start")
                    }
                }

                else {
                    alert("Please Turn on Camera")
                }
            }}>
                {btn_name}
            </button>

        </div>
    )
}

export default Result;