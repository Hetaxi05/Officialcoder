const express = require("express");
const RouterActivity = express.Router();
const Activity = require("../model/activity");
const { body, validationResult } = require("express-validator");

RouterActivity.get("/all", async (req, res) => {
    try {
        const activityLogs = await Activity.find().populate("userId", "email"); // populate email from User
        res.json(activityLogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching activity logs", error });
    }
});

//Get activity count grouped by date
RouterActivity.get("/status", async (req, res) => {
    try {
        const data = await Activity.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%m-%d", date: "$timestamp" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch activity stats", error });
    }
});

module.exports = RouterActivity;
