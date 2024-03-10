const express = require('express')
const config = require('../config/env/config')
const { json } = require('body-parser')
const router = express.Router()
const path = require('path')


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
    const header = req.body.header
    const newData = req.body.updateData
    const { email, password } = header
    const { exerciseType, startTime, endTime, counter, accuracy } = newData

    user.findOne({ email, password })
        .then((result) => {
            let state = true

            logs.find({ userid: result._id })
                .then((response) => {
                    response.map((item, index) => {
                        const existData = {
                            exerciseType: item.exerciseType,
                            startTime: item.startTime,
                            endTime: item.endTime,
                            counter: item.counter,
                            accuracy: item.accuracy
                        }
                        if (newData == existData) {
                            state = false
                        } else {
                            state = true
                        }
                    })
                })
            res.status(404).json({
                message: state
            })
            // if (state) {
            //     const newData = new logs({
            //         userid: result._id,
            //         exerciseType: exerciseType,
            //         startTime: startTime,
            //         endTime: endTime,
            //         counter: counter,
            //         accuracy: accuracy
            //     })
            //     newData.save()
            //         .then(() => {
            //             res.status(404).json({
            //                 message: "success"
            //             })
            //         })
            // } else {
            //     res.status(404).json({
            //         message: "Duplicate"
            //     })
            // }
        })
})

router.post('/diet', (req, res) => {
    const user = require('../config/model/users')
    const diet = require('../config/model/diet')
    const newData = req.body
    const { email, password } = newData.header

    user.findOne({ email: email, password: password })
        .then((result) => {
            if (result) {
                const newDiet = new diet({
                    userid: result._id,
                    year: newData.year,
                    month: newData.month,
                    date: newData.date,
                    day: newData.day,
                    meal: newData.meal,
                })
                newDiet.save()
                    .then(() => {
                        res.status(404).json({
                            message: "success"
                        })
                    })
                    .catch((err) => {
                        res.status(404).json({
                            message: "err"
                        })
                    })
            } else {
                res.status(404).json({
                    message: "User is not registed."
                })
            }
        })
})

router.post('/dietUpdate', (req, res) => {

    const user = require('../config/model/users')
    const diet = require('../config/model/diet')

    const newData = req.body
    const header = newData.header
    const { email, password } = header
    const updateData = newData.updateData

    user.findOne({ email, password })
        .then((result) => {
            if (result) {
                diet.findOneAndUpdate({ userid: result._id }, updateData)
                    .then(() => {
                        res.status(404).json({
                            message: "success"
                        })
                    })
                    .catch((err) => {
                        res.status(404).json({
                            message: "failed"
                        })
                    })
            } else {
                res.status(404).json({
                    message: "User is not registed."
                })
            }
        })

})

module.exports = router