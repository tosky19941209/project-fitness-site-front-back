import { type } from "@testing-library/user-event/dist/type";
import React, { useState, useEffect } from "react";

function Result_weekly(props) {
    return (
        <div className="flex flex-col justify-center  w-[90%] h-[30%] 
        mt-2 mb-2">
            <p className="text-[80%] text-left text-[#757575]">{props.category} </p>
            <div className="flex justify-between items-center">
                <p className="text-[black]">{props.time}</p>
                <p className={`w-[30%] h-[60%] bg-[${props.color}] rounded-xl min-[1500px]:w-[50%]`}>{props.progress}</p>
            </div>
        </div>
    )
}

function Result({ history }) {
    const [resultCounter, setResultCounter] = useState(0);
    const [resultAccuracy, setResultAccuracy] = useState(0)
    const [resultDurtime, setResultDurtime] = useState(0)

    const [progressCounter, setProgressCounter] = useState();
    const [progressAccuracy, setProgressAccuracy] = useState()
    const [progressDurtime, setProgressDurtime] = useState()



    const targetCounter = 100
    const targetAccuracy = 100
    const targetDurtime = 3000

    useEffect(() => {
        if (history === null) return
        let hcounter = 0
        let haccuracy = 0
        let hdurtime = 0

        history.map((item, index) => {

            hcounter = hcounter + Number(item.averageCounter)
            haccuracy = haccuracy + Number(item.averageAccuracy)
            hdurtime = hdurtime + Number(item.averageDurtime)
        })

        haccuracy = haccuracy / history.length
        isNaN(haccuracy) ? haccuracy = 0 : haccuracy = haccuracy
        isNaN(hcounter) ? hcounter = 0 : hcounter = hcounter
        isNaN(hdurtime) ? hdurtime = 0 : hdurtime = hdurtime

        setResultAccuracy(Number(haccuracy.toFixed(3)))
        setResultCounter(hcounter / history.length)
        setResultDurtime(hdurtime)
    }, [history])

    useEffect(() => {
        if (isNaN(resultCounter))
            setResultCounter(0)
    }, [resultCounter])

    useEffect(() => {
        let procounter = resultCounter / targetCounter * 100
        let proaccuracy = resultAccuracy / targetAccuracy * 100
        let produrtime = resultDurtime / targetDurtime * 100
        isNaN(procounter) ? procounter = 0 : procounter = procounter
        isNaN(proaccuracy) ? proaccuracy = 0 : proaccuracy = proaccuracy
        isNaN(produrtime) ? produrtime = 0 : produrtime = produrtime

        setProgressAccuracy(Number(proaccuracy.toFixed(1)) + "%")
        setProgressCounter(Number(procounter.toFixed(1)) + "%")
        setProgressDurtime(Number(produrtime.toFixed(1)) + "%")

    }, [resultAccuracy, resultCounter, resultDurtime])

    return (
        <div className="flex flex-col justify-center items-center  w-[80%] h-[80%] md:w-[100%] xl:w-[100%]">
            {/* <select className="form-control" style={{
                width: "15vw"
            }}>
                <option>Daily</option>
                <option>Weekly</option>
            </select> */}

            <Result_weekly category="Total Counter" time={Number(resultCounter.toFixed(1)) + ""} progress={progressCounter} color="#00E0FF" />
            <Result_weekly category="Total Time" time={Number(resultDurtime.toFixed(1)) + " s"} progress={progressDurtime} color="#929292" />
            <Result_weekly category="Total Accuracy" time={Number(resultAccuracy.toFixed(1)) + " %"} progress={progressAccuracy} color="#A85CF9" />




        </div>
    )
}

export default Result