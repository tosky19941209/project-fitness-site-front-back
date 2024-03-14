import React, { useEffect, useState } from "react";
import toastr from "toastr";
function SideBar({ mainContent, setMainContent }) {
    const logo_url = 'logo.png'
    const sideBar_Dash_Btn = [
        'OverView',
        'Fitness Analytics',
        'Diet Analytics',
        'Exercise'
    ]
    const sideBar_Foot_Btn = [
        'Support',
    ]

    useEffect(() => {
        if (mainContent.sideBar === 0)
            setAccidentID(0)
    }, [mainContent])

    const [accidentID, setAccidentID] = useState(0)

    return (
        <div className="flex flex-col justify-center items-center bg-white-100 w-[20%]  border ml-0">
            <div className="flex flex-col justify-start items-center w-full h-4/6 ">
                {
                    sideBar_Dash_Btn.map((item, index) => (
                        <div className="flex items-center w-[90%] h-[15%] mt-2 mb-2 ">
                            <div className={`w-[5%]  h-[50%] ${accidentID === index ? 'bg-[#5534A5]' : ''} rounded-xl ml-[-5%]`} />
                            <button className={`${accidentID === index ? 'text-[#5534A5]' : 'text-[#757575]'} flex justify-center items-center font-1xl hover:text-[#5534A5] duration-500`}
                                onClick={
                                    (e) => {
                                        const email = localStorage.getItem("fitnessemail")
                                        if (email) {
                                            setAccidentID(index)
                                            const newData = { ...mainContent, sideBar: index }
                                            setMainContent(newData)
                                        } else {
                                            toastr.info("please Log in!")
                                        }
                                    }}>
                                <img className="mr-6 ml-8" width='40px' src={`${accidentID === index ? item + '_active.png' : item + '.png'}`} />
                                <p className="mt-[6%] text-[0px] lg:text-[60%] md:text-[0px] sm:text-[0px]">{item}</p>
                            </button>
                        </div>
                    ))
                }
            </div>

            <div className="flex flex-col justify-center items-center w-full h-1/6">
                {
                    sideBar_Foot_Btn.map((item, index) => (
                        <div className="flex items-center w-[90%] h-[45%] mt-2 mb-2">
                            <div className={`w-[5%]  h-[80%] ${accidentID === index + 4 ? 'bg-[#5534A5]' : ''} rounded-xl ml-[-5%]`} />
                            <button className={`${accidentID === index + 4 ? 'text-[#5534A5]' : 'text-[#757575]'} flex justify-center items-center font-1xl hover:text-[#5534A5] duration-500`}
                                onClick={
                                    (e) => {
                                        const email = localStorage.getItem("fitnessemail")
                                        if (email) {
                                            setAccidentID(index + 4)
                                            const newData = { ...mainContent, sideBar: index + 4 }
                                            setMainContent(newData)
                                        } else {
                                            toastr.info("please Log in!")
                                        }
                                    }}>
                                <img className="mr-6 ml-8" width='40px' src={`${accidentID === index + 4 ? item + '_active.png' : item + '.png'}`} />
                                <p className="text-[0px] lg:text-[60%] md:text-[0px] sm:text-[0px] mt-[6%]">{item}</p>
                            </button>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default SideBar;