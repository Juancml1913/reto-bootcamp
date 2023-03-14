import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
  name: "questions",
  initialState: [],
  reducers: {
    get: (state, { payload }) => {
      return payload;
    },
    store: (state, { payload }) => {
      return [payload, ...state];
    },
    update: (state, { payload }) => {
      return state.map((question) =>
        question.id === payload.id ? payload : question
      );
    },
  },
});

export const { store, get, update } = questionsSlice.actions;
