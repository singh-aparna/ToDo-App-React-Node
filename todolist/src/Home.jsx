import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { FaTrash } from "react-icons/fa6";
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri";


function Home() {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get("https://to-do-app-react-node.vercel.app/get")
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    })

    const handleEdit = (id) => {
        axios.put("https://to-do-app-react-node.vercel.app/update/" + id)
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete("https://to-do-app-react-node.vercel.app/delete/" + id)
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }
    return (

        <div className='flex flex-col gap-y-4 border rounded-xl h-full items-center bg-[#e5e5e5] p-5'>
            <h2 className='font-bold text-3xl text-[#151a87]'>To-Do List</h2>
            <h2 className='leading-10 text-xl font-semibold text-[#151a87] '>My tasks</h2>
            <Create />
            <div className='border p-1 rounded-md'>
                {
                    todos.length === 0 ?
                        <h2 className='text-[#151a87]'>No Record</h2> :
                        todos.map(todo => (
                            <div className='text-[#151a87] border p-1 rounded-md flex items-center justify-between gap-x-7'>
                                <div className='flex items-center justify-center gap-2' onClick={() => handleEdit(todo._id)}>
                                    {todo.done ? <RiCheckboxCircleFill /> : <RiCheckboxBlankCircleLine />}

                                    <div className={todo.done ? "line-through" : ""}>{todo.task}</div>
                                </div>

                                <div onClick={() => handleDelete(todo._id)}><FaTrash /></div>
                            </div>
                        ))}</div>
        </div>
    )
}

export default Home