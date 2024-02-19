import React, { useState } from "react";
import './Result.css'
function Result () {

    const [accuracy, setAccuracy] = useState(90)
    return (
        <>
            <div style={{
                width:"10vw",
                height:"30vw",
                backgroundColor:"gray"
            }}>

            </div>
        </>
    )
}

export default Result;