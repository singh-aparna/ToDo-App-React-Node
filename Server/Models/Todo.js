const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    task: {type:String, required:true},
    done: {
        type: Boolean,
        default: false
    },
    user: {type: mongoose.SchemaTypes.ObjectId},
})

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;