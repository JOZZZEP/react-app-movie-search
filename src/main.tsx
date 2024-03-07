import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import MovieContextProvider from "./context/MovieContext.tsx";
// import "./index.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <MovieContextProvider>
        <CssBaseline />
        <App />
      </MovieContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
