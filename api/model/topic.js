const mongoose=require('mongoose')

const TopicSce=mongoose.Schema({
    title:String,
    tag:String,
    content:String,
    readingtime:String,
    chapterid:String,
    quizAvailable: { type: Boolean, default: false } 
})
const Topic=mongoose.model('topic',TopicSce,'Topic')
module.exports=Topic;