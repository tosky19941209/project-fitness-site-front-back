import React from "react";
import DietGoalPlan from "./dietgoalplan";
function DietGoal () {

    return (
        <div className=" flex flex-col justify-between w-[100%] h-[20%]
                        min-[300px]:h-[40%]
                        min-[720px]:h-[40%]
                        min-[1000px]:flex-row min-[1000px]:h-[18%]
                        min-[1500px]:h-[18%]">
            <DietGoalPlan imgsrc = 'karory.png' title = 'Diet Goal' content = 'Calorie Counting'/>
            <DietGoalPlan imgsrc = 'sum.png' title = 'Weekly Total Calory' content = '17kcal'/>
            <DietGoalPlan imgsrc = 'sumcarory.png' title = 'Carory Comsumed Today' content = '2.7kcal'/>
        </div>
    )
}

export default DietGoal