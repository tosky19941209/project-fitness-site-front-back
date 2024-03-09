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

router.get('/changed_exercise', (req, res) => {
    res.send("success")
})

router.get('/regist_exercise', (req, res) => {
    const mongo_model = require('../config/model/model')

    const {username, password} = req.query
    const newData = new mongo_model({username, password})
    console.log(newData)
    newData.save()
    .then(() => { 
        res.send("success")    
    })
    .catch((err) => {
        res.send("error:", err)
    })
})

module.exports = router