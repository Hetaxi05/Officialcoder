const mongoose = require("mongoose");

const subtopicschema = mongoose.Schema({
    subtopictitle:String,
    topicid:String,
    content: String
})

const subTopic = mongoose.model("subtopic", subtopicschema, "subtopics");
module.exports = subTopic;