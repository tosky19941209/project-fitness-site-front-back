const express = require('express')
const config = require('../config/env/config')
const { Gym_exercise, House_exercise, exercise1 } = require('../config/analysis_exercise/category_exercise')
const { json } = require('body-parser')
const router = express.Router()
const path = require('path')
router.get('/test', (req, res) => {
    res.send(req.query)
})

let state_counter = false
let counter = 0
let decimal_point = 2

router.get('/video_load', (req, res) => {
    const data = req.query
    const category = data.category
    const exercise = data.exercise
    const videoPath = path.join(__dirname,`../sample_video/${category}`, `${exercise}.mp4`)
    res.sendFile(videoPath)
})

router.get('/changed_exercise', (req, res) => {
    Gym_exercise
    res.send("success")
})

router.post('/training', (req, res) => {
    results_data = req.body.data
    kind_exercise = req.body.kind_exercise
    state_change_exercise = req.body.state_change_exercise
    if(kind_exercise.category === 'Gym'){
       const result = Gym_exercise(results_data, kind_exercise.exercise, state_change_exercise)
       res.send(result)
    }
    else if (kind_exercise.category === 'House'){
        const result = House_exercise(results_data, kind_exercise.exercise, state_change_exercise)
        res.send(result)
    }
})


router.post('/exercise_1', (req, res) => {
    // console.log("ok1")
    results_data = req.body
    landmark1 = config.index_landmark.right_shoulder
    landmark2 = config.index_landmark.right_hip
    landmark3 = config.index_landmark.right_ankle

    const accuracy = exercise1(results_data, landmark1, landmark2, landmark3)
    const new_accuracy = accuracy.toFixed(decimal_point)
    if (new_accuracy > 80 && state_counter === false) {
        counter++;
        state_counter = true;
    }
    else if (new_accuracy < 20) {
        state_counter = false;
    }
    res.send({ accuracy: new_accuracy, counter: counter, kind_exercise: 'exercise_1' })
})






module.exports = router