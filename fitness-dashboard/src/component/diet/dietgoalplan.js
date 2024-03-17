import React from "react";

function DietGoalPlan(props) {
    return (
        <div className="flex border rounded-xl  w-[100%] h-[75%] items-center mt-2 mb-2
                        min-[1000px]:w-[30%]">
            <div className="flex items-center justify-center bg-[#F1EEF6] w-[70px] h-[70px]  rounded-xl ml-[11%] ">
                <img src={props.imgsrc} width='80%'></img>
            </div>
            <div className="flex flex-col ml-[5%]">
                <p className="text-[#757575] text-[15px] text-left mt-2 mb-2">{props.title}</p>
                <p className="text-black text-[20px] text-left mt-2 mb-2">{props.content}</p>
            </div>
        </div>
    )
}

export default DietGoalPlan