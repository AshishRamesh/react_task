import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  status: 'All',
  searchQuery: "",
  sortBy: "title",  // Default sorting
  priority: "medium", // Default priority
  category: "Personal", // Default category
};

export const fetchTodo = createAsyncThunk('tasks/fetchTodo', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  const data = await response.json();
  return data.map(task => ({
    id: task.id,
    title: task.title,
    description: '',
    status: task.completed ? 'Completed' : 'To Do',
  }));
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, newStatus } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.status = newStatus;
      }
    },    
    setFilterStatus: (state, action) => {
      state.status = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      if (action.payload === "title") {
        state.tasks.sort((a, b) => a.title.localeCompare(b.title));
      } else if (action.payload === "status") {
        state.tasks.sort((a, b) => a.status.localeCompare(b.status));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTask, editTask, deleteTask,updateTask, setFilterStatus, setSearchQuery, setSortBy } = taskSlice.actions;
export default taskSlice.reducer;
