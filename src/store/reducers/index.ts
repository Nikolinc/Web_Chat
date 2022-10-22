import { combineReducers } from "redux";
import { userRerucer } from "./userReducer";
// import {todoReducer} from "./todoReducer";

export const rootReducer = combineReducers({
  user: userRerucer,
});

export type RootState = ReturnType<typeof rootReducer>;
