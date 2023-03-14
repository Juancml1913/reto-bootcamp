import axios from "axios";
import { show } from "../message/messageSlice";
import { get, store, update } from "./questionsSlice";

export const storeQuestions = (question) => {
  return async (dispatch) => {
    await axios
      .post("/questions", question)
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
export const updateQuestions = (student) => {
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

export const getQuestions = () => {
  return async (dispatch) => {
    await axios
      .get("/questions")
      .then((res) => {
        dispatch(get(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
