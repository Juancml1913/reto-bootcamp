import axios from "axios";
import { show } from "../message/messageSlice";
import { get, store, update } from "./studentsSlice";

export const storeStudents = (student) => {
  return async (dispatch) => {
    await axios
      .post("/user/create", student)
      .then((res) => {
        if (res.status === 201) {
          dispatch(store(student));
          dispatch(show(res.data.message));
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
export const updateStudents = (student) => {
  return async (dispatch) => {
    await axios
      .put(`/user/update/${student.id}`, student)
      .then((res) => {
        if (res.status === 200) {
          dispatch(update(student));
          dispatch(show(res.data.message));
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

export const getStudents = () => {
  return async (dispatch) => {
    await axios
      .get("/user/getUsers")
      .then((res) => {
        dispatch(get(res.data.users));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
