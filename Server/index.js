const express = require("express");
const app = express();

const mongoose = require("mongoose")

const TodoModel = require('./Models/Todo')
const User = require('./Models/User');
require('dotenv').config();
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const secret = 'agdfjhd778hj';
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001;

const mongodbLocal = process.env.mongodbLocalURL
const mongodb = process.env.mongodbURL;

const cors = require("cors");
app.use(cors(
    {
         origin: ["https://to-do-app-react-node-uclf.vercel"],//server
        methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
        Headers: Content-Type, Authorization,
        //origin: 'http://localhost:3000',//local
        credentials: true
    }//Server
))
app.options('*', cors());// Handle preflight requests
app.use(express.json());
app.use(cookieParser());
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })//local//server
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
    res.json("Hello, Welcome to your first MERN Stack project.");
})


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    }
    catch (e) {
        res.status(400).json(e);
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
        return res.status(404).json({ message: "User not found" });
    }
    // res.json(userDoc);
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    if (passOk) {
        //loggedin
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        });
    }
    else {
        res.status(400).json('Wrong credentials');
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    const payload = jwt.verify(token, secret);
    User.findById(payload.id).then(
        userInfo => {
            res.json(userInfo);
        }
    )
    // if (err) throw err;
    // res.json(info);
});

app.post('/add', (req, res) => {
    const payload = jwt.verify(req.cookies.token, secret);//////////////
    //const task = req.body.task;
    // const todo= TodoModel.create({
    //     task: task,
    //     user: new mongoose.Types.ObjectId(payload.id)///////////
    // });
    const todo = new TodoModel({
        task: req.body.task,
        user: new mongoose.Types.ObjectId(payload.id),
    })
    todo.save().then(todo => { res.json(todo); })
    // .then(result => res.json(result))
    //     .catch(err => console.log(err))
})

app.get("/get", async (req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, secret)/////////
        const todo = await TodoModel.find({ user: payload.id })///////
        res.json(todo);
    }
    catch (err) {
        console.error("JWT Verification Error:", err);
        res.status(401).json({ message: "Unauthorized: Invalid or missing token" })
    }
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




app.post('/logout', (req, res) => {
    res.cookie('token', '').json({ status: 'ok', message: 'Logged out successfully' });
})

app.listen(PORT, () => {
    console.log("Server is listening on localhost addressss.");
})



