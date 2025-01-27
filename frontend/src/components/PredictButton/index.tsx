import { useDrawCanvasContext } from "../../context/drawCanvasContext";
import { CanvasElement } from "../../types/CanvasElement.type";

// JUST SEND THIS TO THE BACKEND AND USE NUMPY FOR REAL xd
const getPixelsFromCanvas = (
  canvasRef: React.MutableRefObject<CanvasElement>
): Uint8ClampedArray => {
  const canvas = canvasRef.current;
  if (!canvas) {
    throw new Error("Canvas could not be located!");
  }

  const canvasContext = canvas.getContext("2d");
  if (!canvasContext) {
    throw new Error("Canvas context could not be retrieved!");
  }

  // const canvasLength = 560;
  const canvasImageData = canvasContext.getImageData(0, 0, 560, 560);

  fetchPrediction(canvasImageData.data);
  // This array has 4 numbers associated to each pixel (4*560*560)
  return canvasImageData.data;
};

const fetchPrediction = async (pixelsArray: Uint8ClampedArray) => {
  const prediction = await fetch("http://127.0.0.1:5000/api/prediction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pixel_data: Array.from(pixelsArray),
    }),
  });

  console.log(await prediction.json());
};

const PredictButton = () => {
  const canvasRef = useDrawCanvasContext();

  return (
    <button onClick={() => getPixelsFromCanvas(canvasRef)}>
      Make Prediction
    </button>
  );
};

export default PredictButton;
