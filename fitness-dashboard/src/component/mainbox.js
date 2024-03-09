import React, { useEffect, useState } from "react";
import FitnessAnalytics from "./fitnessanalytics/fitnessanalytics.js";
import Diet from './diet/diet.js'
import { useStepContext } from "@mui/material";
function MainBox({mainContent, setMainContent}) {

    const [showMainBoxType, setShowMainBoxType] = useState(true)

    useEffect(() => {
        if (mainContent.sideBar === 1 ){
            setShowMainBoxType(true)
        }
        if (mainContent.sideBar === 2){
            setShowMainBoxType(false)
        }
    }, [mainContent.sideBar])


    return (
        <>
            { showMainBoxType === true ? <FitnessAnalytics/> : <Diet/>}
        </>
    )
}

export default MainBox