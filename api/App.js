const mongoose= require('mongoose')
const RouterCourse=require('./router/courses')
const RouterSubject=require('./router/subjects')
const RouterChapter=require('./router/chapters')
const RouterCategory=require('./router/categorys')
const RouterTopic=require('./router/topics')
const RouterUser=require('./router/users')
const RouterAdmin = require('./router/admin')
const RouterSubtopic=require('./router/subtopics')

const RouterQuiz=require('./router/quizs')
const RouterRole=require('./router/roles')
const RouterPayment = require('./router/Payments')
const RouterActivity=require('./router/activities')
const RouterContact=require('./router/Contacts')

require("dotenv").config();
// const subtopicRouter=require('./router/subtopics')
const express=require('express')
const cors=require('cors')

const server=express()
server.use(cors())
server.use(express.json({limit:"200mb"}))

server.use(express.urlencoded({ extended: true }));



server.use('/cour',RouterCourse)
server.use('/sub',RouterSubject)
server.use('/chap',RouterChapter)
server.use('/category',RouterCategory)
server.use('/topic',RouterTopic)
server.use('/admin',RouterAdmin)
server.use('/user',RouterUser)
server.use('/subtopics',RouterSubtopic)
server.use('/quiz',RouterQuiz)
server.use('/role',RouterRole)
server.use('/payment',RouterPayment)
server.use('/activity',RouterActivity)
server.use('/contact',RouterContact)
// server.use("/subtopic",subtopicRouter);

mongoose.connect('mongodb://localhost:27017/SubjectDB')

server.listen(5000,()=>{
    
    console.log("http://localhost:5000")
    // console.log("http://146.176.205.95:5000/") 
    // console.log("http://10.23.193.198:5000/")
   
})

