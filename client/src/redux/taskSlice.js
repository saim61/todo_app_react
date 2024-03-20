import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  error: "",
  task: [],
};
export const addNewTask = createAsyncThunk("add-task", async (data) => {
  const response = await axios
    .post(`http://localhost:3001/task/add-task`, data, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);

  return response;
});
export const getTasks = createAsyncThunk("getTasks", async (id) => {
  const response = await axios
    .get(`http://localhost:3001/task/get-by-id/${id}`, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);

  return response;
});

export const editTask = createAsyncThunk("editTask", async (data) => {
  const response = await axios
    .post(`http://localhost:3001/task/edit-task`, data, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);

  return response;
});

export const deleteTask = createAsyncThunk(
  "delete-Task",
  async (id, userId) => {
    const response = await axios

      .post(
        `http://localhost:3001/task/delete-by-task-id/${id}`,
        { userId: userId },
        {
          headers: { token: localStorage.getItem("Token") },
        }
      )
      .then((response) => response)
      .catch((error) => error.response);

    return response;
  }
);

const taskSlice = createSlice({
  name: "Task Slice",
  initialState,
  reducers: {
    getTask: (state) => {
      state.task = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status === 200) {
        state.task = action.payload.data.tasks;
        state.error = "";
      } else if (action.payload.status === 400) {
        state.error = "Cannot Fetch";
        state.task = [];
      } else {
        state.error = action.payload.data.message || "Network Error";
        state.task = [];
      }
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(addNewTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewTask.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status === 200) {
        state.task = action.payload.data.tasks;
        state.error = "";
      } else if (action.payload.status === 400) {
        state.error = "Cannot Fetch";
        state.task = [];
      } else {
        state.error = action.payload.data.message || "Network Error";
        state.task = [];
      }
    });
    builder.addCase(addNewTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editTask.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status === 200) {
        state.task = action.payload.data.tasks;
        state.error = "";
      } else if (action.payload.status === 400) {
        state.error = "Cannot Fetch";
        state.task = [];
      } else {
        state.error = action.payload.data.message || "Network Error";
        state.task = [];
      }
    });
    builder.addCase(editTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status === 200) {
        state.task = action.payload.data.tasks;
        state.error = "";
      } else if (action.payload.status === 400) {
        state.error = "Cannot Fetch";
        state.task = [];
      } else {
        state.error = action.payload.data.message || "Network Error";
        state.task = [];
      }
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { getTask } = taskSlice.actions;
export default taskSlice.reducer;
