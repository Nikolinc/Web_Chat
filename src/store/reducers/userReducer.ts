import { userAction, userActionTypes, UserState } from "../../types/user";

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export function userRerucer(
  state = initialState,
  action: userAction
): UserState | undefined {
  switch (action.type) {
    case userActionTypes.FETCH_USER:
      return { loading: true, error: null, users: [] };
    case userActionTypes.FETCH_USER_SUCCESS:
      return { loading: false, error: null, users: action.payload };
    case userActionTypes.FETCH_USER_ERROR:
      return { loading: false, error: action.payload, users: [] };
    default:
      return state;
  }
}
