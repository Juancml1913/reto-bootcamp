import axios from "axios";
import { get } from "./optionsSlice";

export const getOptions = (question_id) => {
  return async (dispatch) => {
    await axios
      .get("/options")
      .then((res) => {
        const options = res.data.filter(
          (option) => option.question_id === question_id
        );
        dispatch(get(options));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
