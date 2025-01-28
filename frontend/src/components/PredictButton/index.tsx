import { useDrawCanvasContext } from "../../context/drawCanvasContext";

import fetchPrediction from "../../utils/fetchPrediction";
import getPixelsFromCanvas from "../../utils/getPixelsFromCanvas";

const PredictButton = () => {
  const canvasRef = useDrawCanvasContext();

  return (
    <button onClick={() => fetchPrediction(getPixelsFromCanvas(canvasRef))}>
      Make Prediction
    </button>
  );
};

export default PredictButton;
