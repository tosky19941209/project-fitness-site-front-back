import React from "react";

function Support() {
    return (
        <div className="flex flex-col justify-center items-center  w-[100%] h-[100%] bg-orange-100">
            <textarea className="text-[black] form-control" id="myTextarea" rows="4" cols="50" width="70%"
                style={{
                    width: "70%",
                    height: "50%"
                }}>

            </textarea>

            <button className="w-[10%] h-[7%] border rounded-[50px] bg-[#F1EEF6] text-[#5534A5]">
                
                <p>Send</p>
            </button>
        </div>
    )
}

export default Support