const mongoose=require('mongoose')

const categorySce=mongoose.Schema(
    {
        categoryname:String,
        tag:String,
        icon:String
    }
)
const Category=mongoose.model('category',categorySce,'category')

module.exports=Category;