import React, { useEffect, useState } from "react";
import api from "../../service/axios";
function Support() {
    const [hoverState, setHoverState] = useState(false)
    const [feedbackContent, setFeedBackContent] = useState('')
    const today = new Date()


    const sendFeedBack = (e) => {

        const header = {
            email: localStorage.getItem('fitnessemail'),
            password: localStorage.getItem('fitnesspassword')
        }
        const updateData = {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            date: today.getDate(),
            hour: today.getHours(),
            minute: today.getMinutes(),
            feedback: feedbackContent
        }
        api.post('/setfeedback', { header: header, updateData: updateData })
            .then((res) => {
                if (res.data.message === 'success') {

                }
            })
    }

    return (
        <div className="flex flex-col items-center   justify-center  w-[100%] h-[80%]">
            <textarea value={feedbackContent} className="text-[black] form-control xl:mt-[-10%]" id="myTextarea" rows="4" cols="50" width="70%"
                style={{
                    width: "70%",
                    height: "50%"
                }}
                onChange={(e) => {
                    setFeedBackContent(e.target.value)
                }}
            >

            </textarea>

            <button className="flex justify-center items-center w-[70%] h-[7%] rounded-xl bg-[#F1EEF6] mt-[10%] xl:mt-[10vh] border"
                onMouseEnter={(e) => { setHoverState(true) }}
                onMouseLeave={(e) => { setHoverState(false) }}
                onClick={sendFeedBack}>
                <img className="w-[40px] md:w-[50px]" src={`${hoverState === false ? 'send.png' : 'send_hover.png'}`}
                    onMouseEnter={(e) => { setHoverState(true) }}
                    onMouseLeave={(e) => { setHoverState(false) }}
                ></img>
            </button>
        </div>
    )
}

export default Support