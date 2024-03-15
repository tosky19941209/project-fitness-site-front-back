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
        if (planData.year === '') return
        const localEmail = localStorage.getItem("fitnessemail")
        const localPassword = localStorage.getItem("fitnesspassword")
        const header = {
            email: localEmail,
            password: localPassword
        }
        const getData = {
            year: planData.year,
            month: planData.month,
            date: planData.date,
            day: planData.day
        }

        api.get("/getexercise", { params: { header: header, getData: getData } })
            .then((res) => {
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
        <div className="flex flex-col xl:flex-row w-[100%] h-[250%] md:h-[200%] xl:h-[83%]">

            <div className="w-[90%] h-[40%] mt-[1%] xl:w-[40%] xl:h-[100%] ml-[5%] mr-[1%] xl:ml-[2%]">
                <FitnessCalendar planData={planData} setPlanData={setPlanData} />
                <FitnessPlan planData={planData} setPlanData={setPlanData} email={email} password={password} />
            </div>

            <div className="w-[90%] h-[40%] mr-[2%] ml-[5%]   xl:w-[60%] xl:h-[100%] xl:ml-[2%]">

                <div className="flex flex-col md:flex-row w-[100%] h-[50%] xl:w-[100%] xl:h-[40%] mt-[-36%] md:mt-[-18%] xl:mt-[0px]">
                    <div className="flex flex-col w-[100%] md:w-[40%] h-[90%] mr-[2%] mt-[2%] mb-[2%]">
                        <FitnessGoal />
                        <TotalTime />
                    </div>

                    <div className="flex w-[100%] md:w-[56%] h-[90%] md:ml-[2%] md:mt-[2%] border rounded-xl">
                        <TotalProgress />
                    </div>
                </div>

                <div className="flex justify-center items-center w-[100%] h-[60%] xl:w-[100%] xl:h-[60%] border rounded-xl mt-2">
                    <Chart />
                </div>
            </div>
        </div>
    )
}

export default FitnessAnalytics