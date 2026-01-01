import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {RouterProvider, createRouter} from "@tanstack/react-router";
import {routeTree} from "./routeTree.gen";

const router = createRouter({routeTree, context: {authUser: null}});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
