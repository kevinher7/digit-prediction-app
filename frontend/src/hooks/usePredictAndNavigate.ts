import { MutableRefObject } from "react";
import { NavigateFunction } from "react-router-dom";

import { CanvasElement } from "../types/CanvasElement.type";
import { PredictionResponse } from "../types/PredictionResponse.type";

import fetchPrediction from "../utils/fetchPrediction";
import getPixelsFromCanvas from "../utils/getPixelsFromCanvas";

const usePredictAndNavigate = async (
  canvasRef: MutableRefObject<CanvasElement>,
  predictionRes: PredictionResponse | null,
  navigate: NavigateFunction
) => {
  const pixelsArray = getPixelsFromCanvas(canvasRef);

  predictionRes = await fetchPrediction(pixelsArray);

  if (predictionRes === null) {
    throw new Error("Couldn't Fetch Prediction!");
  }

  console.log(predictionRes);
  navigate("/prediction");
};

export default usePredictAndNavigate;
