import { MutableRefObject } from "react";

const ensureCanvasContext = (
  canvasContext: MutableRefObject<CanvasRenderingContext2D | null>
): CanvasRenderingContext2D => {
  if (!canvasContext.current) {
    throw new Error("Canvas Element Context has not been initialized!");
  }
  return canvasContext.current;
};

export default ensureCanvasContext;
