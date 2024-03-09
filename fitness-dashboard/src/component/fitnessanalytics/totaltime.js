import React from "react";
import FitnessGoal from "./fitnessgoal";
function TotalTime() {

    return (
        <div className="flex  border rounded-xl  w-[80%] h-[45%] justify-center mt-2 mb-2">
            
            <div className="flex items-center w-[45%] h-[40%] justify-between mt-10">
                <div className="flex justify-center items-center rounded-xl">
                    <img src='totaltime.png' width='50%' height='50%'></img>
                </div>
                <div className="ml-1 flex flex-col justify-center items-center w-[80%]">
                    <p className="text-[#757575] text-[15px]">Total Hour</p>
                    <p className="text-black text-[20px]">8 hours</p>
                </div>
            </div>

            <div className="flex items-center w-[45%] h-[40%] justify-between mt-10">
                <div className="flex justify-center items-center rounded-xl">
                    <img src='totalcomplete.png' width='50%' height='50%'></img>
                </div>
                <div className="ml-1 flex flex-col justify-center items-center w-[80%]">
                    <p className="text-[#757575] text-[15px]">Complete</p>
                    <p className="text-black text-[20px]">92%</p>
                </div>
            </div>

        </div>
    )
}

export default TotalTime;