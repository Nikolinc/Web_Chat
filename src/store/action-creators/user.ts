import { Dispatch } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { userAction, userActionTypes } from "../../types/user";
import { fApp } from "../../servise/firebase";
import { getAuth } from "firebase/auth";

export const fetchUser = () => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      dispatch({ type: userActionTypes.FETCH_USER });
      const response = useAuthState(getAuth(fApp));
      dispatch({type:userActionTypes.FETCH_USER_SUCCESS,payload:response})
    } catch(e) {
      dispatch({
        type:userActionTypes.FETCH_USER_ERROR,
        payload:String(e)
      })
    }
  };
};
