import Chat from "./components/Chat";
import Login from "./components/Login";
import { CHAT_ROUTES, LOGIN_ROUTES } from "./utils/const";

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
