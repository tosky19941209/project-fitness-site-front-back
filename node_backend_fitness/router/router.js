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

router.get('/signup', (req, res) => {

    const user = require('../config/model/users')

    const {username, password, email, height, weight} = req.query
    const newData = new user(req.query)
    console.log(newData)
    newData.save()
    .then(() => { 
        res.send("success")    
    })
    .catch((err) => {
        res.send("error:", err)
    })
})

router.get('/logs', (req, res) => {
    const logs = require('../config/model/logs') 
    const user = require('../config/model/users')

    const {email, password} = req.query
    console.log("ok")
    const person = user.findOne({email, password})
    .then( (result) => {
        res.send(result)
    })

})



module.exports = router