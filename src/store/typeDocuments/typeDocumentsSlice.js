import { createSlice } from "@reduxjs/toolkit";

export const typeDocumentsSlice = createSlice({
  name: "typeDocuments",
  initialState: [],
  reducers: {
    get: (state, { payload }) => {
      return payload;
    },
    store: (state, { payload }) => {
      return [payload, ...state];
    },
  },
});

export const { store, get } = typeDocumentsSlice.actions;
