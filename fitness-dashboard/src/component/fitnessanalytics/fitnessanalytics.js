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
        <div className="flex flex-col justify-center w-[100%] h-[250%] 
                        min-[1000px]:flex-row  min-[1000px]:h-[85%]">

            <div className="w-[90%] h-[40%] ml-5
                            min-[1000px]:w-[40%] min-[1000px]:h-[100%] ">
                <FitnessCalendar planData={planData} setPlanData={setPlanData} />
                <FitnessPlan planData={planData} setPlanData={setPlanData} email={email} password={password} />
            </div>

            <div className="w-[90%] h-[155%] 
                            mt-5 ml-2
                            sm:mt-5 sm:ml-2
                            min-[1500px]:h-[100%] min-[1500px]:mt-[0px]
                            min-[1000px]:h-[100%] min-[1000px]:mt-[0px]
                            ">

                <div className="flex flex-col w-[103%] h-[15%]
                                 min-[1500px]:w-[100%] min-[1500px]:flex-row min-[1500px]:h-[30%]
                                 min-[1000px]:w-[100%] min-[1000px]:flex-col min-[1000px]:h-[60%]
                                 ">
                    <div className="flex flex-col items-center w-[96%] h-[100%] ml-[2%] mr-[2%] 
                                    min-[1500px]:w-[46%] min-[1500px]:mr-[2%]">
                        <FitnessGoal />
                        <TotalTime />
                    </div>

                    <div className="flex flex-col justify-center items-center w-[96%] h-[90%] ml-[2%] mt-[2%] 
                                    min-[1500px]:w-[46%] min-[1500px]:h-[100%] min-[1500px]:ml-[2%]  min-[1500px]:mt-[2px] 
                                    min-[1000px]:w-[96%] min-[1000px]:h-[90%]   
                                    border rounded-xl">
                        <TotalProgress />
                    </div>
                </div>

                <div
                    className="border rounded-xl w-[98%] h-[50%] mt-[31%] ml-[2%] 
                                min-[900px]:mt-[20%]
                                min-[1000px]:h-[95%] min-[1000px]:mt-[2%] min-[1000px]:w-[96%]
                                min-[1500px]:h-[65%] min-[1500px]:mt-[1%] min-[1500px]:w-[96%] 
                                ">
                    <Chart />
                </div>
            </div>
        </div>
    )
}

export default FitnessAnalytics