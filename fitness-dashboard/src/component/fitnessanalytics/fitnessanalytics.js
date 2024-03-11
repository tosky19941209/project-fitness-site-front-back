import React, { useEffect, useState } from "react";
import FitnessGoal from "./fitnessgoal";
import FitnessPlan from "./fitnessplan";
import FitnessCalendar from "./fitnesscalendar";
import TotalTime from './totaltime'
import TotalProgress from "./totalprogress";
import Chart from "./chart";
import api from '../../service/axios.js'

function FitnessAnalytics({ email, password }) {

    const [planData, setPlanData] = useState({
        year: '',
        month: '',
        date: '',
        day: '',
        exerciseType: [],
        exerciseTime: []
    })


    useEffect(() => {
        if(planData.year === '') return
        const header = {
            email: email,
            password: password
        }
        const getData = {
            year: planData.year,
            month: planData.month,
            date: planData.date,
            day: planData.day
        }
        console.log("sended")

        api.get("/getexercise", {
            params: {
                header: header,
                getData: getData
            }
        }).then((res) => {
            const message = res.data.message
            if (message === 'success') {
                const result = res.data.result
                const newData = {
                    ...planData,
                    exerciseType: result.exerciseType.exerciseName,
                    exerciseTime: result.exerciseType.exerciseTime
                }
                setPlanData(newData)
            } else {
                const newData = {
                    ...planData,
                    exerciseType: [],
                    exerciseTime: []
                }
                setPlanData(newData)
            }
        })

    }, [planData.day])



    return (
        <div className="flex bg-white-300 w-[100%] h-[80%] mt-8">

            <div className="w-3/12 h-5/6 ml-10 mt-3">
                <FitnessCalendar planData={planData} setPlanData={setPlanData} />
                <FitnessPlan planData={planData} setPlanData={setPlanData} email={email} password={password} />
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