import { createSlice } from "@reduxjs/toolkit";

export const optionsSlice = createSlice({
  name: "options",
  initialState: [],
  reducers: {
    get: (state, { payload }) => {
      return payload;
    },
    update: (state, { payload }) => {
      return state.map((option) =>
        option.id === payload.id ? payload : option
      );
    },
  },
});

export const { get, update } = optionsSlice.actions;
