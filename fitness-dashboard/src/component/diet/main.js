import React from "react";
import DietGoal from './dietgoal.js'
import DietPlan from './dietplan.js'
function Main ({email, password}) {
    return(
        <div className="w-[95%] h-[100%] pb-[20px]">
            <DietGoal/>
            <DietPlan email={email} password={password}/>
        </div>
    )
}

export default Main;