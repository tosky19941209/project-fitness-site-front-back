import React, { useEffect, useRef, useState } from "react";
import './Result.css'
import api from '../../service/axios'
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { kind_select } from './select_kind_exercise'
function Result({ setStateResultData, stateResultData }) {
    const [videokey, setVideoKey] = useState(0)
    const [accuracy, setAccuracy] = useState(0)
    const [btn_name, setBtnName] = useState('Start')
    const [isSelectDisabled, setIsSelectDisabled] = useState(false);
    const [sampleVideoURL, setSampleVideo] = useState('')
    const [number_category, setNumberCategory] = useState('')
    const [number_exercise, setNumberExercise] = useState('')
    const [number_kind_index, setNumberKindIndex] = useState('')
    const [iswebcamEnable, setWebCamEnable] = useState(false)
    const selectCategoryRef = useRef(null)
    const selectExerciseRef = useRef(null)
    const selectKindIndexRef = useRef(null)

    const [se_kind_index, setKindIndex] = useState([])
    const [se_kind_category, setKindCategory] = useState([])
    const [se_kind_exercise, setKindExercise] = useState([])


    useEffect(() => {
        const category = selectCategoryRef.current.value
        const exercise = selectExerciseRef.current.value
        const index = selectKindIndexRef.current.value

        if (category !== '', exercise !== '', index !== '') {
            const json_exercsise = {
                category: category,
                exercise: exercise,
                index: index
            }
            const new_data = { ...stateResultData, kind_exercise: json_exercsise }
            setStateResultData(new_data)
            if (exercise !== 'Select Exercise') {
                api.get('/video_load', { params: { category: category, exercise: exercise, index: index }, responseType: 'blob' })
                    .then(res => {
                        const blob = new Blob([res.data], { type: res.data.type });
                        setSampleVideo(URL.createObjectURL(blob));
                    })
                    .catch(err => {
                    })
            }

        }
    }, [number_category, number_exercise, number_kind_index])

    useEffect(() => {
        const category = selectCategoryRef.current.value
        const exercise = selectExerciseRef.current.value
        const index = selectKindIndexRef.current.value

        const json_exercsise = {
            index: index,
            category: category,
            exercise: exercise
        }
        if (category !== '', exercise !== '', index !== '') {
            const new_data = { ...stateResultData, kind_exercise: json_exercsise }
            setStateResultData(new_data)
            if (exercise !== 'Select Exercise') {
                api.get('/video_load', { params: { category: category, exercise: exercise, index: index }, responseType: 'blob' })
                    .then(res => {
                        const blob = new Blob([res.data], { type: res.data.type });
                        setSampleVideo(URL.createObjectURL(blob));
                    })
                    .catch(err => {
                    })
            }
        }
    }, [se_kind_index, se_kind_category, se_kind_exercise])

    useEffect(() => {
        setVideoKey(prev => prev + 1)
    }, [sampleVideoURL])

    useEffect(() => {
        setWebCamEnable(stateResultData.iswebcamEnable)
    }, [stateResultData.iswebcamEnable])

    useEffect(() => {
        setKindIndex(kind_select.kind_index)
        setKindCategory(kind_select.kind_category)
        setKindExercise(kind_select.kind_exercise)
    }, [])

    return (
        <div className="result_main">

            <video id='samplevideo' className="videoPlay_css" key={videokey} autoPlay={true} controls width='500vm' height='400vm' onEnded={() => {
                const video = document.getElementById('samplevideo')
                video.currentTime = 0;
                video.play()
            }}>
                <source src={sampleVideoURL} type="video/mp4"></source>
            </video>



            <div className=" justify-content-center align-itmes-center">

                <select ref={selectKindIndexRef} disabled={isSelectDisabled} className="form-control kind_index_css" onChange={(e) => {
                    setNumberKindIndex(e.target.value)
                }}>
                    {
                        se_kind_index.map((item, index) => ((
                            <option>{item}</option>
                        )))
                    }
                </select>

                <select ref={selectCategoryRef} disabled={isSelectDisabled} className="form-control category_css" onChange={(e) => {
                    setNumberCategory(e.target.value)
                }}>
                    {
                        se_kind_category.map((item, index) => ((
                            <option>{item}</option>
                        )))
                    }
                </select>

                <select ref={selectExerciseRef} disabled={isSelectDisabled} className="form-control exercise_css" onChange={(e) => {
                    setNumberExercise(e.target.value)
                }}>
                    {
                        se_kind_exercise.map((item, index) => ((
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