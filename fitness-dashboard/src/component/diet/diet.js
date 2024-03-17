import React from "react";
import Main from './main.js'
function Diet({ email, password }) {
    return (
        <div className="flex flex-col justify-center items-center w-[100%] xl:h-[85%] md:h-[100%]">
            <Main email={email} password={password} />
        </div>
    )
}

export default Diet