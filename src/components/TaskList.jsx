import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, fetchTodo, updateTask } from "../features/taskSlice";
import EditTask from "./EditTask";
import { Trash2 } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "react-beautiful-dnd";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const status = useSelector((state) => state.tasks.status);
  const searchQuery = useSelector((state) => state.tasks.searchQuery);
  const dispatch = useDispatch();

  const priorityColors = {
    high: "text-red-500",
    medium: "text-yellow-600",
    low: "text-green-500"
  };

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = status === "All" || task.status === status;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const columns = {
    "To Do": [],
    "In Progress": [],
    "Completed": [],
  };

  filteredTasks.forEach(task => {
    if (columns[task.status]) {
      columns[task.status].push(task);
    }
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    const draggedTask = tasks.find((t) => t.id.toString() === draggableId);
    if (draggedTask) {
      dispatch(updateTask({ id: draggedTask.id, newStatus: destination.droppableId }));
    }
  };

  if (loading) return <div>Task Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-black-50">
      {/* <h2 className="text-lg font-large text-gray-1000 mb-4">Tasks</h2> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([columnId, taskList]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 rounded-md p-4 shadow-inner min-h-[300px]"
                >
                  <h3 className="text-lg font-bold text-center text-cyan-700 mb-2">{columnId}</h3>
                  {taskList.map((task, index) => (
                    <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-4 rounded shadow-sm mb-2 hover:shadow-lg transition-shadow duration-200"
                        >
                          <h1 className="text-lg font-bold text-gray-800">{task.title}</h1>
                          {task.description && <p className="text-gray-600">{task.description}</p>}
                          <p className="mt-1 text-sm">
                            Status: <span className={`italic font-bold ${priorityColors[task.priority || 'medium']}`}>{task.status}</span>
                          </p>
                          <p className="text-sm">
                            Category: <span className="italic font-bold">{task.category || 'Personal'}</span>
                          </p>
                          <div className="flex space-x-2 mt-2">
                            <EditTask task={task} />
                            <button
                            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-md hover:bg-red-600"
                            onClick={() => handleDelete(task.id)}>
                            <Trash2 size={18} />
                          </button>

                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
