import { close, show } from "./messageSlice";

export const showMessage = (message) => {
  return (dispatch) => {
    dispatch(show(message));
  };
};

export const closeMessage = () => {
  return (dispatch) => {
    dispatch(close());
  };
};
