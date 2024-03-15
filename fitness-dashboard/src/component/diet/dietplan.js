import React, { useEffect, useState } from "react";
import DietCalendar from './dietcalendar.js'
import DietDaily from './dietdaily.js'
import api from '../../service/axios.js'
function    DietPlan({ email, password }) {

    const [dietPlan, setDietPlan] = useState({
        year: '',
        month: '',
        date: '',
        day: '',
        food: {
            breakfast: [],
            lunch: [],
            dinner: [],
            snack1: [],
            snack2: []
        },
    })

    useEffect(() => {
        if(dietPlan.year === '') return
        
        const localEmail = localStorage.getItem("fitnessemail")
        const localPassword = localStorage.getItem("fitnesspassword")
        const header = {
            email: localEmail,
            password: localPassword
        }

        const getData = {
            year: dietPlan.year,
            month: dietPlan.month,
            date: dietPlan.date,
            day: dietPlan.day
        }
        api.get("/getdiet", {
            params: {
                header: header,
                getData: getData
            }
        }).then((res) => {
            const message = res.data.message
            if (message === 'success') {
                const result = res.data.result
                const newData = {
                    ...dietPlan,
                    food: {
                        breakfast: result.meal.breakfast,
                        lunch: result.meal.lunch,
                        dinner: result.meal.dinner,
                        snack1: result.meal.snack1,
                        snack2: result.meal.snack2
                    }
                }
                setDietPlan(newData)
            } else {
                const newData = {
                    ...dietPlan,
                    food: {
                        breakfast: [],
                        lunch: [],
                        dinner: [],
                        snack1: [],
                        snack2: []
                    }
                }
                setDietPlan(newData)
            }
        })

    }, [dietPlan.day])

    return (
        <div className="border rounded-xl h-[200%] w-[100%] xl:h-[81%] mt-[2%] md:mt-[0px]">
            <DietCalendar dietPlan={dietPlan} setDietPlan={setDietPlan} email={email} password={password} />
            <DietDaily dietPlan={dietPlan} setDietPlan={setDietPlan} email={email} password={password} />   
        </div>
    )


}

export default DietPlan