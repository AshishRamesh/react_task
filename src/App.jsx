import React, { useState } from "react";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import FilterTask from "./components/FilterTask";

function App() {
    const [showAddTask, setShowAddTask] = useState(false); // State to control AddTask visibility

    const handleAddTaskClick = () => {
        setShowAddTask(true); // Show the AddTask form when button is clicked
    };

    const handleTaskAdded = () => {
        setShowAddTask(false); // Close the AddTask form once task is added
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
          <div className="w-full bg-white shadow-md rounded-md p-6">
            <h1 className="text-3xl font-bold mb-4 text-center text-cyan-600">Todo List</h1>
      
            {/* Filter + Add Button Row */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                <div className="w-full md:w-auto flex-1">
                    <FilterTask />
                </div>
                <div className="mt-2 md:mt-0">
                    {!showAddTask && (
                    <button
                        onClick={handleAddTaskClick}
                        className="bg-cyan-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-cyan-700"
                    >
                        Add New Task
                    </button>
                    )}
                </div>
            </div>
      
            {/* Conditionally Show Add Task Form */}
            {showAddTask && (
              <div className="mb-4">
                <AddTask onTaskAdded={handleTaskAdded} />
              </div>
            )}
      
            {/* Task List */}
            <TaskList />
          </div>
        </div>
      );
      
}

export default App;
