import React from "react";

function FitnessGoal() {
    return (
        <div className="flex border rounded-xl  w-[100%] h-[48%] items-center mb-[2%]">
            <div className="flex items-centerbg-[#F1EEF6] w-[10%] rounded-xl ml-[11%] ">
                <img src='icon1.png'></img>
            </div>
            <div className="flex flex-col ml-[5%]">
                <p className="text-[#757575] text-[20px] mt-2 mb-2">Fitness Goal</p>
                <p className="text-black text-[15px] mt-2 mb-2">Muscle Gain</p>
            </div>
        </div>
    )
}

export default FitnessGoal