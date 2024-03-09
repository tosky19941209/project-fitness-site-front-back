import React from "react";

function Header() {
    return (
        <div className="flex justify-between mt-10">
            <div></div>
            <p className="text-[#5534A5] text-[200%]">Fitness Analytics</p>
            <div className="flex  items-center mr-10">
                <img className="border rounded-[50%]" src='avatar.jpg' width="80px"></img>
                <p className="text-[#757575] ml-10">Felix Eliass</p>
            </div>
        </div>
    )

}
export default Header