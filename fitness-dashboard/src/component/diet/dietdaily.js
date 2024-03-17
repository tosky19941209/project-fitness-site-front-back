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

    return (
        <div className="flex flex-col xl:flex-row xl:flex-row w-[100%] pb-[20px] ml-[0%] mt-3">
            {
                mealType.map((item, index) => (
                    <Meal title={item} meal={dietPlan.food} amount={dietPlan.amount} index={index} dietPlan={dietPlan} setDietPlan={setDietPlan} />
                ))
            }
        </div>
    )
}

export default DietDaily