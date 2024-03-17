import React, { useState } from "react";
import DietGoal from './dietgoal.js'
import DietPlan from './dietplan.js'
function Main () {
    const [dietCal, setdietCal] = useState(null)
    return(
        <div className="w-[95%] h-[100%] pb-[20px]">
            <DietGoal dietCal={dietCal}/>
            <DietPlan setdietCal={setdietCal}/>
        </div>
    )
}

export default Main;