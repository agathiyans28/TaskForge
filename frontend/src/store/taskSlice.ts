import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "@/services/taskServices";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

interface Task {
  _id: string;
  title: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetch", getTasks);
export const createTasks = createAsyncThunk("tasks/create", createTask);
export const deleteTasks = createAsyncThunk("tasks/delete", deleteTask);
export const updateTasks = createAsyncThunk(
  "tasks/edit",
  async ({ id, title }: { id: string; title: string }) => {
    return await updateTask(id, title);
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })

      // create Task
      .addCase(createTasks.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
        state.loading = false;
      })

      // delete task
      .addCase(deleteTasks.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id != action.payload);
        state.loading = false;
      })

      // update task
      .addCase(updateTasks.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.loading = false;
      })

      // 🔹 Generic loading matcher
      .addMatcher(
        isAnyOf(fetchTasks.pending, createTasks.pending, deleteTasks.pending),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      // 🔹 Generic error matcher
      .addMatcher(
        isAnyOf(
          fetchTasks.rejected,
          createTasks.rejected,
          deleteTasks.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Something went wrong";
        }
      );
  },
});

export const taskReducer = taskSlice.reducer;
