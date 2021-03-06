const router = require("express").Router();
const Workout = require("../Models/workout.js");

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
    console.log(body)
    Workout.findByIdAndUpdate(params.id,
        { $push: { exercises: body } }, { new: true })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});
// lets look at this line very important
router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
    .limit(10)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.delete("/api/workouts", ({ body }, res) => {
    Workout.findByIdAndUpdate(body.id)
    .then(() => {
        res.json(true);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;