import React, { useState } from 'react'
import axios from 'axios';

function Create() {
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
        <div className='flex gap-x-2'>
            <input className='border rounded-3xl p-1 focus:outline-none caret-pink-100' type="text" value={task} onChange={(e) => { setTask(e.target.value) }} />
            <button className='border rounded-lg bg-[#dff994] p-1' onClick={handleAdd}>Add Task</button>
        </div>
    )
}
// http://localhost:3001/add
export default Create
// https://to-do-app-react-node-uclf.vercel.app/ - Frontend
// https://to-do-app-react-node.vercel.app/ - Backend