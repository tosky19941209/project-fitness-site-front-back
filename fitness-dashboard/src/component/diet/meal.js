import React, { useEffect, useState } from "react";
import api from '../../service/axios'
function Meal({ title, meal, index, email, password, dietPlan }) {

    const [mealContent, setMealContent] = useState([])
    const [accidentID, setAccidentID] = useState(-1)
    const [showWidget, setShowWidget] = useState(false)
    const [addFood, setAddFood] = useState('')
    const [updateSignal, setUpdateSignal] = useState(0)

    useEffect(() => {
        if (index === 0)
            setMealContent(meal.breakfast)
        if (index === 1)
            setMealContent(meal.snack1)
        if (index === 2)
            setMealContent(meal.lunch)
        if (index === 3)
            setMealContent(meal.snack2)
        if (index === 4)
            setMealContent(meal.dinner)
    }, [meal])

    useEffect(() => {
        if (dietPlan.year === '') return
        let updateMeal = null
        if (index === 0) {
            const newData = {
                breakfast: mealContent,
                snack1: meal.snack1,
                lunch: meal.lunch,
                snack2: meal.snack2,
                dinner: meal.dinner
            }
            updateMeal = newData
        }

        if (index === 1) {
            const newData = {
                breakfast: meal.breakfast,
                snack1: mealContent,
                lunch: meal.lunch,
                snack2: meal.snack2,
                dinner: meal.dinner
            }
            updateMeal = newData
        }

        if (index === 2) {
            const newData = {
                breakfast: meal.breakfast,
                snack1: meal.snack1,
                lunch: mealContent,
                snack2: meal.snack2,
                dinner: meal.dinner
            }
            updateMeal = newData
        }

        if (index === 3) {
            const newData = {
                breakfast: meal.breakfast,
                snack1: meal.snack1,
                lunch: meal.lunch,
                snack2: mealContent,
                dinner: meal.dinner
            }
            updateMeal = newData
        }

        if (index === 4) {
            const newData = {
                breakfast: meal.breakfast,
                snack1: meal.snack1,
                lunch: meal.lunch,
                snack2: meal.snack2,
                dinner: mealContent
            }
            updateMeal = newData
        }


        const header = {
            email: email,
            password: password
        }
        const updateData = {
            year: dietPlan.year,
            month: dietPlan.month,
            date: dietPlan.date,
            day: dietPlan.day,
            meal: updateMeal
        }

        const apiData = { header: header, updateData: updateData }
        api.post('/setdiet', apiData)
            .then((res) => {
            })

    }, [updateSignal])
    return (
        <div className="flex flex-col justify-center items-center w-[20%] h-[90%] mr-5 ml-5 border rounded-xl">
            <p className="text-[#5534A5]">{title}</p>
            <button className="w-[10%] mt-[-7%] ml-[75%] hover:bg-[#A85CF9] rounded-[50%]"
                onClick={(e) => {
                    showWidget === false ? setShowWidget(true) : setShowWidget(false)
                }}>
                <img src='plus.png'></img>
            </button>
            {
                showWidget &&
                <div className="w-[95%] h-[40%] border rounded-xl bg-[#F1EEF6] shadow-xl">
                    <p className="text-[black] text-[60%] text-left ml-3"> Food </p>
                    <input value={addFood} className="form-control "
                        style={{
                            width: "90%",
                            marginLeft: "5%",
                            marginTop: "-3%",
                        }}
                        onChange={(e) => {
                            setAddFood(e.target.value)
                        }}></input>
                    <div className="w-[100%] h-[40%]">
                        <button className="text-[#5534A5] text-[60%] border rounded-[70px] w-[40%] hover:bg-[#5534A5] hover:text-[white] duration-500 mr-2 ml-2"
                            onClick={(e) => {
                                const newMeal = [...mealContent]
                                newMeal.push(addFood)
                                setMealContent(newMeal)
                                setShowWidget(false)
                                setAddFood('')
                                setUpdateSignal(prev => prev + 1)
                            }}>Add</button>
                        <button className="text-[#5534A5] text-[60%] border rounded-[70px] w-[40%] hover:bg-[#5534A5] hover:text-[white] duration-500 mr-2 ml-2"
                            onClick={(e) => {
                                setShowWidget(false)
                            }}>Close</button>
                    </div>
                </div>
            }

            <div className="w-[90%] h-[80%] mt-2">

                {
                    mealContent.map((item, index) => (
                        <div className="flex justify-between items-center w-[100%] h-[17%] mt-1 mb-1 border rounded-xl shadow-lg">
                            <p className="text-[black] text-[18px] ml-5 mt-3">{item}</p>
                            <button className="w-[14%]"
                                onClick={(e) => {
                                    const newData = []
                                    let j = 0
                                    for (let i = 0; i < mealContent.length; i++) {
                                        if (mealContent[i] !== item) {
                                            newData[j] = mealContent[i]
                                            j++
                                        }
                                    }
                                    setMealContent(newData)
                                    setUpdateSignal(prev => prev + 1)
                                }}>
                                <img src={index === accidentID ? 'close_hover.png' : 'close.png'}
                                    onMouseEnter={() => { setAccidentID(index) }}
                                    onMouseLeave={() => { setAccidentID(null) }}></img>
                            </button>
                        </div>
                    ))

                }

            </div>
        </div>
    )
}

export default Meal 