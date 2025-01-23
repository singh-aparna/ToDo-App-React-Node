import React, { useContext, useEffect, useState } from 'react'
// import Create from './Create'
import axios from 'axios'
import { FaTrash } from "react-icons/fa6";
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri";
import { UserContext } from './UserContext';

export default function Home() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);
    const { userInfo } = useContext(UserContext);
    useEffect(() => {
        axios.get("https://to-do-app-react-node.vercel.app/get", { withCredentials: true })//server
            // axios.get("http://localhost:3001/get", { withCredentials: true })//local
            .then(response => {
                setTodos(response.data)
            })

    }, []);

    const handleAdd = () => {
        if (task.trim() !== "") {
            // axios.post('http://localhost:3001/add', { task: task }, { withCredentials: true }) //Localhost
            axios.post('https://to-do-app-react-node.vercel.app/add', { task: task }, { withCredentials: true }) //Server
                .then(response => {
                    setTodos([...todos, response.data]);
                    setTask('');
                })
        }
        else {
            alert("Task can't be empty!")
        }
    }

    if (!userInfo?.username) {
        return <p className='text-center p-16 text-2xl font-semibold text-green-800'>You need to be logged in to see this page</p>;
    }
    const handleEdit = (id) => {
        axios.put("https://to-do-app-react-node.vercel.app/update/" + id, { withCredentials: true })//server
            // axios.put("http://localhost:3001/update/" + id, { withCredentials: true })//local
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
        axios.delete("https://to-do-app-react-node.vercel.app/delete/" + id, { withCredentials: true })//server
            // axios.delete("http://localhost:3001/delete/" + id, { withCredentials: true })//local
            .then(() => {
                setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
            })
            .catch((err) => console.error(err));
    }
    return (
        // <div className='flex flex-col gap-y-4 border rounded-xl h-full items-center bg-[#e5e5e5] px-5 py-28  absolute inset-0 bg-white/0 backdrop-blur-xs'>
        <main>
            <h1>My Tasks</h1>
            {/* <Create /> */}

            <form onSubmit={(e) => {
                e.preventDefault();
                handleAdd(e)
            }}>
                <input placeholder='Task name' type="text" value={task} onChange={(e) => { setTask(e.target.value) }} />
                <button>Add Task</button>
            </form>

            <div className='record'>
                {
                    todos.length === 0 ?
                        <h2>No Record</h2> :
                        Array.isArray(todos) &&
                        todos.map(todo => (
                            <div className='text-[#151a87] p-1  flex items-center justify-between gap-x-7'>
                                <div className='flex items-center justify-center gap-2' onClick={() => handleEdit(todo._id)}>
                                    {todo.done ? <RiCheckboxCircleFill /> : <RiCheckboxBlankCircleLine />}

                                    <div className={todo.done ? "line-through" : ""}>{todo.task}</div>
                                </div>
                                <div onClick={() => handleDelete(todo._id)}><FaTrash /></div>
                            </div>
                        ))}</div>
        </main>
    )
}
