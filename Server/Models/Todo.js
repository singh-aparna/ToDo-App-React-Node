const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: false
    },
    user: {type: mongoose.SchemaTypes.ObjectId},
})

const Todo = mongoose.model("todos", TodoSchema);
module.exports = Todo;