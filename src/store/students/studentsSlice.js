import { createSlice } from "@reduxjs/toolkit";

export const studentsSlice = createSlice({
  name: "students",
  initialState: [],
  reducers: {
    get: (state, { payload }) => {
      return payload;
    },
    store: (state, { payload }) => {
      const student = {
        id: payload.id,
        firstName: payload.firstName,
        secondName: payload.secondName,
        surname: payload.surname,
        secondSurName: payload.secondSurName,
        typeDocument: payload.typeDocument,
        documentNumber: payload.documentNumber,
        email: payload.email,
        phone: payload.phone,
      };

      return [student, ...state];
    },
    update: (state, { payload }) => {
      return state.map((student) =>
        student.id === payload.id ? payload : student
      );
    },
  },
});

export const { store, get, update } = studentsSlice.actions;
