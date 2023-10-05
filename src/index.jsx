import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root, { loader as rootLoader, action as rootAction,  } from "./routes/root";
import ErrorPage from "./error-element";
import Task, {loader as taskLoader} from "./routes/task";
import EditTask, {
  action as editAction,
} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Home from "./routes/home";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage/>,
    loader:rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Home /> },
      {
        path: "tasks/:taskId",
        element: <Task />,
        loader: taskLoader,
      },
      {
        path: "tasks/:taskId/edit",
        element: <EditTask />,
        loader: taskLoader,
        action: editAction,
      },
      {
        path: "tasks/:taskId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);