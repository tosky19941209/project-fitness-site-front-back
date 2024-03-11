import React from "react";
import Main from './main.js'
function Diet({email, password}) {
    return (
        <div className="flex flex-col w-[100%] h-[90%] ">
            <Main email={email} password={password}/>
        </div>
    )
}

export default Diet