import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PredictionPage from "./pages/PredictionPage";
import ErrorPage from "./pages/ErrorPage";

import "./index.css";
import { PredictionResponseContext } from "./context/predictionResponseContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/prediction",
    element: <PredictionPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PredictionResponseContext.Provider value={null}>
      <RouterProvider router={router} />
    </PredictionResponseContext.Provider>
  </StrictMode>
);
