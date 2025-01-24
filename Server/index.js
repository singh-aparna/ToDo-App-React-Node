const express = require("express");
const app = express();

const mongoose = require("mongoose")

const Todo = require('./Models/Todo')
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

//origin: 'http://localhost:3000',//local
const cors = require("cors");
app.use(cors(
    {
        origin: 'https://to-do-app-react-node-uclf.vercel.app',//server
        methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    }//Server
))

app.options('*', cors());// Handle preflight requests
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://to-do-app-react-node-uclf.vercel.app"); // Replace with your frontend URL
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true"); // Include credentials
    next();
});


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

app.get('/user', (req, res) => {
    if (!req.cookies.token) {
        return res.json({});
    }
    const payload = jwt.verify(req.cookies.token, secret);
    User.findById(payload.id)
        .then(userInfo => {
            if (!userInfo) {
                return res.json({});
            }
            res.json({ id: userInfo._id, username: userInfo.username });
        });
});

app.post('/add', (req, res) => {
    const payload = jwt.verify(req.cookies.token, secret);//////////////
    const todo = new Todo({
        task: req.body.task,
        done: false,
        user: new mongoose.Types.ObjectId(payload.id),
    })
    todo.save().then(todo => { res.json(todo); })
})

//     app.get("/todos", async (req, res) => {

//     const payload = jwt.verify(req.cookies.token, secret)/////////
//     const todo = await TodoModel.find({ user: payload.id })///////
//     res.json(todo);
// }
// )

app.get("/todos", cors({
    origin: "https://to-do-app-react-node-uclf.vercel.app",
    credentials: true,
}),  (req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, secret);
        Todo.where({ user: new mongoose.Types.ObjectId(payload.id) }).find((err, todos => {
            res.json(todos);
        }))

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

//try {
//}
//catch (err) {
//console.error(err);
//res.status(500).json({ error: "Something went wrong" });

// app.get('/get', (req, res) => {
//     const payload = jwt.verify(req.cookies.token, secret);
//     TodoModel.where({ user: new mongoose.Types.ObjectId(payload.id) })
//         .find((err, todos) => {
//             res.json(todos);
//         })
// });


app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)
    Todo.findByIdAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => res.json(err))

})

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    Todo.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').send();
})

app.listen(PORT, () => {
    console.log("Server is listening on localhost addressss.");
})



