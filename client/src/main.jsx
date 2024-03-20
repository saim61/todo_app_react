import React from "react";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppMain from "./containers/app-container";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import IsAuthenticated from "./components/auth/isAuthenticated.jsx";
import "./index.css";
const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: (
          <IsAuthenticated>
            <AppMain />
          </IsAuthenticated>
        ),
      },
      { index: true, element: <Navigate to="home" /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);
import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </React.StrictMode>
);
