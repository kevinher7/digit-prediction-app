import useDraw from "../../hooks/useDraw";
import "./index.css";

const DrawCanvas = () => {
  const canvasLength = 560;

  const { canvasRef, startDrawing, draw, stopDrawing } = useDraw(canvasLength);

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
