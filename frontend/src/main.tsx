import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";

import "./index.css";
import PredictionPage from "./pages/PredictionPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <h1>404</h1>,
  },
  {
    path: "/prediction",
    element: <PredictionPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
