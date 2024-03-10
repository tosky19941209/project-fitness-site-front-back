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
    const videoPath = path.join(__dirname,`../sample_video/${index}/${category}`, `${exercise}.mp4`)
    res.sendFile(videoPath)
})

router.post('/signup', (req, res) => {
    const user = require('../config/model/users')
    const {username, password, email, height, weight} = req.body
    const newData = new user(req.body)
    console.log(newData)
    newData.save()
    .then(() => { 
        res.send("success")    
    })
    .catch((err) => {
        res.send("error:", err)
    })
})

router.pose('logs', (req, res) => {
    const logs = require('../config/model/') 
})



module.exports = router