import React, { useEffect, useState } from "react";
import api from '../../service/axios'
function Meal({ title, meal, index, email, password, dietPlan, setDietPlan }) {

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

            const newPlan = {
                ...dietPlan,
                food: {
                    breakfast: mealContent,
                    snack1: meal.snack1,
                    lunch: meal.lunch,
                    snack2: meal.snack2,
                    dinner: meal.dinner
                }

            }
            setDietPlan(newPlan)
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

            const newPlan = {
                ...dietPlan,
                food: {
                    breakfast: meal.breakfast,
                    snack1: mealContent,
                    lunch: meal.lunch,
                    snack2: meal.snack2,
                    dinner: meal.dinner
                }

            }
            setDietPlan(newPlan)
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

            const newPlan = {
                ...dietPlan,
                food: {
                    breakfast: meal.breakfast,
                    snack1: meal.snack1,
                    lunch: mealContent,
                    snack2: meal.snack2,
                    dinner: meal.dinner
                }

            }
            setDietPlan(newPlan)
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

            const newPlan = {
                ...dietPlan,
                food: {
                    breakfast: meal.breakfast,
                    snack1: meal.snack1,
                    lunch: meal.lunch,
                    snack2: mealContent,
                    dinner: meal.dinner
                }

            }
            setDietPlan(newPlan)
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

            const newPlan = {
                ...dietPlan,
                food: {
                    breakfast: meal.breakfast,
                    snack1: meal.snack1,
                    lunch: meal.lunch,
                    snack2: meal.snack2,
                    dinner: mealContent
                }

            }
            setDietPlan(newPlan)
        }


        const localEmail = localStorage.getItem("fitnessemail")
        const localPassword = localStorage.getItem("fitnesspassword")
        const header = {
            email: localEmail,
            password: localPassword
        }

        const updateData = {
            year: dietPlan.year,
            month: dietPlan.month,
            date: dietPlan.date,
            day: dietPlan.day,
            meal: updateMeal,
        }

        const apiData = { header: header, updateData: updateData }
        api.post('/setdiet', apiData)
            .then((res) => {
                // console.log("update: ", updateData)
            })

    }, [updateSignal])
    return (
        <div className=" justify-start items-center w-[90%] h-[19%] sm:h-[90%] md:w-[90%] xl:h-[94%] mr-5 ml-5 border rounded-xl mt-[1%] overflowY-auto">
            <p className="text-[#5534A5] mt-[5%] text-[30px] ">{title}</p>
            <button className="mt-[-7%] ml-[75%] hover:bg-[#A85CF9] rounded-[50%] w-[30px] "
                onClick={(e) => {
                    showWidget === false ? setShowWidget(true) : setShowWidget(false)
                }}>
                <img src='plus.png' className="w-[100%]"></img>
            </button>
            {
                showWidget &&
                <div className="w-[90%] h-[66%] md:h-[60%] xl:h-[28%] border rounded-xl bg-[#F1EEF6] shadow-xl ml-[5%] mt-[-3%] xl:mt-[0px]">
                    <p className="text-[black] text-[20px] text-left ml-10 mt-2"> Food </p>
                    <input value={addFood} className="form-control"
                        style={{
                            width: "90%",
                            marginLeft: "5%",
                            marginTop: "-1%",
                        }}
                        onChange={(e) => {
                            setAddFood(e.target.value)
                        }}></input>
                    <div className="flex mt-[3%] md:mt-4 xl:mt-2">
                        <button className="text-[#5534A5] text-[90%] xl:text-[60%] border rounded-[70px] w-[40%] hover:bg-[#5534A5] hover:text-[white] duration-500 mr-[5%] ml-[5%]"
                            onClick={(e) => {
                                const newMeal = [...mealContent]
                                newMeal.push(addFood)
                                setMealContent(newMeal)
                                setShowWidget(false)
                                setAddFood('')
                                setUpdateSignal(prev => prev + 1)
                            }}>Add</button>
                        <button className="text-[#5534A5] text-[90%] xl:text-[60%] border rounded-[70px] w-[40%] hover:bg-[#5534A5] hover:text-[white] duration-500 mr-[5%] ml-[5%]"
                            onClick={(e) => {
                                setShowWidget(false)
                            }}>Close</button>
                    </div>
                </div>
            }

            <div className="flex flex-col justify-start items-center w-[100%] h-[40%] sm:h-[45%] md:h-[70%] md:w-[80%] ml-[5%] mt-2">

                {
                    mealContent.map((item, index) => (
                        <div className="flex justify-between items-center w-[90%] ml-[-10%] md:w-[100%] md:w-[113%] md:ml-[13%] h-[40%] sm:h-[40%] md:h-[20%] mt-1 mb-1 border rounded-xl shadow-sm ">
                            <p className="text-[black] text-[18px] ml-5 mt-3">{item}</p>
                            <button className="w-[35px] md:w-[5%] xl:w-[15%]"
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