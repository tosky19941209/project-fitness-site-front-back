import React, { useEffect, useState } from "react";
import Meal from './meal.js'
import { useStepContext } from "@mui/material";
function DietDaily({ dietPlan, setDietPlan }) {
    const mealType = [
        'Breakfast',
        'Snack1',
        'Lunch',
        'Snack2',
        'Dinner'
    ]
    const foodBreakfast = [
        'pizza',
        'spagetti',
    ]

    const foodSnack1 = [
        'qweq',
        'wer'
    ]

    const foodLunch = [
        'wer',
        'zcv'
    ]

    const foodSnack2 = [
        '123',
        '234'
    ]

    const foodDinner = [
        'zxc',
        'dfghrhrty'
    ]

    const [foodDaily, setFoodDaily] = useState(
        [
            foodBreakfast,
            foodSnack1,
            foodLunch,
            foodSnack2,
            foodDinner
        ]
    )

    useEffect(() => {
        const newData = {
            ...dietPlan,
            food: foodDaily
        }
        setDietPlan(newData)
    }, [foodDaily])
    return (
        <div className="flex justify-between items-center border rounded-xl w-[98%] h-[95%] mt-3 ml-5">
            {
                mealType.map((item, index) => (
                    <Meal type={item} foodDaily={foodDaily} index={index} setFoodDaily={setFoodDaily} />
                ))
            }
        </div>
    )
}

export default DietDaily