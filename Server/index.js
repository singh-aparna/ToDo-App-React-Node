const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');


const Todo = require('./Models/Todo');
const User = require('./Models/User');

const PORT = process.env.PORT || 3001;
const mongodbLocal = process.env.mongodbLocalURL
const mongodb = process.env.mongodbURL;
const secret = process.env.secret;

//origin: 'http://localhost:3000',//local
//origin: 'https://to-do-app-react-node-uclf.vercel.app'//server
const cors = require("cors");
app.use(cors(
    {
        origin: 'https://to-do-app-react-node-uclf.vercel.app',
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    }//Server
))

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })//local//server
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
    res.json("Hello, Welcome to your first MERN Stack project.");
})

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({ password: hashedPassword, username });
    user.save().then(userInfo => {
        jwt.sign({ id: userInfo._id, username: userInfo.username }, secret, {}, (err, token) => {
            console.log(token);
            res.cookie('token', token).json({ id: userInfo._id, username });
        })
    });
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
        .then(userInfo => {
            if (!userInfo) {
                return res.sendStatus(401);
            }
            const passOk = bcrypt.compareSync(password, userInfo.password);
            if (passOk) {
                jwt.sign({ id: userInfo._id, username }, secret, (err, token) => {
                    res.cookie('token', token).json({ id: userInfo._id, username: userInfo.username });
                });
            } else {
                res.sendStatus(401);
            }
        })
});

app.get('/user', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({});
    }
    const payload = jwt.verify(token, secret);
    User.findById(payload.id)
        .then(userInfo => {
            if (!userInfo) {
                return res.json({});
            }
            res.json({ id: userInfo._id, username: userInfo.username });
        });
});

app.get('/todos', async (req, res) => {
    const payload = jwt.verify(req.cookies.token, secret); // Verify the JWT token
    const todos = await Todo.find({ user: new mongoose.Types.ObjectId(payload.id) }).lean(); // Convert to plain objects
    res.json(todos);;
    // Send the todos as a JSON response
    // } catch (err) {
    //     console.error(err); // Log errors for debugging
    //     res.status(500).json({ error: 'Something went wrong' }); // Send error response
    // }
});

app.post('/todos', async (req, res) => {
    // try {
    // Verify the JWT token and extract the payload
    const payload = jwt.verify(req.cookies.token, secret);

    // Create and save the new Todo
    const todo = await Todo.create({
        task: req.body.task,
        done: false,
        user: new mongoose.Types.ObjectId(payload.id),
    });

    // Send the created Todo as the response
    res.json(todo);
    // } catch (err) {
    //     console.error(err); // Log the error for debugging
    //     res.status(500).json({ error: "Failed to create a new todo" }); // Send an error response
    // }
});


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




