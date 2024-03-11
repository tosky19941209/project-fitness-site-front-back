import React from "react";
import DietGoal from './dietgoal.js'
import DietPlan from './dietplan.js'
function Main ({email, password}) {
    return(
        <div className="flex flex-col w-[95%] h-[100%] ml-5">
            <DietGoal/>
            <DietPlan email={email} password={password}/>
        </div>
    )
}

export default Main;