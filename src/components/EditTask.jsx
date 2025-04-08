import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../features/taskSlice";
import { Pencil } from "lucide-react";

const EditTask = ({task}) => {
    const [isEdit, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);
    const [priority, setPriority] = useState(task.priority || 'medium'); // New State
    const [category, setCategory] = useState(task.category || 'Personal'); // New State
    
    const priorityColors = {
        high: " text-red-500", 
        medium: " text-yellow-600", 
        low: " text-green-500"
    };
    
    const dispatch = useDispatch();
    const handleEdit = () => {
        dispatch(editTask({id: task.id, title, description, status, priority, category}));
        setIsEditing(false);    
    }
    return (
        <div>
            {isEdit ? (
                <div className="absolute bg-white p-4 border rounded-mb shadow-lg z-10">
                    <h2 className="text-xl font-semibold mb-3 text-cyan-500">Edit Task</h2>
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
                        rows="3">
                        </textarea>
                    </div> 
                    {/* <div className="mb-4">
                        <select 
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus: ${priorityColors[priority]}`}>
                            <option value="To Do">To Do</option>
                            <option value="In-Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>

                    </div> */}
                    <div className="mb-4">
                    <select 
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500">
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </select>
                </div>

                <div className="mb-4">
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500">
                        <option value="Personal">Personal</option>
                        <option value="Work">Work</option>
                        <option value="Groceries">Groceries</option>
                    </select>
                </div>
                    <div className="flex justify-between">
                        <button
                        type="submit"
                        className="w-full bg-green-500 text-white font-semibold p-2 rounded-md hover:bg-green-600"
                        onClick={handleEdit}>
                        Save
                        </button >
                        <button 
                        className="w-full bg-gray-300 text-white font-semibold p-2 rounded-md hover:bg-gray-400"
                        onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
        ) : (
            <>
            <button
            className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => setIsEditing(true)}
            >
            <Pencil size={18} />
            </button>

            </>
        )}
        </div>
    );
};

export default EditTask;