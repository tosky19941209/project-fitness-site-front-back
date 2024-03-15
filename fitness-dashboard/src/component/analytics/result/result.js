import React, { useEffect, useRef, useState } from "react";
import './Result.css'
import api from '../../../service/axios'
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { kind_select } from './select_kind_exercise'
import toastr from "toastr";
function Result({ setStateResultData, stateResultData, exerciseResult, setExerciseResult }) {
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

    const setSaveExercise = (e) => {
        if (exerciseResult.durtime === '') return
        if (exerciseResult.index === '') return
        const header = {
            email: localStorage.getItem('fitnessemail'),
            password: localStorage.getItem('fitnesspassword')
        }
        const updateData = exerciseResult
        api.post('/setlogs', { header: header, updateData: updateData })
            .then((res) => {
                if (res.data.message === 'success')
                    toastr.success("Save successfully!")
            })

    }
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
        <div className="flex flex-col items-center xl:justify-center
                        w-[90vw] h-[160vw] ml-[1vw] mt-[60vw]
                        md:w-[90vw] md:h-[150vw] md:mt-[50vw]
                        xl:w-[30vw] xl:h-[40vw] xl:mt-[-1%] xl:ml-[10px]
                        border rounded-xl">

            <div className="flex xl:flex-col justify-center items-center w-[80%] xl:h-[56%]">
                
                <video id='samplevideo' className="w-[50%] xl:w-[100%] xl:ml-[0px] " key={videokey} autoPlay={true} controls width='80%' height='80%' onEnded={() => {
                    const video = document.getElementById('samplevideo')
                    video.currentTime = 0;
                    video.play()
                }}>
                    <source src={sampleVideoURL} type="video/mp4"></source>
                </video>
                <div className="flex flex-col xl:flex-row justify-center items-center 
                                w-[80%] h-[100%]
                                xl:w-[100%]">
                    <button className="w-[90%] h-[30%] mt-2 mb-2 border-solid border-1 border-[#A85CF9] rounded-xl text-[black] hover:bg-[#5534A5] hover:text-[white] duration-300"
                        onClick={setSaveExercise}>
                        save
                    </button>


                    <button className="w-[90%] h-[30%] mt-2 mb-2 border-solid border-1 border-[#A85CF9] rounded-xl text-[black] hover:bg-[#5534A5] hover:text-[white] duration-300" onClick={(e) => {
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
            </div>




            <select ref={selectKindIndexRef} disabled={isSelectDisabled} className="form-control"
                style={{
                    width: "80%",
                    marginTop: "2vw"
                }}
                onChange={(e) => {
                    setNumberKindIndex(e.target.value)
                }}>
                {
                    se_kind_index.map((item, index) => ((
                        <option>{item}</option>
                    )))
                }
            </select>

            <select ref={selectCategoryRef} disabled={isSelectDisabled} className="form-control"
                style={{
                    width: "80%",
                    marginTop: "2vw"
                }}
                onChange={(e) => {
                    setNumberCategory(e.target.value)
                }}>
                {
                    se_kind_category.map((item, index) => ((
                        <option>{item}</option>
                    )))
                }
            </select>

            <select ref={selectExerciseRef} disabled={isSelectDisabled} className="form-control"
                style={{
                    width: "80%",
                    marginTop: "2vw"
                }}
                onChange={(e) => {
                    setNumberExercise(e.target.value)
                }}>
                {
                    se_kind_exercise.map((item, index) => ((
                        <option>{item}</option>
                    )))
                }
            </select>
        </div>
    )
}

export default Result;