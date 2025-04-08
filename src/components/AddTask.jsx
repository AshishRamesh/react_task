import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid4 } from "uuid";
import { addTask } from "../features/taskSlice";

const AddTask = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('todo');
    const [priority, setPriority] = useState('medium'); // New State
    const [category, setCategory] = useState('Personal'); // New State
    const dispatch = useDispatch();

    const priorityColors = {
        high: " text-red-500", 
        medium: " text-yellow-600", 
        low: " text-green-500"
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newTask = {
            id: uuid4(),
            title,
            description,
            status: status === "todo" ? "To Do" : status === "in-progress" ? "In Progress" : "Completed",
            priority, // Store priority
            category, // Store category
        };

        dispatch(addTask(newTask));
        setTitle('');
        setDescription('');
        setStatus('todo');
        setPriority('medium'); // Reset to default
        setCategory('personal'); // Reset to default
        onTaskAdded();
    };

    return (
        <form className="mb-6" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-3 text-cyan-500">Add New Task</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Task Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                />
            </div>
            <div className="mb-4">
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    rows="3"
                />
            </div>

            <div className="mb-4 space-x-2 flex flex-col md:flex-row">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md md:w-1/3 focus:outline-none focus:ring-2 focus: ${priorityColors[priority]}`}
                >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Completed</option>
                </select>
            
            {/* Priority Selection */}
            
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="border p-2 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                </select>
          

            {/* Category Selection */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-cyan-500 "
                >
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Groceries">Groceries</option>
                </select>
            </div>

            
            <button
                type="submit"
                className="w-full bg-cyan-600 text-white font-semibold p-2 rounded-md hover:bg-cyan-700"
            >
                Add Task
            </button>
        </form>
    );
};

export default AddTask;
