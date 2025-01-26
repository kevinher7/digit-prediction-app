import { useRef } from "react";

import { DrawCanvasContext } from "../../context/drawCanvasContext";
import { CanvasElement } from "../../types/CanvasElement.type";

import DrawCanvas from "../../components/DrawCanvas";

import "./index.css";

const HomePage = () => {
  const canvasRef = useRef<CanvasElement>(null);

  return (
    <main className="home-main">
      <h1>Digit Prediction</h1>
      <DrawCanvasContext.Provider value={canvasRef}>
        <DrawCanvas />
        <button>Make Prediction</button>
      </DrawCanvasContext.Provider>
    </main>
  );
};

export default HomePage;
