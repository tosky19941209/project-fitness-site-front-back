import React, { useEffect, useState } from "react";
import FitnessAnalytics from "./fitnessanalytics/fitnessanalytics.js";
import Diet from './diet/diet.js'
import { useStepContext } from "@mui/material";
import OverView from "./overview/overview.js";
import Header from './header.js'

function MainBox({mainContent, setMainContent}) {

    const [showMainBoxType, setShowMainBoxType] = useState(true)



    const spaceTag = (<></>)

    return (
        <div className="flex flex-col w-[100%] h-[full]">
            <Header content={mainContent.sideBar}/>
            {/* { showMainBoxType === true ? <FitnessAnalytics/> : <Diet/>} */}
            { mainContent.sideBar === 0 ? <OverView/> : spaceTag}
            { mainContent.sideBar === 1 ? <FitnessAnalytics/> : spaceTag}
            { mainContent.sideBar === 2 ? <Diet/> : spaceTag}
        </div>
    )
}

export default MainBox