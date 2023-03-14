import axios from "axios";
import { show } from "../message/messageSlice";
import { get, store, update } from "./studentsSlice";

export const storeStudents = (student) => {
  student = { ...student, typeDocument: student.typeDocument + 1 };
  return async (dispatch) => {
    await axios
      .post("/students", student)
      .then((res) => {
        dispatch(store(res.data));
        if (res.status === 201) {
          dispatch(show("Operación exitosa."));
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
  student = { ...student, typeDocument: student.typeDocument + 1 };
  return async (dispatch) => {
    await axios
      .put(`/students/${student.id}`, student)
      .then((res) => {
        dispatch(update(res.data));
        if (res.status === 200) {
          dispatch(show("Operación exitosa."));
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
      .get("/students")
      .then((res) => {
        dispatch(get(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
