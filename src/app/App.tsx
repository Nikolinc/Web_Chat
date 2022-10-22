import React from "react";
import "../styles/global.scss";
import useLocalStorage from "use-local-storage";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const switchTheme = () => {
    const newTeam = theme === "dark" ? "light" : "dark";
    setTheme(newTeam);
  };

  return (
    <div className="App" data-theme={theme}>
      <header className="App-header">
        <button onClick={() => switchTheme()}> switch theme</button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
