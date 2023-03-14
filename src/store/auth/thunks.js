import axios from "axios";
import { show } from "../message/messageSlice";
import { login, logout } from "./authSlice";

export const signIn = ({ email, password }) => {
  return async (dispatch) => {
    await axios
      .get("/users")
      .then((res) => {
        if (res.status === 200) {
          const user = res.data.find(
            (userDb) => userDb.name === email && userDb.password === password
          );
          if (user === undefined) {
            dispatch(show("Email o password incorrectas."));
          } else {
            const newUser = {
              ...user,
              state: true,
              message: "Operacion correcta",
            };
            dispatch(login(newUser));
          }
        } else {
          dispatch(show("Operación erronea."));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(show("Operación erronea."));
      });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    dispatch(logout());
  };
};
