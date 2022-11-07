export interface UserState {
  user: any;
  loading: boolean;
  error: null | string;
}

export enum userActionTypes {
  FETCH_USER = "FETCH_USER",
  FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
  FETCH_USER_ERROR = "FETCH_USER_ERROR",
}

interface FetnUserAction {
  type: userActionTypes.FETCH_USER;
}
interface FetnUserSuccessAction {
  type: userActionTypes.FETCH_USER_SUCCESS;
  payload: any;
}
interface FetnUserErrorAction {
  type: userActionTypes.FETCH_USER_ERROR;
  payload: string;
}

export type userAction =
  | FetnUserAction
  | FetnUserSuccessAction
  | FetnUserErrorAction;
