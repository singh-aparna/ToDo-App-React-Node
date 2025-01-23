import React, { useState } from 'react'
import axios from 'axios';

export default function Create() {
    const [task, setTask] = useState("");
    const handleAdd = () => {
        // e.preventDefault();
        if (task.trim() !== "") {
            // axios.post('http://localhost:3001/add', { task: task }, { withCredentials: true }) //Localhost
            axios.post('https://to-do-app-react-node.vercel.app/add', { task: task }) //Server
                .then(result => console.log(result))
                .catch(err => console.log(err))
            setTask("");
        }
        else {
            alert("Task can't be empty!")
        }
    }
    return (
        <div>
            <input placeholder='Task name' type="text" value={task} onChange={(e) => { setTask(e.target.value) }} />
            <button onClick={handleAdd}>Add Task</button>
        </div>
    )
}
// http://localhost:3001/add
// https://to-do-app-react-node-uclf.vercel.app/ - Frontend
// https://to-do-app-react-node.vercel.app/ - Backend
//className='flex gap-x-2 '//input button parent
//className='md:px-3 md:py-1 px-2 py-2 border rounded-lg font-semibold text-sm  focus:outline-none caret-pink-100' //input
//className='md:px-3 md:py-1 px-2 py-2 border rounded-lg text-white font-bold text-sm bg-[#c77b00]'  //button