import React, { useState } from 'react'
import axios from 'axios';

export default function Create() {
    const [task, setTask] = useState("")
    const handleAdd = () => {
        if (task.trim() !== "") {
            // axios.post('http://localhost:3001/add', { task: task }) //Localhost
                axios.post('https://to-do-app-react-node.vercel.app/add', { task: task }) //Server
                .then(result => console.log(result))
                .catch(err => console.log(err))
            setTask("") // Clear input after adding
        }
        else {
            alert("Task can't be empty!")
        }
    }
    return (
        <div className='flex gap-x-2 '>
            <input className='md:px-3 md:py-1 px-2 py-2 border rounded-lg font-semibold text-sm  focus:outline-none caret-pink-100' placeholder='Task name' type="text" value={task} onChange={(e) => { setTask(e.target.value) }} />
            <button className='md:px-3 md:py-1 px-2 py-2 border rounded-lg text-white font-bold text-sm bg-[#c77b00]' onClick={handleAdd}>Add Task</button>
        </div>
    )
}
// http://localhost:3001/add
// https://to-do-app-react-node-uclf.vercel.app/ - Frontend
// https://to-do-app-react-node.vercel.app/ - Backend