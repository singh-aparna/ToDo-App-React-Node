import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from "react-icons/fa6";
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri";
import UserContext from './UserContext';

//axios.get("http://localhost:3001/get", { withCredentials: true })//local
//axios.get("https://to-do-app-react-node.vercel.app/todos",  { withCredentials: true })
export default function Home() {

    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);
    const userInfo = useContext(UserContext);

    useEffect(() => {
        axios.get("https://to-do-app-react-node.vercel.app/todos", { withCredentials: true })
            .then(response => {
                setTodos(response.data);
                console.log(response.data);
            })
    }, []);
    if (!userInfo.username) {
        return <p className='text-center p-16 text-2xl font-semibold text-green-800'>You need to be logged in to see this page</p>;
    }

    const handleAdd = (e) => {
        e.preventDefault();
        fetch('https://to-do-app-react-node.vercel.app/todos', {
            body: JSON.stringify({ task }),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())// Parse the response to JSON
            .then(data => setTodos([...todos, data]))// Add the new todo to the list
            .catch(err => console.log(err))
    }

    const handleEdit = (id) => {
        axios.put("https://to-do-app-react-node.vercel.app/update/" + id, { withCredentials: true })//local
            .then(() => {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo._id === id ? { ...todo, done: !todo.done } : todo
                    )
                );
            })
            .catch((err) => console.error(err));
    }
    const handleDelete = (id) => {
        axios.delete("https://to-do-app-react-node.vercel.app/delete/" + id, { withCredentials: true })//local
            .then(() => {
                setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
            })
            .catch((err) => console.error(err));
    }
    return (
        <div>
            <form action="" onSubmit={handleAdd}>
                <h1>My Tasks</h1>
                <input placeholder='Task name' type="text" value={task} onChange={(e) => { setTask(e.target.value) }} />
                <button>Add Task</button>
            </form>
            {
                todos.map(todo=>(<li>{todo.task}</li>))
            }
            {/* <div className='record'>
                {
                    todos.length === 0 ?
                        <h2>No Record</h2> :
                        // Array.isArray(todos) && todos.length > 0 ? 

                        todos.map(todo => (
                            <div key={todo._id} className='text-[#151a87] p-1  flex items-center justify-between gap-x-7'>
                                <div className='flex items-center justify-center gap-2' onClick={() => handleEdit(todo._id)}>
                                    {todo.done ? <RiCheckboxCircleFill /> : <RiCheckboxBlankCircleLine />}

                                    <div className={todo.done ? "line-through" : ""}>{todo.task}</div>
                                </div>
                                <div onClick={() => handleDelete(todo._id)}><FaTrash /></div>
                            </div>
                        ))

                    //     <h2>No Record</h2>
                }
            </div> */}

        </div>
    )
}
// Your code has an issue when using fetch. The body needs to be a JSON string, and response.data
// is not automatically available with fetch as it is with axios.
// You need to parse the response with .json(). Here's the corrected code:

// const handleAdd = (e) => {
//     e.preventDefault();
//     if (task.trim() !== "") {
//     axios.post('https://to-do-app-react-node.vercel.app/todos', { task: task }, { withCredentials: true }) //Server
//         .then(response => {
//            setTodos([...todos, response]);
//             console.log("Response Data:", response.data);
//             setTask('');
//         })
//     }
//     else {
//     alert("Task can't be empty!")
//     }
// }