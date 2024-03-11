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
        <div className="flex flex-col justify-center items-center w-[100%] h-[20%]">
            <div className="flex w-[70%] h-[100%] justify-center items-center mt-1 ">
                {
                    daysOfWeek.map((item, index) => (
                        <button className={`flex justify-center items-center w-[40%] h-[70%] ${index === accidentID ? 'bg-[#5534A5]' : 'bg-[#F1EEF6]'} 
                    border rounded-lg mr-4 ml-4 duration-500 hover:shadow-2xl`}
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
                                <p className={`${index === accidentID ? 'text-[white]' : 'text-[#5534A5]'} text-[15px] mt-[20%]`}>{month[index] + '/' + date[index]}</p>
                                <p className={`${index === accidentID ? 'text-[white]' : 'text-[#5534A5]'} text-[25px] mt-[-20%]`}>{item}</p>
                            </div>
                        </button>
                    ))
                }
            </div>
            <div className="w-[80%] h-[1%] bg-[#5534A5]"></div>
        </div>
    )
}

export default DietCalendar

