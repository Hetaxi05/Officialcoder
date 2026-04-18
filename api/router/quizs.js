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
            res.send(err);
        });
});


RouterQuiz.get('/data', async (req, res) => {
    try {
        const { courseid, topicid } = req.query;
        let query = {};

        if (topicid) {
            // Find chapter ID from the topic
            const topicData = await Topic.findById(topicid);
            if (!topicData) {
                return res.status(404).json({ error: "Topic not found" });
            }
            const chapterId = topicData.chapterid;
            console.log(chapterId)

            // Find course ID from the chapter
            const chapterData = await Chapter.findById(chapterId);
            if (!chapterData) {
                return res.status(404).json({ error: "Chapter not found" });
            }
            const derivedCourseId = chapterData.courseid;

            // Set filters: Either topicid OR courseid (derived from topic)
            // query = { $or: [{ topicid }, { courseid: derivedCourseId }] };
            query = { $or: [{ topicid }] };
        }

        if (courseid) {
            query.courseid = courseid; // Directly filter by course ID if provided
        }

        console.log(query);
        const quizzes = await quiz.find(query);
        res.json(quizzes);
    } catch (err) {
        console.error("Error fetching quizzes:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


RouterQuiz.get('/:id', (req, res) => {
    quiz.find({ _id: req.params.id })
        .then((data) => {
            res.send(data[0])
        })
        .catch((err) => {
            res.send(err)
        })
})
RouterQuiz.get('/topic/:topicId', (req, res) => {
    quiz.find({ topicid: req.params.topicId })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})

// RouterQuiz.get('/:courseId', (req, res) => {
//     // console.log(req.body)
//     quiz.find({ courseid: req.params.courseId })
//         .then((data) => res.send(data))
//         .catch((err) => res.status(500).send(err));
// });

RouterQuiz.get("/quiz/:courseId", async (req, res) => {
    try {
        // Example DB fetch
        const quiz = await quiz.find({ courseId: req.params.courseId });
        // Make sure you actually send the data
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
RouterQuiz.get("/topicquiz/:topicId", async (req, res) => {
    try {
        console.log("Topic Id for Quiz: ",req.params.topicId)
        // Example DB fetch
        const data = await quiz.find({ "topicid": req.params.topicId });
        console.log(data);
        // Make sure you actually send the data
        res.json(data);
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

RouterQuiz.post("/", (req, res) => {
    // console.log(req.body);
    const Quiz = new quiz({
        // question: req.body['question'],
        // option: req.body['option'],
        // answer: req.body['answer']
        question: req.body.question,
        option: req.body.option,
        answer: req.body.answer,
        topicid: req.body.topicid,
        courseid: req.body.courseid
    })
    Quiz.save()
        .then(() => {
            res.json("Quiz data inserted successfully");
        })
        .catch((err) => {
            res.send(err)
        })
})

RouterQuiz.delete("/:id", (req, res) => {
    quiz.deleteOne(
        {
            _id: req.params['id']
        }
    )
        .then(() => {
            res.send("Quiz deleted successfully")
        })
        .catch((err) => {
            res.send(err)
        })
})

RouterQuiz.put("/:id", (req, res) => {
    console.log(req.body)
    quiz.updateOne(
        { _id: req.params['id'] }
        ,
        { $set: req.body }
    )
        .then(() => {
            res.json("Quiz updated successfully")
        })
        .catch((err) => {
            res.send(err)
        })
})





module.exports = RouterQuiz;