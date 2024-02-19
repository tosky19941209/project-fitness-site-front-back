import React, { useState } from "react";
import './Result.css'
function Result () {

    const [accuracy, setAccuracy] = useState(90)
    return (
        <>
            <div style={{
                width:"30vw",
                height:"40vw",
                backgroundColor:"gray"
            }}>

            </div>
        </>
    )
}

export default Result;