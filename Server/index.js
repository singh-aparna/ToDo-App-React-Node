const express = require("express");
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const TodoModel = require('./Models/Todo')
require('dotenv').config();

const mongodbLocal = process.env.mongodbLocalURL 
mongodb = process.env.mongodbURL;

app.use(cors(
    {
        origin: ["https://to-do-app-react-node-uclf.vercel.app"],
        methods: ["POST","GET", "PUT", "DELETE"],
        credentials: true
    }
))
app.use(express.json())
mongoose.connect(mongodb)

app.get("/", (req, res) => {
    res.json("Hello, Welcome to create your first mern stack project.")
})

app.get("/get", (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => res.json(err))

})

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => console.log(err))
})

app.listen(3001, () => {
    console.log("Server is listening on localhost address.")
})
