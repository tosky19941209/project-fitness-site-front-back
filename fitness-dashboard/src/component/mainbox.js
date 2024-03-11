import React, { useEffect, useState } from "react";
import FitnessAnalytics from "./fitnessanalytics/fitnessanalytics.js";
import Diet from './diet/diet.js'
import { useStepContext } from "@mui/material";
import OverView from "./overview/overview.js";
import Header from './header.js'

function MainBox({ mainContent, setMainContent }) {

    const [headerContent, setHeaderContent] = useState({
        email: "",
        password: ""
    })
    const [sideBarIndex, setSideBarIndex] = useState(0)
    useEffect(() => {
        setSideBarIndex(mainContent.sideBar)
    }, [mainContent.sideBar])
    const spaceTag = (<></>)


    return (
        <div className="flex flex-col w-[100%] h-[full]">
            <Header sideBarIndex={sideBarIndex} headerContent={headerContent} setHeaderContent={setHeaderContent} />

            {mainContent.sideBar === 0 ? <OverView email={headerContent.email} password={headerContent.password} /> : spaceTag}
            {mainContent.sideBar === 1 ? <FitnessAnalytics email={headerContent.email} password={headerContent.password} /> : spaceTag}
            {mainContent.sideBar === 2 ? <Diet email={headerContent.email} password={headerContent.password} /> : spaceTag}

        </div>
    )
}

export default MainBox