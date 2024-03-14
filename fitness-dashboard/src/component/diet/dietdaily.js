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
        <div className="border rounded-xl w-[96%] h-[80%] ml-[2%] bg-orange-100
                        min-[300px]:mt-[1%]
                        min-[720px]:mt-[1%]
                        min-[1000px]:mt-[1%] min-[1000px]:flex
                        min-[1500px]:mt-[1%] min-[1500px]:flex

            ">
            {
                mealType.map((item, index) => (
                    <Meal title={item} meal={dietPlan.food} index={index} email={email} password={password} dietPlan={dietPlan} setDietPlan={setDietPlan}/>
                ))
            }
        </div>
    )
}

export default DietDaily