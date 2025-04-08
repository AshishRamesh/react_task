import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterStatus, setSearchQuery } from "../features/taskSlice";

const FilterTask = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.tasks.status);
  const searchQuery = useSelector((state) => state.tasks.searchQuery);

  return (
    <div className="mb-4 flex flex-col md:flex-row gap-4">
      {/* Search Bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Search tasks..."
        className="border p-2 rounded-md w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      {/* Filter Dropdown */}
      <select
        value={status}
        onChange={(e) => dispatch(setFilterStatus(e.target.value))}
        className="border p-2 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default FilterTask;
