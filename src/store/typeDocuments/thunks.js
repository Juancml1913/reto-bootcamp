import axios from "axios";
import { get } from "./typeDocumentsSlice";

export const getTypeDocuments = () => {
  return async (dispatch) => {
    await axios
      .get("/typeDocumets/getTypes")
      .then((res) => {
        dispatch(get(res.data.typesDocuments));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
