import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import "../src/styles/styles.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);
