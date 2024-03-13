import React, { useState, useEffect } from "react";

function Result_weekly(props) {
    return (
        <div className="flex flex-col justify-center  w-[90%] h-[30%] 
        mt-2 mb-2">
            <p className="text-[80%] text-left text-[#757575]">{props.category} </p>
            <div className="flex justify-between items-center">
                <p className="text-[black]">{props.time}</p>
                <p className={`w-[30%] h-[60%] bg-[${props.color}] rounded-xl`}>{props.progress}</p>
                {/* <p className={`w-[30%] h-[60%] bg-[#00E0FF] rounded-xl`}>{props.progress}</p> */}
                {/* <p className={`w-[30%] h-[60%] bg-[#929292] rounded-xl`}>{props.progress}</p> */}
                {/* <p className={`w-[30%] h-[60%] bg-[#A85CF9] rounded-xl`}>{props.progress}</p> */}
            </div>
        </div>
    )
}

function Result({ history }) {
    const [resultCounter, setResultCounter] = useState();
    const [resultAccuracy, setResultAccuracy] = useState()
    const [resultDurtime, setResultDurtime] = useState()

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
        setResultAccuracy(Number(haccuracy.toFixed(3)))
        setResultCounter(hcounter / history.length)
        setResultDurtime(hdurtime)

        
    }, [history])

    useEffect(() => {
        const procounter = resultCounter/targetCounter * 100
        const proaccuracy = resultAccuracy/targetAccuracy * 100
        const produrtime = resultDurtime/targetDurtime * 100
        setProgressAccuracy(Number(proaccuracy.toFixed(1)) + "%")
        setProgressCounter(Number(procounter.toFixed(1)) + "%")
        setProgressDurtime(Number(produrtime.toFixed(1)) + "%")

    },[resultAccuracy, resultCounter, resultDurtime])

    return (
        <div className="flex flex-col justify-center items-center w-[50%] h-[80%]">
            {/* <select className="form-control" style={{
                width: "15vw"
            }}>
                <option>Daily</option>
                <option>Weekly</option>
            </select> */}

            <Result_weekly category="Total Counter" time={resultCounter + ""} progress={progressCounter} color="#00E0FF" />
            <Result_weekly category="Total Time" time={resultDurtime + " s"} progress={progressDurtime} color="#929292" />
            <Result_weekly category="Total Accuracy" time={resultAccuracy + " %"} progress={progressAccuracy} color="#A85CF9" />




        </div>
    )
}

export default Result