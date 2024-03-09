import React from "react";

function Result_weekly(props) {
    return (
        <div className="flex flex-col justify-center  w-[90%] h-[30%] 
        mt-2 mb-2">
            <p className="text-[80%] text-left text-[#757575]">{props.category} </p>
            <div className="flex justify-between items-center">
                <p className="text-[black]">{props.time}</p>
                <p className={`w-[30%] h-[60%] bg-[${props.color}] rounded-xl`}>{props.progress}</p>
                {/* <p className={`w-[30%] h-[60%] bg-[#00E0FF] rounded-xl`}>{props.progress}</p> */}
            </div>
        </div>
    )
}

function Result() {
    const result_category = 
    [
        'Completed',
        'Umcompleted',
        'Today Ongoing'
    ]
    const result_time = 
    [
        '30min',
        '45min',
        '10min'
    ]

    const result_progress = 
    [
        '120%',
        '80%',
        '45%'
    ]

    const result_color =[
        '#00E0FF',
        '#929292',
        '#A85CF9',
    ]
    return (
        <div className="flex flex-col justify-center items-center w-[50%] h-[80%]">
            <select className="form-control" style={{
                width: "15vw"
            }}>
                <option>Weekly</option>
                <option>Monthly</option>
            </select>
            {
                result_category.map((item, index) => (

                    <Result_weekly category={item} time={result_time[index]} progress={result_progress[index]} color={result_color[index]} />
                ))
            }

        </div>
    )
}

export default Result