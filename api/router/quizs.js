const quiz = require('../model/quiz');
const Topic = require('../model/topic');
const Chapter = require('../model/chapter');
const express = require('express');
const RouterQuiz = express.Router();

RouterQuiz.get('/', (req, res) => {
    const query = {};

    if (req.query.topicid) {
        query.topicid = req.query.topicid;
    }

    if (req.query.courseid) {
        query.courseid = req.query.courseid;
    }

    quiz.find(query)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

RouterQuiz.get('/data', async (req, res) => {
    try {
        const { courseid, topicid } = req.query;
        let query = {};

        if (topicid) {
            query.topicid = topicid;
        }

        if (courseid) {
            query.courseid = courseid;
        }

        const quizzes = await quiz.find(query);
        res.json(quizzes);
    } catch (err) {
        console.error("Error fetching quizzes:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

RouterQuiz.get('/topic/:topicId', (req, res) => {
    quiz.find({ topicid: req.params.topicId })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

RouterQuiz.get("/quiz/:courseId", async (req, res) => {
    try {
        const data = await quiz.find({ courseid: req.params.courseId });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

RouterQuiz.get("/topicquiz/:topicId", async (req, res) => {
    try {
        const data = await quiz.find({ topicid: req.params.topicId });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

RouterQuiz.post("/", (req, res) => {
    const Quiz = new quiz({
        question: req.body.question,
        option: req.body.option,
        answer: req.body.answer,
        topicid: req.body.topicid,
        courseid: req.body.courseid
    });

    Quiz.save()
        .then(() => {
            res.json("Quiz data inserted successfully");
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

RouterQuiz.delete("/:id", (req, res) => {
    quiz.deleteOne({ _id: req.params.id })
        .then(() => {
            res.send("Quiz deleted successfully");
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

RouterQuiz.put("/:id", (req, res) => {
    quiz.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
        .then(() => {
            res.json("Quiz updated successfully");
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// This must be LAST
RouterQuiz.get('/:id', (req, res) => {
    quiz.findById(req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

module.exports = RouterQuiz;