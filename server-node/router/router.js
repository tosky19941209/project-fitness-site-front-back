const express = require('express')
const config = require('../config/env/config')
const { exercise1 } = require('../config/env/cal_function')
const { json } = require('body-parser')
const router = express.Router()

router.get('/test', (req, res) => {
    console.log(req.query)
    res.send(req.query)
})

let state_counter = false
let counter = 0

router.get('/changed_exercise', (req, res) => {
    counter = 0
    res.send('success')
})

router.post('/exercise_1', (req, res) => {

    results_data = req.body
    landmark1 = config.index_landmark.right_shoulder
    landmark2 = config.index_landmark.right_hip
    landmark3 = config.index_landmark.right_ankle

    const accuracy = exercise1(results_data, landmark1, landmark2, landmark3)
    const new_accuracy = accuracy.toFixed(4)
    if (new_accuracy > 80 && state_counter === false) {
        counter++;
        state_counter = true;
    }
    else if (new_accuracy < 20) {
        state_counter = false;
    }
    res.send({ accuracy: new_accuracy, counter: counter, kind_exercise: 'exercise_1' })

})

router.post('/exercise_2', (req, res) => {

    results_data = req.body
    landmark1 = config.index_landmark.right_shoulder
    landmark2 = config.index_landmark.right_hip
    landmark3 = config.index_landmark.right_ankle

    const accuracy = exercise1(results_data, landmark1, landmark2, landmark3)
    const new_accuracy = accuracy.toFixed(4)
    if (new_accuracy > 80 && state_counter === false) {
        counter = counter + 100;
        state_counter = true;
    }
    else if (new_accuracy < 20) {
        state_counter = false;
    }
    res.send({ accuracy: new_accuracy, counter: counter, kind_exercise:'exercise_2' })
})

router.post('/exercise_3', (req, res) => {

    results_data = req.body
    landmark1 = config.index_landmark.right_shoulder
    landmark2 = config.index_landmark.right_hip
    landmark3 = config.index_landmark.right_ankle

    const accuracy = exercise1(results_data, landmark1, landmark2, landmark3)
    const new_accuracy = accuracy.toFixed(4)
    if (new_accuracy > 80 && state_counter === false) {
        counter = counter + 100;
        state_counter = true;
    }
    else if (new_accuracy < 20) {
        state_counter = false;
    }
    res.send({ accuracy: new_accuracy, counter: counter, kind_exercise:'exercise_3' })
})



module.exports = router