import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  error: "",
  isAuthenticated: false,

  success: false,
  user: {},
};

export const addnewUser = createAsyncThunk("add-new-user", async (user) => {
  const response = await axios
    .post(`http://localhost:3001/user/add-user`, user)
    .then((response) => response)
    .catch((error) => error.response);

  return response;
});
export const loginUser = createAsyncThunk("loginUser", async (param) => {
  const response = await axios
    .post(`http://localhost:3001/user/login`, param)
    .then((response) => response)
    .catch((error) => error.response);
  return response;
});

const authSlice = createSlice({
  name: "Auth Slice",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = false;
    },
    updateSettings: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status === 200) {
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.error = "";
        localStorage.setItem("Token", action.payload.data.authToken);
        localStorage.setItem("Email", action.payload.data.email);
      } else if (action.payload.status === 400) {
        state.isAuthenticated = false;
        state.error = "Cannot Login";
        state.user = {};
      } else {
        state.isAuthenticated = false;
        state.error = action.payload.data.message || "Network Error";
        state.user = {};
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(addnewUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addnewUser.fulfilled, (state, action) => {
      if (action.payload.status === 201) {
        state.success = true;
      } else {
        state.error = action.payload.data.message || "Something Went Wrong";
        state.success = false;
      }
      state.loading = false;
    });
    builder.addCase(addnewUser.rejected, (state) => {
      state.loading = false;
      state.error = "Something Went Wrong";
    });
  },
});
export const { logoutUser, updateSettings } = authSlice.actions;
export default authSlice.reducer;
