const mongoose = require("mongoose");

const quizschema = mongoose.Schema({
    question: String,
    option: [{ text: String }],
    answer: String,
    topicid: String,
    courseid: String 
    
})

const quiz = mongoose.model('quiz', quizschema, 'Quize')
module.exports = quiz;


