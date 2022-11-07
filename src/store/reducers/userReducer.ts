import { userAction, userActionTypes, UserState } from "../../types/user";

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export function userRerucer(
  state = initialState,
  action: userAction
): UserState {
  switch (action.type) {
    case userActionTypes.FETCH_USER:
      return { loading: true, error: null, user: null };
    case userActionTypes.FETCH_USER_SUCCESS:
      return { loading: false, error: null, user: action.payload };
    case userActionTypes.FETCH_USER_ERROR:
      return { loading: false, error: action.payload, user: null };
    default:
      return state;
  }
}
