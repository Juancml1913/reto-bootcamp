import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: null,
  reducers: {
    show: (state, { payload }) => {
      return payload;
    },
    close: (state, action) => {
      return null;
    },
  },
});

export const { show, close } = messageSlice.actions;
