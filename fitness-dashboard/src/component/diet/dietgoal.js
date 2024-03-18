import React, { useEffect, useState } from "react";
import DietGoalPlan from "./dietgoalplan";
import DietGoalEdit from "./dietgoaledit";
import api from '../../service/axios'
import { Progress } from 'reactstrap';
function DietGoal({ dietCal, updateWeeklySignal, setUpdateWeeklySignal }) {

    const [dailyTotalKcal, setDailyTotalKcal] = useState(0)
    const [weeklyTotalKcal, setWeeklyTotalKcal] = useState(0)
    const [targetKcal, setTargetKcal] = useState(0)

    const calc_kcal = (foodName, dietMenu) => {
        return dietMenu.kcal[dietMenu.foodName.indexOf(foodName)]
    }
    const calc_protein = (foodName, dietMenu) => {
        return dietMenu.protein[dietMenu.foodName.indexOf(foodName)]
    }

    const calc_DailyTotalKcal = (dialyData) => {
        const breakfastFood = dialyData.food.breakfast
        const snack1Food = dialyData.food.snack1
        const lunchFood = dialyData.food.lunch
        const snack2Food = dialyData.food.snack2
        const dinnerFood = dialyData.food.dinner

        const breakfastAmount = dialyData.amount.breakfast
        const snack1Amount = dialyData.amount.snack1
        const lunchAmount = dialyData.amount.lunch
        const snack2Amount = dialyData.amount.snack2
        const dinnerAmount = dialyData.amount.dinner

        const dialyFoodMenu = [breakfastFood, snack1Food, lunchFood, snack2Food, dinnerFood]
        const amountMenu = [breakfastAmount, snack1Amount, lunchAmount, snack2Amount, dinnerAmount]
        const dietMenu = dialyData.dietMenu

        let myTotalKcal = 0
        dialyFoodMenu.map((item, i) => {
            item.map((itx, j) => {
                myTotalKcal = myTotalKcal + calc_kcal(itx, dietMenu) * amountMenu[i][j] / 100
            })
        })
        return myTotalKcal
    }


    const weeklyTotalCalcKcal = (data) => {
        const breakfastFood = data.meal.breakfast
        const snack1Food = data.meal.snack1
        const lunchFood = data.meal.lunch
        const snack2Food = data.meal.snack2
        const dinnerFood = data.meal.dinner

        const breakfastAmount = data.amount.breakfast
        const snack1Amount = data.amount.snack1
        const lunchAmount = data.amount.lunch
        const snack2Amount = data.amount.snack2
        const dinnerAmount = data.amount.dinner

        const dialyFoodMenu = [breakfastFood, snack1Food, lunchFood, snack2Food, dinnerFood]
        const amountMenu = [breakfastAmount, snack1Amount, lunchAmount, snack2Amount, dinnerAmount]
        const dietMenu = dietCal.dietMenu

        let myTotalKcal = 0
        dialyFoodMenu.map((item, i) => {
            item.map((itx, j) => {
                myTotalKcal = myTotalKcal + calc_kcal(itx, dietMenu) * amountMenu[i][j] / 100
            })
        })
        return myTotalKcal

    }

    const today = new Date();
    const dayOfWeek = today.getDay();
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
        if (dietCal === null) return
        setDailyTotalKcal(calc_DailyTotalKcal(dietCal))

        const header = {
            email: localStorage.getItem('fitnessemail'),
            password: localStorage.getItem('fitnesspassword')
        }
        const updateData = {
            year: year,
            month: month,
            date: date
        }
        let weeklytotalcal = 0

        api.get('/getweeklytotaldata', { params: { header: header, updateData: updateData } })
            .then((res) => {
                res.data.result.map((item, i) => {
                    weeklytotalcal = weeklytotalcal + weeklyTotalCalcKcal(item._id)
                })
                setWeeklyTotalKcal(weeklytotalcal)
            })

    }, [updateWeeklySignal, dietCal])

    // useEffect(() => {
    //     if (dietCal === null) return
    //     setDailyTotalKcal(calc_DailyTotalKcal(dietCal))

    //     const header = {
    //         email: localStorage.getItem('fitnessemail'),
    //         password: localStorage.getItem('fitnesspassword')
    //     }
    //     const updateData = {
    //         year: year,
    //         month: month,
    //         date: date
    //     }
    //     let weeklytotalcal = 0
    //     const setTotalWeekly = () => {
    //         api.get('/getweeklytotaldata', { params: { header: header, updateData: updateData } })
    //             .then((res) => {
    //                 res.data.result.map((item, i) => {
    //                     weeklytotalcal = weeklytotalcal + weeklyTotalCalcKcal(item._id)
    //                 })
    //                 setWeeklyTotalKcal(weeklytotalcal)
    //             })
    //         clearInterval(newTimer)
    //     }
    //     const newTimer = setInterval(setTotalWeekly, 1000)
    // }, [dietCal])




    return (
        <>
            <div className=" flex flex-col justify-between w-[100%] h-[20%]
                        min-[300px]:h-[40%]
                        min-[720px]:h-[40%]
                        min-[1000px]:flex-row min-[1000px]:h-[18%]
                        min-[1500px]:h-[18%]">
                <DietGoalEdit imgsrc='karory.png' title='Diet Goal' content='Calorie Counting' targetKcal={targetKcal} setTargetKcal={setTargetKcal} />
                <DietGoalPlan imgsrc='sumcarory.png' title='Weekly Total Calory' content={String(weeklyTotalKcal) + " kcal"} />
                <DietGoalPlan imgsrc='sum.png' title='Carory Comsumed Today' content={String(dailyTotalKcal) + " kcal"} />
            </div>
            <div className="flex flex-col justify-center items-center w-[100%] h-[5px]  bg-red-300">
                <Progress className="w-[100%]" barClassName="my-progress" value={weeklyTotalKcal / targetKcal * 100} />
            </div>
        </>
    )
}

export default DietGoal