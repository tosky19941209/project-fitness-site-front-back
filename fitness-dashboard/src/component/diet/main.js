import React from "react";
import DietGoal from './dietgoal.js'
import DietPlan from './dietplan.js'
function Main () {
    return(
        <div className="flex flex-col w-[95%] h-[85%] ml-5">
            <DietGoal/>
            <DietPlan/>
        </div>
    )
}

export default Main;