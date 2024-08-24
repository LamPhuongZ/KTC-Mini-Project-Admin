import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/lib/integration/react";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import store, { persistor } from "./redux/store.js";
// import { StrictMode } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    <ToastContainer position="top-center" />
  </Provider>

  // <StrictMode>
  //   <App />
  //   <ToastContainer position="top-center" />
  // </StrictMode>
);
