import React, { useEffect, useState } from "react";
import Meal from './meal.js'
import { useStepContext } from "@mui/material";
function DietDaily({ dietPlan, setDietPlan, email, password }) {
    const mealType = [
        'Breakfast',
        'Snack1',
        'Lunch',
        'Snack2',
        'Dinner'
    ]

    return (
        <div className="flex flex-col xl:flex-row xl:flex-row border rounded-xl w-[96%] h-[86%] md:h-[80%] ml-[2%] mt-3">
            {
                mealType.map((item, index) => (
                    <Meal title={item} meal={dietPlan.food} index={index} email={email} password={password} dietPlan={dietPlan} setDietPlan={setDietPlan} />
                ))
            }
        </div>
    )
}

export default DietDaily