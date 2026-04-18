
const subTopic=require('../model/subtopic')
const express = require("express");
const mongoose = require("mongoose");
const RouterSubtopic = express.Router();


RouterSubtopic.get('/', (req, res) => {
    subTopic.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        })
})

RouterSubtopic.get('/:id', (req, res) => {
    subTopic.find({ _id: req.params.id })
        .then((data) => {
            res.send(data[0]);
        })
        .catch((err) => {
            res.send(err);
        })
})
RouterSubtopic.post('/', (req, res) => {
    // console.log(req.body)
    const subtopic = new subTopic({
        subtopictitle:req.body['subtopictitle'],
        topicid: req.body['topicid'],
        content: req.body['content']
    })
    subtopic.save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.send(err);
        })

})
RouterSubtopic.delete('/:id', (req, res) => {
    subTopic.deleteOne({
        _id: req.params['id']
    })
        .then(() => {
            res.send("delete data");
        })
        .catch((err) => {
            res.send(err);
        })
})
 
RouterSubtopic.put('/:id', (req, res) => {

    subTopic.updateOne(
        {
            _id: req.params['id']
        },
        {
            $set:req.body
        }
    )
    .then(()=>{
        res.send("update data")
    })
    .catch((err)=>{
        res.send(err)
    })
    console.log(req.body);


})
// subtopicRouter.put('/:id', (req, res) => {
//     console.log("Received ID:", req.params.id);
//     console.log("Received Data:", req.body); // Debugging request body

//     subTopic.updateOne(
//         { _id: req.params.id },
//         { $set: req.body }
//     )
//         .then(() => {
//             res.send("Update successful");
//         })
//         .catch((err) => {
//             res.send(err)
//         })
// });

module.exports = RouterSubtopic;