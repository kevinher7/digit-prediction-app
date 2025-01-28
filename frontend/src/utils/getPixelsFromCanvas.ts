import { CanvasElement } from "../types/CanvasElement.type";

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

  // This array has 4 numbers associated to each pixel (4*560*560)
  return canvasImageData.data;
};

export default getPixelsFromCanvas;
