import React, { useEffect, useRef, useState } from "react";
import './Result.css'
import api from '../../service/axios'
function Result({ setStateResultData, stateResultData }) {
    const [videokey, setVideoKey] = useState(0)
    const [accuracy, setAccuracy] = useState(0)
    const [btn_name, setBtnName] = useState('Start')
    const [isSelectDisabled, setIsSelectDisabled] = useState(false);
    const [sampleVideoURL, setSampleVideo] = useState('')
    const [number_category, setNumberCategory] = useState('')
    const [number_exercise, setNumberExercise] = useState('')
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
        'Gym',
        'House'
    ]

    useEffect(() => {
        const category = selectCategoryRef.current.value
        const exercise = selectExerciseRef.current.value
        api.get('changed_exercise', {params:{}})
        .then(res => {
        })

        if (exercise !== 'Select Exercise') {
            api.get('/video_load', { params: { category: category, exercise: exercise }, responseType: 'blob' })
                .then(res => {
                    const blob = new Blob([res.data], { type: res.data.type });
                    setSampleVideo(URL.createObjectURL(blob));
                })
                .catch(err => {
                    console.log("Error is occur", err)
                })
        }
    }, [number_category, number_exercise])

    useEffect(() => {
        setVideoKey(prev => prev + 1)
    }, [sampleVideoURL])

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

                <select ref={selectCategoryRef} disabled={isSelectDisabled} className="form-control category_exercise_css" onChange={(e) => {
                    setNumberCategory(e.target.value)
                    // const newData = { ...stateResultData, kind_exercise: { ...stateResultData.kind_exercise, category: e.target.value } }
                    // setStateResultData(newData)
                }}>
                    {
                        select_exercise_category.map((item, index) => ((
                            <option>{item}</option>
                        )))
                    }
                </select>

                <select ref={selectExerciseRef} disabled={isSelectDisabled} className="form-control category_exercise_css" onChange={(e) => {
                    setNumberExercise(e.target.value)
                    // const newData = { ...stateResultData, kind_exercise: { ...stateResultData.kind_exercise, exercise_number: e.target.value } }
                    // setStateResultData(newData)
                }}>
                    {
                        select_kind_exercise.map((item, index) => ((
                            <option>{item}</option>
                        )))
                    }
                </select>

            </div>

            <button className="btn_start" onClick={(e) => {
                setIsSelectDisabled(!isSelectDisabled)
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
            }}>
                {btn_name}
            </button>

        </div>
    )
}

export default Result;