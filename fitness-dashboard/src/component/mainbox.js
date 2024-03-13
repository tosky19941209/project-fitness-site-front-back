import React, { useEffect, useState } from "react";
import FitnessAnalytics from "./fitnessanalytics/fitnessanalytics.js";
import Diet from './diet/diet.js'
import { useStepContext } from "@mui/material";
import OverView from "./overview/overview.js";
import Header from './header.js'
import Analytics from './analytics/analytics.js'
import Support from "./support/support.js";
function MainBox({ mainContent, setMainContent }) {

    const [headerContent, setHeaderContent] = useState({
        email: "",
        password: ""
    })
    const [sideBarIndex, setSideBarIndex] = useState(0)
    const spaceTag = (<></>)
    useEffect(() => {
        setSideBarIndex(mainContent.sideBar)
    }, [mainContent.sideBar])

    useEffect(() => {
        if (sideBarIndex === 0) {
            const newData = {
                sideBar: 0
            }
            setMainContent(newData)
        }
    }, [sideBarIndex])

    return (
        <div className="flex flex-col w-[100%] h-[full]">
            <Header sideBarIndex={sideBarIndex} headerContent={headerContent} setHeaderContent={setHeaderContent} setSideBarIndex={setSideBarIndex} />

            {sideBarIndex === 0 ? <OverView email={headerContent.email} password={headerContent.password} /> : spaceTag}
            {sideBarIndex === 1 ? <FitnessAnalytics email={headerContent.email} password={headerContent.password} /> : spaceTag}
            {sideBarIndex === 2 ? <Diet email={headerContent.email} password={headerContent.password} /> : spaceTag}
            {sideBarIndex === 3 ? <Analytics /> : spaceTag}
            {sideBarIndex === 4 ? <Support/>: spaceTag}
        </div>
    )
}

export default MainBox