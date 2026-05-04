const role = require('../model/role');
const express = require('express');
const RouterRole = express.Router();

RouterRole.get('/', (req, res) => {
    role.find()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})

RouterRole.get('/:id', (req, res) => {
    role.find({
        _id: req.params.id
    })
        .then((data) => {
            res.send(data[0])

        })
        .catch((err) => {
            res.send(err)
        })
})

RouterRole.post("/", (req, res) => {
    const Role = new role({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        permission: req.body.permission
    })
    Role.save()
        .then(() => {
            res.json("insert data")
        })
        .catch((err) => {
            res.send(err)
        })
})

RouterRole.delete("/:id", (req, res) => {
    role.deleteOne({
        _id: req.params['id']
    })
        .then(() => {
            res.json("delete data")
        })
        .catch((err) => {
            res.send(err)
        })

})

RouterRole.put("/:id", (req, res) => {
    role.updateOne(
        {
            _id: req.params['id']
        },
        {
            $set: req.body
        }
    )
        .then(() => {
            res.json("update data")
        })
        .catch((err) => {
            res.send(err)
        })
})


module.exports = RouterRole;