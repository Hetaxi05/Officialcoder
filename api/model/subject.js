const mongoose=require('mongoose')

const SubjectSce=mongoose.Schema({
        subjecttitle:String,
        courseid:String,
        icon:String,
        tag:String,
        status:String,
        date:Date
        
})

const Subject=mongoose.model('subject',SubjectSce,'sub')

module.exports=Subject;