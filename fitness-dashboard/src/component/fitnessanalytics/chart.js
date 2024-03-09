import React from "react";
import MUIChart from './mui-chart'
import Result from "./result";

function Chart() {
    return (
        <div className="flex w-[95%] h-[90%] mt-10 ml-5 ">
            <MUIChart/>
            <Result/>
        </div>
    )
}

export default Chart