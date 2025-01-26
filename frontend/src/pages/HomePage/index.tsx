import { useRef } from "react";

import DrawCanvas from "../../components/DrawCanvas";

import { CanvasElement } from "../../types/CanvasElement.type";
import { DrawCanvasContext } from "../../context/drawCanvasContext";

import "./index.css";
import PredictButton from "../../components/PredictButton";

const HomePage = () => {
  const canvasRef = useRef<CanvasElement>(null);

  return (
    <main className="home-main">
      <h1>Digit Prediction</h1>
      <DrawCanvasContext.Provider value={canvasRef}>
        <DrawCanvas />
        <PredictButton />
      </DrawCanvasContext.Provider>
    </main>
  );
};

export default HomePage;
