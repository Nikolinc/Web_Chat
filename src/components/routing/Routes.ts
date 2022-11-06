import { CHAT_ROUTES, LOGIN_ROUTES } from "../../utils/const";
import Login from "../auth";
import Chat from "../chat";

export const publicRoutes = [
  {
    path: LOGIN_ROUTES,
    Component: Login,
  },
];

export const privateRoutes = [
  {
    path: CHAT_ROUTES,
    Component: Chat,
  },
];
