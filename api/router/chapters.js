const express = require('express')
// const Topic=require('../model/topic')
const Topic = require('../model/topic')
const Chapter = require('../model/chapter')
const subTopic = require('../model/subtopic');

const RouterChapter = express.Router()
RouterChapter.get('/course/:courseId', (req, res) => {
    const { courseId } = req.params;
    // console.log("Received Course ID:", courseId); // Debugging

    Chapter.find({ courseid: courseId }) // Fetch chapters for the course
        .then((chapters) => {
            // console.log("Chapters Found:", chapters.length); // Debugging

            // For each chapter, fetch topics and then subtopics for each topic
            const chapterPromises = chapters.map((chapter) => {
                return Topic.find({ chapterid: chapter._id })
                    .then((topics) => {
                        // console.log(`Topics for Chapter ${chapter._id}:`, topics.length); // Debugging

                        // For each topic, fetch its subtopics
                        const topicPromises = topics.map((topic) => {
                            return subTopic.find({ topicid: topic._id })
                                .then((subtopics) => {
                                    console.log(`Subtopics for Topic ${topic._id}:`, subtopics.length); // Debugging
                                    // Return topic object with nested subtopics array
                                    return { ...topic.toObject(), subtopics };
                                });
                        });

                        return Promise.all(topicPromises)
                            .then((topicsWithSubtopics) => {
                                // Return chapter object with topics (each with nested subtopics)
                                return { ...chapter.toObject(), topics: topicsWithSubtopics };
                            });
                    });
            });

            return Promise.all(chapterPromises);
        })
        .then((chaptersWithTopicsAndSubtopics) => {
            res.send(chaptersWithTopicsAndSubtopics);
        })
        .catch((err) => {
            console.error("Error fetching data:", err);
            res.status(500).send(err);
        });
});


RouterChapter.get('/', (req, res) => {

    Chapter.find()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})


// Count total chapters
RouterChapter.get('/count/total', async (req, res) => {
    try {
        const count = await Chapter.countDocuments();
        res.json({ totalChapters: count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching total chapters', error });
    }
});

RouterChapter.get('/:id', (req, res) => {

    Chapter.find({ _id: req.params.id })
        .then((data) => {
            res.send(data[0])
        })
        .catch((err) => {
            res.send(err)
        })
})


RouterChapter.post('/add', (req, res) => {
    console.log(req.body)
    const chapter = new Chapter(
        {
            'chaptertitle': req.body['chaptertitle'],
            'courseid': req.body['courseid'],
            'tag': req.body['tag'],
            'status': req.body['status'],
            'date': req.body['date'],
            'paid': req.body['paid']
        }
    )
    chapter.save()
        .then(() => {
            res.json('inserted successfully')
        })
        .catch((err) => {
            res.send(err)
        })
})
RouterChapter.put('/update/:id', (req, res) => {
    console.log(req.body)
    Chapter.updateOne(
        { _id: req.params['id'] },
        { $set: req.body }
    )
        .then(() => {
            res.send("chapter updated successfully")
        })
        .catch((err) => {
            res.send(err)
        })
})

RouterChapter.delete('/del/:id', (req, res) => {
    Chapter.deleteOne(
        { _id: req.params['id'] }
    )
        .then(() => {
            res.send('deleted')
        })
        .catch((err) => {
            res.send(err)
        })
})
module.exports = RouterChapter;
