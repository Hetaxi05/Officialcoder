const Topic=require('../model/topic')
const express=require('express')
const RouterTopic=express.Router();

RouterTopic.get('/',(req,res)=>{
    Topic.find()
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
})
RouterTopic.get('/:id', (req, res) => {
   
    Topic.find({_id:req.params.id})
        .then((data) => {
            res.send(data[0])
        })
        .catch((err) => {
            res.send(err)
        })
})

RouterTopic.get('/chapter/:id', (req, res) => {
   
    Topic.find({"chapterid":req.params.id})
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})

RouterTopic.post('/add', (req, res) => {
    // console.log(req.body)
    const topic = new Topic(
        {
            "title": req.body['title'],
            "tag": req.body['tag'],
            "content": req.body['content'],
            "readingtime": req.body['readingtime'],
            "chapterid": req.body['chapterid']
        }
    )
    topic.save()
        .then(() => {
            res.json("inserted successfully")
        })
        .catch((err) => {
            res.send(err)
        })
})

RouterTopic.put('/update/:id', (req, res) => {
    Topic.updateOne(
        { _id: req.params['id'] },
        { $set: req.body }
    )
        .then(() => {
            res.send('updated successfully')
        })
        .catch((err) => {
            res.send(err)
        })
})

RouterTopic.delete('/del/:id', (req, res) => {
    Topic.deleteOne(
        { _id: req.params['id'] }
    )
        .then(() => {
            res.send('deleted successfully')
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports=RouterTopic;