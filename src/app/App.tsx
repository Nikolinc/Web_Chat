import React, { useEffect } from "react";
import "../styles/global.scss";
import useLocalStorage from "use-local-storage";
import { BrowserRouter } from "react-router-dom";
import Loader from "../components/loader/index";
import AppRouter from "../components/routing/AppRouter";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { fetchUser } from "../store/action-creators/user";
import { useAction } from "../hooks/useAction";

function App() {
  const { users, error, loading } = useTypedSelector((state) => state.user);
  const { fetchUser } = useAction();

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(users);
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const switchTheme = () => {
    const newTeam = theme === "dark" ? "light" : "dark";
    setTheme(newTeam);
  };

  if (loading) {
    return (
      <div className="App" data-theme={theme}>
        <Loader />
      </div>
    );
  }


  return (
    <div className="App" data-theme={theme}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
