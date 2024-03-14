import React, { useEffect, useState } from "react";
import MUIChart from './mui-chart'
import Result from "./result";
import api from '../../service/axios'
function Chart() {
    const [history, setHistory] = useState(null)

    const today = new Date();
    const dayOfWeek = today.getDay();
    const [accidentID, setAccidentID] = useState(dayOfWeek)

    const date = []
    const month = []
    const year = []

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date();
        const futureDate = new Date(currentDate.setDate(currentDate.getDate() - dayOfWeek + i));
        date.push(futureDate.getDate())
        month.push(futureDate.getMonth() + 1)
        year.push(futureDate.getFullYear())
    }

    useEffect(() => {
        if (year === '') return
        const header = {
            email: localStorage.getItem("fitnessemail"),
            password: localStorage.getItem("fitnesspassword")
        }
        const updateData = {
            year: year,
            month: month,
            date: date
        }
        api.get('/getweeklyhistory', { params: { header: header, updateData: updateData } })
            .then((res) => {
                setHistory(res.data)
            })
    }, [])

    return (
        <div className="flex flex-col w-[95%] h-[90%] mt-10 ml-5 items-center 
                        min-[1500px]:flex-row min-[1500px]:h-[90%]">
            <div className="w-[90%] h-[40%] mt-[2%]
                            min-[1500px]:w-[65%] min-[1500px]:h-[80%]">
                <MUIChart history={history} />
            </div>

            <div className="flex justify-center items-center 
                            w-[95%] h-[50%] mt-[4%]
                            min-[1500px]:w-[35%] min-[1500px]:h-[80%]">
                <Result history={history} />
            </div>
        </div>
    )
}

export default Chart