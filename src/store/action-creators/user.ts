import { Dispatch } from "react";
import { userAction, userActionTypes } from "../../types/user";

export const fetchUser = (userAuth: any) => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      dispatch({ type: userActionTypes.FETCH_USER });
      const response = userAuth;
      dispatch({ type: userActionTypes.FETCH_USER_SUCCESS, payload: response });
    } catch (e) {
      dispatch({
        type: userActionTypes.FETCH_USER_ERROR,
        payload: String(e),
      });
    }
  };
};
