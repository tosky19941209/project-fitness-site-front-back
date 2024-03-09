import { useStepContext } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeepMountedModal from './modalplan.js'
function FitnessPlan({ planData, setPlanData }) {

    const [dailyPlan, setDailyPlan] = useState([])

    const [dailyPlanTime, setDailyPlanTime] = useState([])


    const defaultCloseBtn = 'close.png'
    const hoverCloseBtn = 'close_hover.png'
    const [imgCloseSrc, setImgCloseSrc] = useState(defaultCloseBtn)
    const [accidentID, setAccidentID] = useState(null)
    const [editPlanWidget, setEditPlanWidget] = useState(null)
    const [exerciseType, setExerciseType] = useState("")
    const [exerciseTime, setExerciseTime] = useState("")
    const [showWidget, setShowWidget] = useState(false);

    useEffect(() => {
        setDailyPlan(planData.exerciseType)
        setDailyPlanTime(planData.exerciseTime)
    }, [])

    return (
        <div className="flex flex-col border rounded-xl w-full h-[93%] items-center">
            <button className='border rounded-xl w-[50%] mt-[2%] text-[black] hover:text-[#A85CF9] text-[60%]'
                onClick={
                    (e) => {
                        setShowWidget(true)
                    }}
            >
                Add Plan
            </button>

            {showWidget &&
                <div className="flex flex-col mt-1 w-[95%] h-[30%] bg-[#F1EEF6] border rounded-xl">
                    <p className="text-[black] text-[15px] text-left mt-2">Exercise Kind</p>
                    <input className="form-control w-[20%] h-[20%] mr-1 ml-1 mt-[-5%]"
                        value={exerciseType}
                        onChange={(e) => {
                            setExerciseType(e.target.value)
                        }}
                    >
                    </input>
                    <p className="text-[black] text-[15px] text-left mt-2">Time</p>
                    <input className="form-control w-[20%] h-[20%] mr-1 ml-1 mt-[-5%]"
                        value={exerciseTime}
                        onChange={(e) => {
                            setExerciseTime(e.target.value)
                        }}
                    ></input>

                    <div className="flex justify-between">
                        <button className="text-[#5534A5] text-[18px] ml-10 mt-1"
                            onClick={(e) => {
                                const newType = dailyPlan
                                newType.push(exerciseType)
                                const newTime = dailyPlanTime
                                newTime.push(exerciseTime)

                                setDailyPlan(newType)
                                setDailyPlanTime(newTime)
                                setShowWidget(false)

                                const newData = {...planData, exerciseType:newType, exerciseTime:newTime}
                                setPlanData(newData)
                            }}
                        >
                            Add
                        </button>
                        <button className="text-[black] text-[18px] mr-10 mt-1"
                            onClick={(e) => {
                                setShowWidget(false)
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            }

            {

                dailyPlan.map((item, index) => (
                    <div className="flex border w-[94%] h-[15%] rounded-xl mt-2 justify-between">
                        <div className="w-[12px] bg-[#5534A5] rounded-xl" />
                        <div className="flex w-[94%] rounded-xl">
                            <div className="flex flex-col justify-between">
                                <p className="text-black text-left ml-5 text-[20px]">{item}</p>
                                <p className="text-[#757575] text-left ml-5 text-[15px]">{dailyPlanTime[index]}</p>
                            </div>
                        </div>
                        <div className="flex  mt-3 h-[10%]">
                            <button onClick={(e) => {
                                const newDataType = []
                                const newDataTime = []
                                let j = 0
                                for (let i = 0; i < dailyPlan.length - 1; i++) {
                                    if (dailyPlan[i] !== item)
                                        newDataType[j] = dailyPlan[i];
                                    newDataTime[j] = dailyPlanTime[i];
                                    j++
                                }
                                setDailyPlan(newDataType)
                                setDailyPlanTime(newDataTime)
                            }}>
                                <img
                                    src={index === accidentID ? 'close_hover.png' : 'close.png'}
                                    onMouseEnter={() => { setAccidentID(index) }}
                                    onMouseLeave={() => { setAccidentID(null) }}
                                    width='50px' height='10px'
                                />
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}


export default FitnessPlan