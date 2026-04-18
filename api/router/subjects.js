const Subject = require('../model/subject')

const express = require('express')

const RouterSubject = express.Router()

RouterSubject.get('/', (req, res) => {
    Subject.find()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})

RouterSubject.post('/add', (req, res) => {
    let { subjecttitle,courseid, icon, tag, status, date } = req.body;
    // subjecttitle
    if (!subjecttitle || subjecttitle === '') {
        return res.json('Subject title must be required.')
    }
    if (/\d/.test(subjecttitle)) {
        return res.json('Subject title cannot contain number.')
    }
    if (subjecttitle.length < 3 || subjecttitle.length > 100) {
        return res.json("Subject title should be between 3 and 100 characters.");
    }
    if(!courseid || courseid==='')
    {
        return res.json('Courseid must be required')
    }
    //icon
    if (!icon || icon === '') {
        return res.json('Icon must be required.')
    }
    // tag validation

    if (!tag || tag === '') {
        return res.json('Tag must be required.')
    }
    // status validation
    // if (!status || status === '') {
    //     return res.json('Status must be required.')
    // }
    // if (!status || (status !== 'active' && status !== 'inactive')) {
    //     return res.json("Status must be either 'active' or 'inactive'.");
    // }

    // date validation
    if (!date || date === '') {
        return res.json('Date must be required.')
    }
    const validDate = new Date(date);
    if (isNaN(validDate.getTime())) {
        return res.json('Date must be a valid date.');
    }
    console.log(req.body)
    const subject = new Subject({
        subjecttitle: req.body['subjecttitle'],
        courseid: req.body['courseid'],
        icon: req.body['icon'],
        tag: req.body['tag'],
        status: req.body['status'],
        date: req.body['date']
    })
    subject.save()
        .then(() => {
            res.json('Subject added successfully')
        })
        .catch((err) => {
            res.send(err)
        })
})
RouterSubject.put('/update/:id', (req, res) => {
    Subject.updateOne(
        { _id: req.params['id'] },
        { $set: req.body }
    )
        .then(() => {
            res.send('deleted')
        })
        .catch((err) => {
            res.send(err)
        })
})
RouterSubject.delete('/del/:id', (req, res) => {
    Subject.deleteOne(
        { _id: req.params['id'] }
    )
        .then(() => {
            res.send('deleted')
        })
        .catch((err) => {
            res.send(err)
        })
})
module.exports = RouterSubject;
