import React, { useEffect, useState } from "react";
import api from '../../service/axios'
function Meal({ title, meal, amount, index, dietPlan, setDietPlan, updateWeeklySignal, setUpdateWeeklySignal, btnEnable, setBtnEnable }) {

    const foodNames = dietPlan.dietMenu.foodName
    const kcals = dietPlan.dietMenu.kcal
    const proteins = dietPlan.dietMenu.protein
    const waters = dietPlan.dietMenu.water
    const mineral = dietPlan.dietMenu.mineral

    const [mealContent, setMealContent] = useState([])
    const [amountContent, setAmountContent] = useState([])

    const [accidentID, setAccidentID] = useState(-1)
    const [showWidget, setShowWidget] = useState(false)
    const [addFood, setAddFood] = useState('')
    const [addAmount, setAmountAdd] = useState()

    const [expectKcal, setExpectKcal] = useState(0)
    const [expectProtein, setExpectProtein] = useState(0)
    const [expectWater, setExpectWater] = useState(0)
    const [expectMineral, setExpectMineral] = useState(0)

    const [updateSignal, setUpdateSignal] = useState(0)

    const calc_kcal = (food) => {
        return String(kcals[foodNames.indexOf(food)])
    }
    const calc_protein = (food) => {
        return String(proteins[foodNames.indexOf(food)])
    }
    const calc_water = (food) => {
        return String(waters[foodNames.indexOf(food)])
    }
    const calc_mineral = (food) => {
        return String(mineral[foodNames.indexOf(food)])
    }



    useEffect(() => {
        setAddFood(dietPlan.dietMenu.foodName[0])
    }, [dietPlan])

    useEffect(() => {
        if (index === 0) {
            setMealContent(meal.breakfast)
            setAmountContent(amount.breakfast)
        }
        if (index === 1) {
            setMealContent(meal.snack1)
            setAmountContent(amount.snack1)
        }
        if (index === 2) {
            setMealContent(meal.lunch)
            setAmountContent(amount.lunch)
        }
        if (index === 3) {
            setMealContent(meal.snack2)
            setAmountContent(amount.snack2)
        }
        if (index === 4) {
            setMealContent(meal.dinner)
            setAmountContent(amount.dinner)
        }
    }, [meal, amount])

    useEffect(() => {
        const foodIndex = foodNames.indexOf(addFood)
        if (foodIndex === -1) return
        setExpectKcal(kcals[foodIndex] * addAmount / 100)
        setExpectProtein(proteins[foodIndex] * addAmount / 100)
        setExpectWater(waters[foodIndex] * addAmount / 100)
        setExpectMineral(mineral[foodIndex] * addAmount / 100)


    }, [addAmount])


    useEffect(() => {
        if (dietPlan.year === '') return
        let updateMeal = null
        let updateAmount = null

        if (index === 0) {
            const newData = {
                breakfast: mealContent,
                snack1: meal.snack1,
                lunch: meal.lunch,
                snack2: meal.snack2,
                dinner: meal.dinner
            }
            const newAmountData = {
                breakfast: amountContent,
                snack1: amount.snack1,
                lunch: amount.lunch,
                snack2: amount.snack2,
                dinner: amount.dinner
            }

            updateMeal = newData
            updateAmount = newAmountData

            const newPlan = {
                ...dietPlan,
                food: {
                    breakfast: mealContent,
                    snack1: meal.snack1,
                    lunch: meal.lunch,
                    snack2: meal.snack2,
                    dinner: meal.dinner
                },
                amount: {
                    breakfast: amountContent,
                    snack1: amount.snack1,
                    lunch: amount.lunch,
                    snack2: amount.snack2,
                    dinner: amount.dinner
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
            const newAmountData = {
                breakfast: amount.breakfast,
                snack1: amountContent,
                lunch: amount.lunch,
                snack2: amount.snack2,
                dinner: amount.dinner
            }

            updateMeal = newData
            updateAmount = newAmountData

            const newPlan = {
                ...dietPlan,
                food: {
                    breakfast: meal.breakfast,
                    snack1: mealContent,
                    lunch: meal.lunch,
                    snack2: meal.snack2,
                    dinner: meal.dinner
                },
                amount: {
                    breakfast: amount.breakfast,
                    snack1: amountContent,
                    lunch: amount.lunch,
                    snack2: amount.snack2,
                    dinner: amount.dinner
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
            const newAmountData = {
                breakfast: amount.breakfast,
                snack1: amount.snack1,
                lunch: amountContent,
                snack2: amount.snack2,
                dinner: amount.dinner
            }

            updateMeal = newData
            updateAmount = newAmountData

            const newPlan = {
                ...dietPlan,
                food: {
                    breakfast: meal.breakfast,
                    snack1: meal.snack1,
                    lunch: mealContent,
                    snack2: meal.snack2,
                    dinner: meal.dinner
                },
                amount: {
                    breakfast: amount.breakfast,
                    snack1: amount.snack1,
                    lunch: amountContent,
                    snack2: amount.snack2,
                    dinner: amount.dinner
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
            const newAmountData = {
                breakfast: amount.breakfast,
                snack1: amount.snack1,
                lunch: amount.lunch,
                snack2: amountContent,
                dinner: amount.dinner
            }

            updateMeal = newData
            updateAmount = newAmountData

            const newPlan = {
                ...dietPlan,
                food: {
                    breakfast: meal.breakfast,
                    snack1: meal.snack1,
                    lunch: meal.lunch,
                    snack2: mealContent,
                    dinner: meal.dinner
                },
                amount: {
                    breakfast: amount.breakfast,
                    snack1: amount.snack1,
                    lunch: amount.lunch,
                    snack2: amountContent,
                    dinner: amount.dinner
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
            const newAmountData = {
                breakfast: amount.breakfast,
                snack1: amount.snack1,
                lunch: amount.lunch,
                snack2: amount.snack2,
                dinner: amountContent
            }

            updateMeal = newData
            updateAmount = newAmountData

            const newPlan = {
                ...dietPlan,
                food: {
                    breakfast: meal.breakfast,
                    snack1: meal.snack1,
                    lunch: meal.lunch,
                    snack2: meal.snack2,
                    dinner: mealContent
                },
                amount: {
                    breakfast: amount.breakfast,
                    snack1: amount.snack1,
                    lunch: amount.lunch,
                    snack2: amount.snack2,
                    dinner: amountContent
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
            amount: updateAmount
        }

        const apiData = { header: header, updateData: updateData }
        api.post('/setdiet', apiData)
            .then((res) => {
                console.log("signal")
                setUpdateWeeklySignal(prev => prev + 1)

            })

    }, [updateSignal])

    return (
        // <div className="flex flex-col justify-start items-center w-[91%] h-[99%] sm:h-[90%] md:w-[90%] xl:h-[94%] mr-5 ml-5 border rounded-xl mt-[1%] overflowY-auto">
        <div className="mt-3 w-[96%] ml-[2%] xl:w-[18%] xl:h-[50vh] xl:mt-2 xl:mr-[1%] xl:ml-[1%] border rounded-xl">
            <p className="text-[#5534A5] mt-[5%] text-[30px] ">{title}</p>
            <button className="mt-[-7%] ml-[75%] hover:bg-[#A85CF9] rounded-[50%] w-[30px] "
                onClick={(e) => {
                    showWidget === false ? setShowWidget(true) : setShowWidget(false)
                }}>
                <img src='plus.png' className="w-[100%]"></img>
            </button>
            {
                showWidget &&
                <div className="flex flex-col w-[90%] h-[50%] sm:h-[10%] md:h-[66%] xl:h-[60%] border rounded-xl bg-[#F1EEF6] shadow-xl ml-[5%] mt-[-0%] xl:mt-[0px]">
                    <div className="flex justify-between items-center w-[95%] h-[50%] ml-[2%]">
                        <div>
                            <p className="text-[#5534A5] text-[15px] xl:text-[12px]">kcal</p>
                            <p className="text-[black] text-[15px]">{expectKcal}</p>
                        </div>

                        <div>
                            <p className="text-[#5534A5] text-[15px] xl:text-[12px]">protein</p>
                            <p className="text-[black] text-[15px]">{expectProtein}</p>
                        </div>

                        <div>
                            <p className="text-[#5534A5] text-[15px] xl:text-[12px]">water</p>
                            <p className="text-[black] text-[15px]">{expectWater}</p>
                        </div>

                        <div>
                            <p className="text-[#5534A5] text-[15px] xl:text-[12px]">mineral</p>
                            <p className="text-[black] text-[15px]">{expectMineral}</p>
                        </div>

                    </div>
                    <select className="form-control"
                        style={{
                            width: "90%",
                            marginLeft: "5%",

                        }}
                        onChange={(e) => {
                            // console.log(e.target.selectedIndex)
                            setAddFood(foodNames[e.target.selectedIndex])
                        }}>
                        {
                            foodNames.map((item, index) => (
                                <option>{item + " " + calc_kcal(item) + "kcal/100g"}</option>
                            ))
                        }
                    </select>

                    <input type="number" placeholder="amount /g" value={addAmount} className="form-control"
                        style={{
                            width: "90%",
                            marginLeft: "5%",
                            marginTop: "5%",
                        }}
                        onChange={(e) => {
                            if (e.target.value < 10000)
                                setAmountAdd(e.target.value)
                        }}></input>

                    <div className="flex mt-[3%] md:mt-4 xl:mt-2">
                        <button className="text-[#5534A5] text-[90%] xl:text-[60%] border rounded-[70px] w-[40%] hover:bg-[#5534A5] hover:text-[white] duration-500 mr-[5%] ml-[5%]"
                            onClick={(e) => {
                                const newMeal = [...mealContent]
                                const newAmount = [...amountContent]
                                newMeal.push(addFood)
                                newAmount.push(addAmount)
                                setMealContent(newMeal)
                                setAmountContent(newAmount)

                                setShowWidget(false)
                                setAddFood('')

                                setExpectKcal(0)
                                setExpectMineral(0)
                                setExpectProtein(0)
                                setExpectWater(0)

                                setAmountAdd(0)
                                setUpdateSignal(prev => prev + 1)
                            }}>Add</button>
                        <button className="text-[#5534A5] text-[90%] xl:text-[60%] border rounded-[70px] w-[40%] hover:bg-[#5534A5] hover:text-[white] duration-500 mr-[5%] ml-[5%]"
                            onClick={(e) => {
                                setShowWidget(false)
                            }}>Close</button>
                    </div>
                </div>
            }

            {
                !showWidget &&
                <div className="flex flex-col justify-start items-center h-[75%] overflow-y-auto">
                    {mealContent.map((item, index) => (
                        <div className="flex justify-between w-[90%] mb-1 mt-1 border rounded-xl pl-[5%] pr-[5%] md:pl-[10%] md:pr-[10%] xl:pl-[0px] xl:pr-[0px]">
                            <div className="w-[10px] h-[100px] bg-[#5534A5] ml-[-7%] md:ml-[-14%] xl:ml-[0px] rounded-xl"/>
                            <div className="flex flex-col">
                                <p className="text-[black] text-[15px] xl:text-[15px] ml-5 mt-[10%]">{item + " " + calc_kcal(item) + "kcal/100g"}</p>
                                <p className="text-[gray] text-[15px] xl:text-[15px] ml-5 mt-[-5%]">{amountContent[index] + "/g"}</p>
                            </div>
                            <button className="w-[35px]"
                                onClick={(e) => {
                                    const newMealData = []
                                    const newAmountData = []
                                    let j = 0
                                    for (let i = 0; i < mealContent.length; i++) {
                                        if (i !== index) {
                                            newMealData[j] = mealContent[i]
                                            newAmountData[j] = amountContent[j]
                                            j++
                                        }
                                    }
                                    setMealContent(newMealData)
                                    setAmountContent(newAmountData)
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
            }

        </div>
    )
}

export default Meal 