import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDrawCanvasContext } from "../../context/drawCanvasContext";
import { CanvasElement } from "../../types/CanvasElement.type";

import fetchPrediction from "../../utils/fetchPrediction";
import getPixelsFromCanvas from "../../utils/getPixelsFromCanvas";
import { usePredictionResponseContext } from "../../context/predictionResponseContext";
import { PredictionResponse } from "../../types/PredictionResponse.type";

const predictAndNavigate = async (
  navigate: NavigateFunction,
  canvasRef: React.MutableRefObject<CanvasElement>,
  predictionRes: PredictionResponse | null
) => {
  const pixelsArray = getPixelsFromCanvas(canvasRef);
  predictionRes = await fetchPrediction(pixelsArray);

  if (predictionRes === null) {
    throw new Error("Couldn't Fetch Prediction!");
  }

  console.log(predictionRes);

  navigate("/prediction");
};

const PredictButton = () => {
  const canvasRef = useDrawCanvasContext();
  const predictionRes = usePredictionResponseContext();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => predictAndNavigate(navigate, canvasRef, predictionRes)}
    >
      Make Prediction
    </button>
  );
};

export default PredictButton;
