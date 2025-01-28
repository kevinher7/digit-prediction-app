import { useNavigate } from "react-router-dom";

import { useDrawCanvasContext } from "../../context/drawCanvasContext";

import usePredictAndNavigate from "../../hooks/usePredictAndNavigate";

const PredictButton = () => {
  const canvasRef = useDrawCanvasContext();
  const navigate = useNavigate();

  return (
    <button onClick={() => usePredictAndNavigate(canvasRef, navigate)}>
      Make Prediction
    </button>
  );
};

export default PredictButton;
