import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "animate.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./configs/i18n.ts";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Spin } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Spin fullscreen />}>
      <Provider store={store}>
        <PersistGate loading={<Spin fullscreen />} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </Suspense>
  </StrictMode>,
);
