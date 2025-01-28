import { useNavigate } from "react-router-dom";

import { useDrawCanvasContext } from "../../context/drawCanvasContext";
import { usePredictionResponseContext } from "../../context/predictionResponseContext";

import usePredictAndNavigate from "../../hooks/usePredictAndNavigate";

const PredictButton = () => {
  const canvasRef = useDrawCanvasContext();
  const predictionRes = usePredictionResponseContext();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => usePredictAndNavigate(canvasRef, predictionRes, navigate)}
    >
      Make Prediction
    </button>
  );
};

export default PredictButton;
