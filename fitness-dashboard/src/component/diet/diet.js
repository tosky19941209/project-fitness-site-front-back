import React from "react";
import Main from './main.js'
function Diet({email, password}) {
    return (
        <div className="w-[100%] h-[90%] 
                        min-[1500px]:h-[85%]
                        min-[720px]:h-[100%]
        ">
            <Main email={email} password={password}/>
        </div>
    )
}

export default Diet