import React, { useEffect, useState } from "react";
import DietCalendar from './dietcalendar.js'
import DietDaily from './dietdaily.js'
import api from '../../service/axios.js'
function DietPlan() {

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
        amount: {
            breakfast: [],
            lunch: [],
            dinner: [],
            snack1: [],
            snack2: []
        },
        dietMenu: {
            foodName: [],
            kcal: [],
            protein: [],
            water: [],
            mineral: []
        }
    })

    useEffect(() => {
        console.log('amount',dietPlan.amount)
        console.log('food',dietPlan.food)
    }, [dietPlan.amount])
    
    useEffect(() => {
        if (dietPlan.year === '') return

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
            const result = res.data.result
            console.log(result)
            if (message === 'success') {
                const newData = {
                    ...dietPlan,
                    food: {
                        breakfast: result.plandiet.meal.breakfast,
                        lunch: result.plandiet.meal.lunch,
                        dinner: result.plandiet.meal.dinner,
                        snack1: result.plandiet.meal.snack1,
                        snack2: result.plandiet.meal.snack2
                    },
                    amount: {
                        breakfast: result.plandiet.amount.breakfast,
                        lunch: result.plandiet.amount.lunch,
                        dinner: result.plandiet.amount.dinner,
                        snack1: result.plandiet.amount.snack1,
                        snack2: result.plandiet.amount.snack2
                    },
                    dietMenu: {
                        foodName: result.dietMenu.foodName,
                        kcal: result.dietMenu.kcal,
                        protein: result.dietMenu.protein,
                        water: result.dietMenu.water,
                        mineral: result.dietMenu.mineral
                    }
                }
                console.log(newData)
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
                    },
                    amount: {
                        breakfast: [],
                        lunch: [],
                        dinner: [],
                        snack1: [],
                        snack2: []
                    },
                    dietMenu: {
                        foodName: result.dietMenu.foodName,
                        kcal: result.dietMenu.kcal,
                        protein: result.dietMenu.protein,
                        water: result.dietMenu.water,
                        mineral: result.dietMenu.mineral
                    }
                }
                setDietPlan(newData)
            }
        })

    }, [dietPlan.day])

    return (
        <div className="border rounded-xl w-[100%] pb-[20px] mt-[2%] md:mt-[0px]">
            <DietCalendar dietPlan={dietPlan} setDietPlan={setDietPlan} />
            <DietDaily dietPlan={dietPlan} setDietPlan={setDietPlan} />
        </div>
    )


}

export default DietPlan