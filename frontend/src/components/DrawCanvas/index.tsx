import { useRef, useEffect, useState } from "react";
import { MouseEvent } from "react";

import "./index.css";

const DrawCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasLength = 560;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    canvasContext.current = canvas.getContext("2d");

    if (!canvasContext.current) {
      return;
    }

    canvasContext.current.lineCap = "round";
    canvasContext.current.lineJoin = "round";
    canvasContext.current.lineJoin = "round";
    canvasContext.current.globalAlpha = 0.5;
    canvasContext.current.strokeStyle = "white";

    // In order to replicate the scale of the original dataset
    // we make the width of the strokes 10% of the total canvas length
    canvasContext.current.lineWidth = canvasLength * 0.1;
  }, []);

  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    if (canvasContext.current === null) {
      return;
    }

    canvasContext.current.beginPath();
    canvasContext.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    if (canvasContext.current === null) {
      return;
    }

    canvasContext.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvasContext.current.stroke();
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    if (canvasContext.current === null) {
      return;
    }

    canvasContext.current.closePath();
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      width={`${canvasLength}px`}
      height={`${canvasLength}px`}
    ></canvas>
  );
};

export default DrawCanvas;
