import React, { useEffect, useState } from "react";

function Meal({ type, foodDaily, index, setFoodDaily }) {
    // const index = props.index
    const food = foodDaily[index]
    const [newFood, setNewFood] = useState(food)
    const defaultCloseBtn = 'close.png'
    const hoverCloseBtn = 'close_hover.png'
    const [imgCloseSrc, setImgCloseSrc] = useState(defaultCloseBtn)
    const [showWidget, setShowWidget] = useState(false)
    const [editFood, setEditFood] = useState('')

    useEffect(() => {
        const newData = [...foodDaily]
        newData[index] = newFood
        setFoodDaily(newData)             
    }, [newFood])

    return (
        <div className="flex flex-col items-center border rounded-xl w-[20%] h-[95%] mt-3 ml-2 mr-2">
            <div className="border rounded-xl w-[95%] h-[10%] bg-[#F1EEF6] mt-1 ">
                <p className="text-[#5534A5] text-[90%] underline underline-offset-auto">{type}</p>
            </div>
            <button className="flex border rounded-xl justify-center items-center w-[40%] h-[6%] mt-1 bg-[#F1EEF6] text-[black] text-[20px] hover:text-[#5534A5]"
                onClick={(e) => {
                    setShowWidget(true)
                }}
            >
                Add Plan
            </button>
            {
                showWidget &&
                <div className="flex flex-col justify-center  w-[90%] h-[20%] mt-[-1%]">
                    <p className="text-[black] text-[15px] text-left ml-3">Food</p>
                    <input
                        className="form-control mt-[-5%]"
                        style={{
                            width: "100%",
                            height: '55%'
                        }}
                        value={editFood}
                        onChange={(e) => {
                            setEditFood(e.target.value)
                        }}
                    />
                    <div className="flex justify-between items-center mt-1">
                        <button className="text-[20px] text-[black] hover:text-[red] ml-10"
                            onClick={(e) => {
                                const newData = newFood
                                newData.push(editFood)
                                setNewFood(newData)
                                setShowWidget(false)
                            }}>
                            Add
                        </button>
                        <button className="text-[20px] text-[black] hover:text-[red] mr-10"
                            onClick={(e) => {
                                setShowWidget(false)
                            }}>
                            Close
                        </button>
                    </div>

                </div>
            }

            {
                newFood.map((item, index) => (

                    <div className="flex border w-[94%] h-[15%] rounded-xl mt-2 justify-between">
                        <div className="w-[12px] bg-[#5534A5] rounded-xl" />
                        <div className="flex justify-between items-center w-[94%] rounded-xl">
                            <p className="text-black text-left ml-5 mt-4 text-[18px]">{item}</p>
                        </div>
                        <div className="flex  mt-3 h-[10%]">
                            <button onClick={(e) => {
                                const newData = []
                                for (let i = 0; i < newFood.length; i++) {
                                    if (i !== index)
                                        newData.push(newFood[i])
                                }
                                setNewFood(newData)
                            }}>
                                <img
                                    src={imgCloseSrc}
                                    onMouseEnter={() => { setImgCloseSrc(hoverCloseBtn) }}
                                    onMouseLeave={() => { setImgCloseSrc(defaultCloseBtn) }}
                                    width='50px'
                                />
                            </button>
                        </div>
                    </div>

                ))
            }
        </div>
    )
}

export default Meal