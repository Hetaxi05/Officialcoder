const Course = require('../model/course')
const Chapter = require('../model/chapter')

const express = require('express');
const Topic = require('../model/topic');
const RouterCourse = express.Router();

RouterCourse.get('/', (req, res) => {
    Course.find()
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json({ error: err }));
});


RouterCourse.get('/:id', (req, res) => {

    Course.find({ _id: req.params.id })
        // .populate("chapters") 
        .then((data) => {
            res.send(data[0])
        })
        .catch((err) => {
            res.send(err)
        })
})

// Get total number of course
RouterCourse.get('/count/total', async (req, res) => {
    try {
        const count = await Course.countDocuments();
        res.json({ totalCourses: count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching total courses', error });
    }
});


// Get courses by category ID
RouterCourse.get('/category/:categoryId', (req, res) => {
    Course.find({ category: req.params.categoryId })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

RouterCourse.get('/checkcoursecode/:coursecode', (req, res) => {
    Course.findOne({ coursecode: req.params.coursecode })
        .then((course) => {
            if (course) {
                res.json({ exists: true });
            } else {
                res.json({ exists: false });
            }
        })
        .catch((err) => res.status(500).json({ error: err }));
});
RouterCourse.get('/lession/count/:id', async (req, res) => {
    try {
        // Find all chapters for the given course
        const chapters = await Chapter.find({ courseid: req.params.id });

        //Loop through each chapter and fetch topics
        let totalTopics = 0;
        for (const chapter of chapters) {
            const topics = await Topic.find({ chapterid: chapter._id });
            totalTopics += topics.length;
        }

        Course.find({ _id: req.params.id })
            .then((data) => {
                // res.send(data[0])
                res.json({ totalTopics: totalTopics, course: data[0] });
            })
            .catch((err) => {
                res.send(err)
            })

        // Send total topics
    } catch (err) {
        console.error("Error counting topics:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});


// insert

RouterCourse.post('/add', (req, res) => {
    // console.log(req.body)
    const course = new Course({
        'coursename': req.body['coursename'],
        'coursecode': req.body['coursecode'],
        'duration': req.body['duration'],
        'coursedetails': req.body['coursedetails'],
        'tag': req.body['tag'],
        'image': req.body['image'],
        'category': req.body['category']
    })
    course.save().then(() => { res.json("Course Added Successfully") }).catch((err) => { res.send(err) })
})

// update
RouterCourse.put('/update/:id', (req, res) => {
    // console.log(req.body)
    Course.updateOne(
        { _id: req.params['id'] },
        { $set: req.body }
    )
        .then(() => {
            res.send('Course updated sucessfully')
        })
        .catch((err) => {
            res.send(err)
        })
})

// delete
RouterCourse.delete('/del/:id', (req, res) => {
    Course.deleteOne(
        { _id: req.params['id'] }
    )
        .then(() => {
            res.send("deleted")
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = RouterCourse;