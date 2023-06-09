import axios from "axios";
import { show } from "../message/messageSlice";
import { get, update } from "./optionsSlice";

export const getOptions = (question_id) => {
  return async (dispatch) => {
    await axios
      .get(`/questions/getOptions/${question_id}`)
      .then((res) => {
        dispatch(get(res.data.options));
      })
      .catch((err) => {
        dispatch(get([]));
        console.log(err);
      });
  };
};

export const updateOptions = (option) => {
  return async (dispatch) => {
    await axios
      .put(`/questions/updateAnswer/${option.id}`, option)
      .then((res) => {
        if (res.status === 200) {
          dispatch(update(option));
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
