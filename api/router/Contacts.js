const Contact = require('../model/contact')
const express = require('express');
const RouterContact = express.Router();

RouterContact.get('/', (req, res) => {
    Contact.find()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})
RouterContact.post('/', (req, res) => {
    const contact = new Contact({
        username: req.body['username'],
        email: req.body['email'],
        subject: req.body['subject'],
        message: req.body['message']
    })
    contact.save()
        .then(() => {
            res.json("inserted sucessfully")
        })
        .catch((err) => {
            res.send(err)
        })
})

RouterContact.put('/reply/:id', (req, res) => {
    Contact.updateOne(
        { _id: req.params['id'] },
        {
            $set: {
                adminReply: req.body['adminReply'],
                isMessageSent: true
            }
        }
    )
        .then(() => {
            res.json("message sent successfully")
        })
        .catch((err) => {
            res.send(err)
        })
})

RouterContact.delete('/:id',(req,res)=>{
    Contact.deleteOne(
        { _id: req.params['id'] }
    )
        .then(() => {
            res.send('deleted')
        })
        .catch((err) => {
            res.send(err)
        })
})
module.exports = RouterContact;