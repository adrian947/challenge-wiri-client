import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./scss/index.scss";
import { AuthProvider } from "./context/Auth/AuthProvider.jsx";
import TurnsProvider from "./context/Turns/TurnsProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <TurnsProvider>
        <App />
      </TurnsProvider>
    </AuthProvider>
  </React.StrictMode>
);

