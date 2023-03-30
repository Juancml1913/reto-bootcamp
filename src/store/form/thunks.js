import axios from "axios";
import { show } from "../message/messageSlice";
import { get, update } from "./formSlice";

export const getForm = () => {
  return async (dispatch) => {
    await axios
      .get("/form/getquestions")
      .then((res) => {
        dispatch(get(res.data.questions));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const storeForm = (answers) => {
  return async (dispatch) => {
    await axios
      .post("/form/postquestions", answers)
      .then((res) => {
        if (res.status === 200) {
          dispatch(show(res.data.message));
        } else {
          dispatch(show("Operación erronea."));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateState = (payload) => {
  return async (dispatch) => {
    dispatch(update(payload));
  };
};
