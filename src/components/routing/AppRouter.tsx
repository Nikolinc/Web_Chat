import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./Routes";
import { CHAT_ROUTES, LOGIN_ROUTES } from "../../utils/const";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import NoPages from "../noPages";

const AppRouter = () => {
  const { user } = useTypedSelector((state) => state.user);
  return user ? (
    <Switch>
      {privateRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact={true} />
      ))}
      <Redirect to={CHAT_ROUTES} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact={true} />
      ))}
      {/* <Route key={'error'} component = {NoPages} exact={true} /> */}
      <Redirect to={LOGIN_ROUTES} />
    </Switch>
  );
};

export default AppRouter;
