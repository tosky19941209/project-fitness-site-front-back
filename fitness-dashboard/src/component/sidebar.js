import React, { useEffect, useState } from "react";
import toastr from "toastr";
function SideBar({ mainContent, setMainContent }) {
    const logo_url = 'logo.png'
    const sideBar_Dash_Btn = [
        'OverView',
        'Fitness Analytics',
        'Diet Analytics',
    ]
    const sideBar_Foot_Btn = [
        'Support',
        'My Profile'
    ]




    const [accidentID, setAccidentID] = useState(0)
    const [accidentFootID, setAccidentFootID] = useState(-1)

    return (
        <div className="flex flex-col bg-white-100 w-[20%] border">

            <div className="flex justify-center items-center w-full h-1/6">
                <img src={logo_url} width="60px" height="60px"></img>
                <p className="text-black">Training Body</p>
            </div>

            <div className="flex flex-col w-full h-4/6 ">
                {
                    sideBar_Dash_Btn.map((item, index) => (
                        <div className="flex items-center w-[90%] h-[15%] mt-2 mb-2 ">
                            <div className={`w-[10%] h-[50%] ${accidentID === index ? 'bg-[#5534A5]' : ''} rounded-xl ml-[-5%]`} />
                            <button className={`${accidentID === index ? 'text-[#5534A5]' : 'text-[#757575]'} font-1xl flex  items-center hover:text-[#5534A5] duration-500`}
                                onClick={
                                    (e) => {
                                        const email = localStorage.getItem("email")
                                        if (email) {
                                            setAccidentID(index)
                                            const newData = { ...mainContent, sideBar: index }
                                            setMainContent(newData)
                                        }else {
                                            toastr.info("please Log in!")
                                        }
                                    }}>
                                <img className="mr-6 ml-14" width='40px' src={`${accidentID === index ? item + '_active.png' : item + '.png'}`} />
                                <p className="text-[15px]">{item}</p>
                            </button>
                        </div>
                    ))
                }
            </div>

            <div className="flex flex-col w-full h-1/6">
                {
                    sideBar_Foot_Btn.map((item, index) => (
                        <button className={`${accidentFootID === index ? 'text-[#5534A5]' : 'text-[#757575]'} font-1xl mt-2 mb-8  flex  items-center hover:text-[#5534A5]`}
                            onClick={
                                (e) => {
                                    setAccidentFootID(index)
                                }}
                        ><img className="mr-6 ml-14" width='30px' src={`${item}.png`} /><p className="text-[15px]">{item}</p></button>
                    ))
                }
            </div>

        </div>
    )
}

export default SideBar;