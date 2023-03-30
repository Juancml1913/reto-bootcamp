import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: [],
  reducers: {
    get: (state, { payload }) => {
      return payload.map((qu) => ({
        ...qu,
        options: qu.options.map((op) => ({ ...op, selected: false })),
      }));
    },
    store: (state, { payload }) => {
      return [payload, ...state];
    },
    update: (state, { payload }) => {
      return payload;
    },
  },
});

export const { store, get, update } = formSlice.actions;
