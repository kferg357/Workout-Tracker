const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", ({ body }, res) =>{
    Workout.create(body)
    .then.(dbworkout => {
        res.json(dbworkout);
})
.catch(err => {
    res.status(400).json(err);
});
});