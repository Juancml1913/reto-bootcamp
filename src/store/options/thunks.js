import axios from "axios";
import { get } from "./optionsSlice";

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
