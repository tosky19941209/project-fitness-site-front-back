import React from "react";
import FitnessGoal from "./fitnessgoal";
function TotalTime() {

    return (
        <div className="flex  border rounded-xl  w-[80%] h-[45%] justify-center items-center mt-2 mb-2">
            
            <div className="flex justify-center w-[45%] h-[80%]">
                <div className="flex flex-col justify-center items-center w-[40%] h-[100%] rounded-xl">
                    <img src='totaltime.png' width='50%' height='50%'></img>
                </div>
                <div className="justify-start items-center w-[60%] h-[100%]">
                    <p className="text-[#757575] text-[15px] text-left">Total Time</p>
                    <p className="text-black text-[20px] text-left">8 Hours</p>
                </div>
            </div>

            <div className="flex justify-center w-[45%] h-[80%]">
                <div className="flex flex-col justify-center items-center w-[40%] h-[100%] rounded-xl">
                    <img src='totalcomplete.png' width='50%' height='50%'></img>
                </div>
                <div className="justify-start items-center w-[60%] h-[100%]">
                    <p className="text-[#757575] text-[15px] text-left">Complete</p>
                    <p className="text-black text-[20px] text-left">92%</p>
                </div>
            </div>

        </div>
    )
}

export default TotalTime;