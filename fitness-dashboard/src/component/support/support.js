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
        <div className="flex justify-center items-center  w-[100%] h-[100%]">
            <textarea value={feedbackContent} className="text-[black] form-control" id="myTextarea" rows="4" cols="50" width="70%"
                style={{
                    width: "70%",
                    height: "50%"
                }}
                onChange={(e) => {
                    setFeedBackContent(e.target.value)
                }}
            >

            </textarea>

            <button className="flex justify-center items-center w-[10%] h-[7%] rounded-[50px] text-[#5534A5] mt-[40vh]"
                onClick={sendFeedBack}>
                <img src={`${hoverState === false ? 'send.png' : 'send_hover.png'}`} width="60%" height="50%"
                    onMouseEnter={(e) => { setHoverState(true) }}
                    onMouseLeave={(e) => { setHoverState(false) }}
                ></img>
            </button>
        </div>
    )
}

export default Support