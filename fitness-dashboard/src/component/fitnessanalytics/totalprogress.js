import React from "react";
import  CircularProgressWithLabel  from "./progress";
import { CircularProgress } from "@mui/material";
import Circular from './circulprogress'
function TotalProgress() {
    return (

        <div className="flex justify-between items-center border rounded-xl w-[45%] h-[85%] ml-10">
            <div className="flex flex-col relative">
                <div className="ml-[-10%]">
                    <Circular/>
                    {/* <CircularProgressWithLabel progress_value = {99}/> */}
                </div>
            </div>

        </div>

    )
}

export default TotalProgress


