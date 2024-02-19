import React, { useEffect, useState } from "react";
import './Result.css'
function Result() {
    const [videokey, setVideoKey] = useState(0)
    const [accuracy, setAccuracy] = useState(90)
    const [kind_exercise, setKindExercise] = useState({
        category:'Gym',
        exercise_kind:'exercise_1'
    })
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


    useEffect( () => {
        console.log(kind_exercise)
    }, [kind_exercise])
    return (

        <div className="result_main">
            <video className="videoPlay_css" key={videokey} controls width='500vm' height='400vm'>
                <source src="video1.mp4" type="video/mp4"></source>
            </video>
            <div className="d-flex justify-content-center align-itmes-center">
                <select className="form-control category_exercise_css" onChange={(e) => {
                    const newData = {...kind_exercise, category:e.target.value}
                    setKindExercise(newData)
                }}>
                    {
                        select_exercise_category.map((item, index) => ((
                            <option>{item}</option>
                        )))
                    }
                </select>

                <select className="form-control category_exercise_css" onChange={(e) => {
                    const newData = {...kind_exercise, exercise_kind:e.target.value}
                    setKindExercise(newData)
                }}>
                    {
                        select_kind_exercise.map((item, index) => ((
                            <option>{item}</option>
                        )))
                    }
                </select>
            </div>
            <button className="btn_start">
                Start
            </button>
        </div>

    )
}

export default Result;