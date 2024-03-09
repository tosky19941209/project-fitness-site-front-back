import React, { useEffect, useState } from "react";
import DietCalendar from './dietcalendar.js'
import DietDaily from './dietdaily.js'
function DietPlan() {

    const [dietPlan, setDietPlan] = useState({
        year:'',
        month:'',
        date: '',
        day:'',
        type:'',
        food:[],
    })
    useEffect(() => {
        console.log(dietPlan)
    }, [dietPlan])
    
    return(
        <div className="flex flex-col border rounded-xl  w-[100%] h-[99%]">
            <DietCalendar dietPlan={dietPlan} setDietPlan={setDietPlan}/>
            <DietDaily dietPlan={dietPlan} setDietPlan={setDietPlan}/>
        </div>
    )


}

export default DietPlan