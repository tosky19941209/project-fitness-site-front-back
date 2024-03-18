import React, { useState } from "react";
import DietGoal from './dietgoal.js'
import DietPlan from './dietplan.js'
function Main() {
    const [dietCal, setdietCal] = useState(null)
    const [updateWeeklySignal, setUpdateWeeklySignal] = useState(0)
    return (
        <div className="w-[95%] h-[100%] pb-[20px]">
            <DietGoal dietCal={dietCal} updateWeeklySignal={updateWeeklySignal} setUpdateWeeklySignal={setUpdateWeeklySignal} />
            <DietPlan setdietCal={setdietCal} updateWeeklySignal={updateWeeklySignal} setUpdateWeeklySignal={setUpdateWeeklySignal} />
        </div>
    )
}

export default Main;