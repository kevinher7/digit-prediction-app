import { useEffect, useRef, useState } from "react";
import { MouseEvent } from "react";

import { useDrawCanvasContext } from "../context/drawCanvasContext";
import ensureCanvasContext from "../utils/ensureCanvasContext";

const useDraw = (canvasLength: number) => {
  const canvasRef = useDrawCanvasContext();
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      throw new Error("Could not locate the canvas!");
    }

    canvasContext.current = canvas.getContext("2d");

    if (!canvasContext.current) {
      throw new Error("Could not fetch canvas 2d context!");
    }

    const canvasCtx = canvasContext.current;

    canvasCtx.lineCap = "round";
    canvasCtx.lineJoin = "round";
    canvasCtx.lineJoin = "round";
    canvasCtx.globalAlpha = 0.5;
    canvasCtx.strokeStyle = "white";

    // In order to replicate the scale of the original dataset
    // we make the width of the strokes 10% of the total canvas length
    canvasCtx.lineWidth = canvasLength * 0.1;
  }, []);

  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvasDrawContext = ensureCanvasContext(canvasContext);

    canvasDrawContext.beginPath();
    canvasDrawContext.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }

    const canvasDrawContext = ensureCanvasContext(canvasContext);

    canvasDrawContext.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvasDrawContext.stroke();
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    const canvasDrawContext = ensureCanvasContext(canvasContext);

    canvasDrawContext.closePath();
    setIsDrawing(false);
  };

  return { canvasRef, startDrawing, draw, stopDrawing };
};

export default useDraw;
