import React, { useState, useEffect } from "react";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
function DietCalendar({ dietPlan, setDietPlan }) {

    const daysOfWeek = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',

    ]

    const today = new Date();
    const dayOfWeek = today.getDay();
    const [accidentID, setAccidentID] = useState(dayOfWeek)
    const year = []
    const month = []
    const date = []
    const day = []

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date();
        const futureDate = new Date(currentDate.setDate(currentDate.getDate() - dayOfWeek + i));
        year.push(futureDate.getFullYear())
        month.push(futureDate.getMonth() + 1)
        date.push(futureDate.getDate())
    }
    useEffect(() => {
        const currentDate = new Date()
        const newData = {
            ...dietPlan,
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
            date: currentDate.getDate(),
            day: currentDate.getDay()
        }
        setDietPlan(newData)
    }, [])
    return (
        <>
            <div className="flex justify-center items-center ml-[]
                        min-[300px]:w-[90%] min-[300px]:h-[10%] min-[300px]:ml-[5%]
                        min-[720px]:w-[90%] min-[720px]:h-[10%] min-[720px]:ml-[5%]
                        min-[1000px]:w-[90%] min-[1000px]:h-[12%] min-[1000px]:ml-[5%]
                        min-[1500px]:w-[90%] min-[1500px]:h-[15%] min-[150px]:ml-[5%]">
                {
                    daysOfWeek.map((item, index) => (
                        <button className={`flex justify-center items-center w-[40%] h-[70%] ${index === accidentID ? 'bg-[#5534A5]' : 'bg-[white]'} 
                    border rounded-lg mr-1 ml-1 duration-500 hover:shadow-2xl min-[300px]:mt-[2%]`}
                            onClick={(e) => {
                                setAccidentID(index)
                                const newData = {
                                    ...dietPlan,
                                    year: year[index],
                                    month: month[index],
                                    date: date[index],
                                    day: index
                                }
                                setDietPlan(newData)
                            }}
                        >
                            <div className="flex flex-col justify-center items-center w-[80%] h-[70%]">
                                <p className={`${index === accidentID ? 'text-[white]' : 'text-[#5534A5]'} mt-[20%]
                                                min-[300px]:text-[12px] 
                                                min-[720px]:text-[12px]
                                                min-[1500px]:text-[20px] 
                                                `}>{month[index] + '/' + date[index]}</p>
                                <p className={`${index === accidentID ? 'text-[white]' : 'text-[#5534A5]'} text-[25px] mt-[-20%]
                                                min-[300px]:text-[15px]
                                                min-[720px]:text-[15px] 
                                                min-[1500px]:text-[25px] 
                                                `}>{item}</p>
                            </div>
                        </button>
                    ))
                }

            </div>
            <div className="w-[80%] h-[2px] bg-[#5534A5]
                    min-[300px]:w-[96%] min-[300px]:ml-[2%]
                    min-[720px]:w-[96%] min-[720px]:ml-[2%]
                    min-[1000px]:w-[92%] min-[1000px]:ml-[4%]
                    min-[1500px]:w-[92%] min-[1500px]:ml-[4%]"></div>
        </>
    )
}

export default DietCalendar

