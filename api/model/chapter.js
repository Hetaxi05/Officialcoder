const mongoose=require('mongoose')

const ChapterSce=mongoose.Schema({
    chaptertitle:String,
    courseid:String,
    tag:String,
    status:String,
    date:String,
    paid:String
})

const Chapter=mongoose.model('chapter',ChapterSce,'chapter')

module.exports=Chapter;