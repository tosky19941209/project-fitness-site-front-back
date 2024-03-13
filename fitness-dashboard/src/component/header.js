import React, { useEffect, useRef, useState } from "react";
import api from '../service/axios'
import toastr from 'toastr';

function Header({ sideBarIndex, headerContent, setHeaderContent, setSideBarIndex }) {
    const content = [
        'OverView',
        'Fitness Analytics',
        'Diet Analytics',
        'Exercise Analytics'
    ]

    const signInBtn = useRef(null)

    const [showWidget, setShowWidget] = useState(false)
    const [avatarSrc, setAvatarSrc] = useState('user.png')
    const [avatarName, setAvatarName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handeKeyPress = (event) => {
        if (event.key === 'Enter') {
            signInBtn.current.click()
        }
    }

    useEffect(() => {
        const localEmail = localStorage.getItem("fitnessemail")
        const localPassword = localStorage.getItem("fitnesspassword")
        api.get('/signin', { params: { email: localEmail, password: localPassword } })
            .then((res) => {
                const newData = res.data
                if (newData.message === 'success') {
                    const name = newData.name
                    setAvatarName(name)
                }
            })
            .catch((err) => {
                console.log("err: ", err)
            })
    }, [])


    const SignIn = async (e) => {
        await api.get('/signin', { params: { email: email, password: password } })
            .then((res) => {
                const newData = res.data
                if (newData.message === 'success') {
                    const name = newData.name
                    setAvatarName(name)
                    const newHeader = {
                        email: email,
                        password: password
                    }
                    setShowWidget(false)
                    setHeaderContent(newHeader)
                    toastr.success("Welcome to fitness")
                    localStorage.setItem('fitnessemail', email)
                    localStorage.setItem('fitnesspassword', password)
                } else {
                    toastr.info("Email or password is not correct")
                }
            })
            .catch((err) => {
                console.log("err: ", err)
            })
    }

    return (
        <div className="flex flex-col justify-center w-[100%] h-[15%]">
            <div className=" flex justify-between" >
                <div></div>
                <p className="text-[#5534A5] text-[200%] ml-[10%]">{content[sideBarIndex]}</p>
                <div className="flex flex-col">
                    <div className="flex  items-center mr-10">
                        <button onClick={(e) => {
                            showWidget === true ? setShowWidget(false) : setShowWidget(true)
                        }}
                        ><img className="border rounded-[50%]" src={avatarSrc} width="80px"></img></button>
                        <p className="text-[#757575] ml-10">{avatarName}</p>
                    </div>

                </div>
            </div>
            <div className="flex justify-end absolute z-10 w-[90%] h-[1%] mt-[15%]">
                {
                    showWidget &&
                    <div className="flex flex-col justify-center items-center w-[30%] h-[250px] mr-[10%] mt-[-100px] border rounded-xl bg-[#F1EEF6] shadow-xl">
                        <div className="flex flex-col w-[90%] h-[80%] justify-center">

                            <p className="text-[black] text-left text-[20px]">Email</p>
                            <input value={email} className="form-control text-[black] mt-[-3%]"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}></input>

                            <p className="text-[black] text-left text-[20px]">Password</p>
                            <input value={password} onKeyPress={handeKeyPress} type="password" className="form-control text-[black] mt-[-3%]"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}></input>

                            <div className="flex justify-between mt-3">

                                <button ref={signInBtn} className="text-[#5534A5] text-[20px] ml-10 hover:bg-[#5534A5] hover:text-[white] duration-500 border rounded-[40px] w-[30%] h-[40px]"
                                    onClick={SignIn}>
                                    Sign in
                                </button>

                                <button className="text-[#5534A5] text-[20px] mr-10 hover:bg-[#5534A5] hover:text-[white] duration-500 border rounded-[40px] w-[30%] h-[40px]"
                                    onClick={(e) => {
                                        setShowWidget(false)
                                        localStorage.clear()
                                        setAvatarName('')
                                        setSideBarIndex(0)
                                    }}>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )

}
export default Header