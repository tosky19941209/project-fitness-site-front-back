import React, { useState } from "react";

function Test() {
    const [data, setData] = useState({
        name: "oys",
        data1: {
            year: "2000",
            age: "24"
        }
    })
    return (
        <>
            <button onClick={() => {
                const newdata = {...data, data1: {...data.data1, year: "2001"}}
                setData(newdata);
            }}>
                sdf
            </button>
            <p>{data.data1.year}</p>
        </>
    )
}

export default Test;
