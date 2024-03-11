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
        <div className="flex justify-between items-center border rounded-xl w-[98%] h-[90%] mt-3 ml-5">
            {
                mealType.map((item, index) => (
                    <Meal title={item} meal={dietPlan.food} index={index} email={email} password={password} dietPlan={dietPlan}/>
                ))
            }
        </div>
    )
}

export default DietDaily