const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },

    exercises: [
        {
            type: {
                type: String,
                required: "Type of exervise is required"
            },

            name: {
                type: String,
                required: "Name of exercise is required"
            },

            duration: {
                type: Number,
                required: "Duration is required"
            },

            weight: {
                type: Number
            },

            reps: {
                type: Number
            },

            sets: {
                type: Number
            },

            distance: {
                type: Number
            },
        }
    ]
},
    {
        toJSON: {
            virtuals: true
        }
    });

workoutSchema
    .virtual("totalDuration")
    .get(function() {
        return this.exercises.reduce(function(total, exercise) {
            return total + exercise.duration;
        }, 0);
    });

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;