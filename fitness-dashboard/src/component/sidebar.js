import React, { useEffect, useState } from "react";
import toastr from "toastr";
function SideBar({ mainContent, setMainContent }) {
    const logo_url = 'logo.png'
    const sideBar_Dash_Btn = [
        'OverView',
        'Fitness Analytics',
        'Diet Analytics',
        'Exercise Page'
    ]
    const sideBar_Foot_Btn = [
        'Support',
        'My Profile'
    ]

    useEffect(() => {
        if (mainContent.sideBar === 0)
            setAccidentID(0)
    }, [mainContent])

    const [accidentID, setAccidentID] = useState(0)

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
                                        const email = localStorage.getItem("fitnessemail")
                                        if (email) {
                                            setAccidentID(index)
                                            const newData = { ...mainContent, sideBar: index }
                                            setMainContent(newData)
                                        } else {
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
                        <div className="flex items-center w-[90%] h-[35%] mt-2 mb-2">
                            <div className={`w-[10%] h-[100%] ${accidentID === index + 4 ? 'bg-[#5534A5]' : ''} rounded-xl ml-[-5%]`} />
                            <button className={`${accidentID === index + 4 ? 'text-[#5534A5]' : 'text-[#757575]'} font-1xl flex  items-center hover:text-[#5534A5] duration-500`}
                                onClick={
                                    (e) => {
                                        const email = localStorage.getItem("fitnessemail")
                                        if (email) {
                                            setAccidentID(index + 4)
                                            const newData = { ...mainContent, sideBar: index + 4}
                                            setMainContent(newData)
                                        } else {
                                            toastr.info("please Log in!")
                                        }
                                    }}
                            ><img className="mr-6 ml-14" width='30px' src={`${item}.png`} />
                                <p className="text-[15px]">{item}</p>
                            </button>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default SideBar;