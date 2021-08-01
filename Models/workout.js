const mongoose = require("mongooose");
const scheme = mongoose.Schema;

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
});

const Workout = mongoose.model("Workout", workoutSchema);
model.exports = Workout;