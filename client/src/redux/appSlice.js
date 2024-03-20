import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: [],
  listData: [
    {
      id: "1",
      title: "Task 1",
      description: "Testing task 1",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Testing task 2",
    },
    {
      id: "3",
      title: "Task 3",
      description: "Testing task 3",
    },
  ],
};

const appSlice = createSlice({
  name: "App Slice",
  initialState,
  reducers: {
    addToList: (state, action) => {
      state.listData.push(action.payload);
    },
    removeFromList: (state, action) => {
      state.listData = state.listData.filter(
        (data) => data.id !== action.payload
      );
    },
    editListData: (state, action) => {
      const data = state.listData.find((list) => list.id === action.payload.id);
      if (data) {
        let newArray = [];
        state.listData.forEach((list) => {
          if (list.id !== action.payload.id) {
            newArray.push(list);
          } else {
            console.log(action.payload);
            newArray.push(action.payload);
          }
        });
        state.listData = newArray;
      }
    },
  },
  extraReducers: () => {},
});
export const { addToList, removeFromList, editListData } = appSlice.actions;
export default appSlice.reducer;
