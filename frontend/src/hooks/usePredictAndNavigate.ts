import { MutableRefObject } from "react";
import { NavigateFunction } from "react-router-dom";

import { CanvasElement } from "../types/CanvasElement.type";

import fetchPrediction from "../utils/fetchPrediction";
import getPixelsFromCanvas from "../utils/getPixelsFromCanvas";

const usePredictAndNavigate = async (
  canvasRef: MutableRefObject<CanvasElement>,
  navigate: NavigateFunction
) => {
  const pixelsArray = getPixelsFromCanvas(canvasRef);

  const predictionResponse = await fetchPrediction(pixelsArray);

  if (predictionResponse === null) {
    throw new Error("Couldn't Fetch Prediction!");
  }

  console.log(predictionResponse);
  navigate("/prediction", { state: predictionResponse });
};

export default usePredictAndNavigate;
