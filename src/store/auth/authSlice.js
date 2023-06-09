import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    state: false, //true,
    id: 0, //1,
    name: "", //"jose daniel cruz casallas",
    role: "", //"estudiante", // "administrador"
    message: "", //"Ingreso exitoso"
    token: "",
  },
  reducers: {
    login: (state, { payload }) => {
      state.state = payload.state;
      state.id = payload.id;
      state.name = payload.name;
      state.role = payload.role;
      state.message = payload.message;
      state.token = payload.token;
    },
    logout: (state, action) => {
      state.state = false; //true,
      state.id = 0;
      state.name = ""; //"jose daniel cruz casallas",
      state.role = ""; //"estudiante", // "administrador"
      state.message = "";
      state.token = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
