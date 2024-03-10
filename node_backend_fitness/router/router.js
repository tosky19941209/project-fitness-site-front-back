const express = require('express')
const config = require('../config/env/config')
const { json } = require('body-parser')
const router = express.Router()
const path = require('path')
const { rmSync } = require('fs')


router.get('/test', (req, res) => {
    res.send("Welcome to fitness site")
})

router.get('/video_load', (req, res) => {
    const data = req.query
    const category = data.category
    const exercise = data.exercise
    const index = data.index
    const videoPath = path.join(__dirname, `../sample_video/${index}/${category}`, `${exercise}.mp4`)
    res.sendFile(videoPath)
})

router.post('/signup', (req, res) => {
    const user = require('../config/model/users')
    const newData = req.body
    const { username, password, email, height, weight } = newData
    user.findOne({ email })
        .then((response) => {
            if (response) {
                res.status(404).json({
                    message: "User is already existed"
                })
            } else {
                const newUser = new user(newData)
                newUser.save()
                    .then(() => {
                        res.status(404).json({
                            message: "success"
                        })
                    })
                    .then((err) => {
                        console.log("err: ", err)
                    })
            }
        })

})

router.post('/signupUpdate', (req, res) => {
    const user = require('../config/model/users')
    const header = req.body.header
    const updateData = req.body.updateData
    const { email, password } = header
    user.findOneAndUpdate({
        email: email,
        password: password
    }, updateData, { new: true })
        .then((response) => {
            if (response) {
                res.status(404).json({
                    message: "success"
                })
            } else {
                res.status(404).json({
                    message: "Email or password is not correct."
                })
            }
        })
        .catch((err) => {
            console.log(err)
        });
})

router.post('/logs', (req, res) => {
    const logs = require('../config/model/logs')
    const user = require('../config/model/users')
    const newData = req.body
    const header = newData.header
    const updateData = newData.updateData
    const { email, password } = header

    let state = true

    user.findOne({ email, password })
        .then(async (result) => {

            await logs.find({ userid: result._id })
                .then((response) => {
                    response.map((item, index) => {

                        const existData = {
                            exerciseType: item.exerciseType,
                            startTime: item.startTime,
                            endTime: item.endTime,
                            counter: item.counter,
                            accuracy: item.accuracy
                        }

                        const currentData = {
                            exerciseType: updateData.exerciseType,
                            startTime: updateData.startTime,
                            endTime: updateData.endTime,
                            counter: updateData.counter,
                            accuracy: updateData.accuracy
                        }
                        const string1 = JSON.stringify(existData)
                        const string2 = JSON.stringify(currentData)
                        if (string1 === string2) {
                            state = false
                        }
                    })
                })

            if (state) {
                const newlog = new logs({
                    userid: result._id,
                    exerciseType: updateData.exerciseType,
                    startTime: updateData.startTime,
                    endTime: updateData.endTime,
                    counter: updateData.counter,
                    accuracy: updateData.accuracy
                })
                newlog.save()
                    .then(() => {
                        res.status(404).json({
                            message: "success"
                        })
                    })
            } else {
                res.status(404).json({
                    message: "Double"
                })
            }
        })
})

router.post('/diet', (req, res) => {
    const user = require('../config/model/users')
    const diet = require('../config/model/diet')
    const newData = req.body
    const { email, password } = newData.header
    const updateData = newData.updateData
    user.findOne({ email: email, password: password })
        .then(async (result) => {
            if (result === null) {
                res.status(404).json({
                    message: "User is not registed."
                })
                return
            }

            let addStatus = null
            
            await diet.find({ userid: result._id })
                .then((response) => {
                    if (response.length === 0) {
                        addStatus = true
                    } else {

                        addStatus = true

                        const currentData = {
                            year: updateData.year,
                            month: updateData.month,
                            date: updateData.date,
                            day: updateData.day,
                        }

                        response.map((item, index) => {
                            const existData = {
                                year: item.year,
                                month: item.month,
                                date: item.date,
                                day: item.day,
                            }
                            const string1 = JSON.stringify(existData)
                            const string2 = JSON.stringify(currentData)
                            if (string1 === string2){
                                console.log("ok")
                                addStatus = false
                            }
                        })
                    }
                })

            if (addStatus === true) {
                const newDiet = new diet({
                    userid: result._id,
                    year: updateData.year,
                    month: updateData.month,
                    date: updateData.date,
                    day: updateData.day,
                    meal: updateData.meal
                })
                newDiet.save()
                    .then(() => {
                        res.status(404).json({
                            message: "added"
                        })
                    })
            }
            else {
                await diet.findOneAndUpdate(
                    {
                        userid: result._id,
                        year: updateData.year,
                        month: updateData.month,
                        date: updateData.date,
                        day: updateData.day
                    },
                    updateData,
                    { new: true })
                    .then(() => {
                        res.status(404).json({
                            message: "Updated"
                        })
                    })
                    .catch((err) => {
                        res.status(404).json({
                            message: "failed"
                        })
                    })
            }
        })
})

module.exports = router