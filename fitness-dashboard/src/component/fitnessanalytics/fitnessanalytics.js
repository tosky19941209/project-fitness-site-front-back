import React, { useEffect, useState } from "react";
import FitnessGoal from "./fitnessgoal";
import FitnessPlan from "./fitnessplan";
import FitnessCalendar from "./fitnesscalendar";
import TotalTime from './totaltime'
import TotalProgress from "./totalprogress";
import Chart from "./chart";
import Header from './header.js'

function FitnessAnalytics() {

    const [planData, setPlanData] = useState({
        year: '',
        month: '',
        date: '',
        day: '',
        exerciseType: [
            'Running',
            'Core Training'
        ],
        exerciseTime: [
            '06:00-08:00',
            '03:00-10:00'
        ]
    })

    // useEffect(() => {
    //     console.log("edited: ",planData)
    // }, [planData])

    return (

        <div className="flex bg-white-300 w-[100%] h-[80%] mt-8">
            <div className="w-3/12 h-5/6 ml-10 mt-3">
                <FitnessCalendar planData={planData} setPlanData={setPlanData} />
                <FitnessPlan planData={planData} setPlanData={setPlanData} />
            </div>

            <div className="w-[70%] h-full flex flex-col">

                <div className="flex w-[100%] h-[30%] justify-center items-center ">
                    <div className="flex flex-col justify-center items-center w-[50%] h-[90%]">
                        <FitnessGoal />
                        <TotalTime />
                    </div>
                    <TotalProgress />
                </div>

                <div className="flex border rounded-xl w-[95%] h-[70%] mt-[1%] ml-[5%] ">
                    <Chart />
                </div>
            </div>
        </div>
    )
}

export default FitnessAnalytics