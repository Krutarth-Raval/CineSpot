import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import  "../src/index.css"
import { AppContextProvider } from "./context/AppContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>

    <App />
    </AppContextProvider>
  </StrictMode>
);
