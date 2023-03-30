import axios from "axios";
import { show } from "../message/messageSlice";
import { get, store, update } from "./questionsSlice";

export const storeQuestions = (question) => {
  return async (dispatch) => {
    await axios
      .post("/questions/create", question)
      .then((res) => {
        if (res.status === 200) {
          dispatch(store(question.name));
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
export const updateQuestions = (question) => {
  return async (dispatch) => {
    await axios
      .put(`/questions/updateQuestion/${question.id}`, question)
      .then((res) => {
        if (res.status === 200) {
          dispatch(update(question));
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

export const getQuestions = () => {
  return async (dispatch) => {
    await axios
      .get("/questions/getQuestions")
      .then((res) => {
        dispatch(get(res.data.questions));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
