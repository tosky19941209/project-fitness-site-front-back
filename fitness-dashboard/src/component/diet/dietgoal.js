import React from "react";
import DietGoalPlan from "./dietgoalplan";
function DietGoal () {

    return (
        <div className=" flex justify-between w-[100%] h-[20%] pl-[2%] pr-[2%] mt-10">
            <DietGoalPlan imgsrc = 'karory.png' title = 'Diet Goal' content = 'Calorie Counting'/>
            <DietGoalPlan imgsrc = 'sum.png' title = 'Weekly Total Calory' content = '17kcal'/>
            <DietGoalPlan imgsrc = 'sumcarory.png' title = 'Carory Comsumed Today' content = '2.7kcal'/>
        </div>
    )
}

export default DietGoal