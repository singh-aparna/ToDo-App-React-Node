import React, { useState } from 'react'
import axios from 'axios';

function Create() {
    const [task, setTask] = useState()
    const handleAdd = () => {
        axios.post('https://to-do-app-react-node.vercel.app/add', { task: task })
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }
    return (
        <div className='flex gap-x-2'>
            <input className='border rounded-lg' type="text" value={task} onChange={(e) => { setTask(e.target.value) }} />
            <button className='border rounded-lg bg-black text-white p-1' onClick={handleAdd}>Add Task</button>
        </div>
    )
}
// http://localhost:3001/add
export default Create
