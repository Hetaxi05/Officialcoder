const mongoose=require('mongoose')

const CourseSce=mongoose.Schema(
   {
      coursename:String,
      coursecode:String,
      duration:String,
      coursedetails:String,
      tag:String,
      image:String,
      category:String,
      chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
   }
)

const Course=mongoose.model('course',CourseSce,'Course')

module.exports=Course;