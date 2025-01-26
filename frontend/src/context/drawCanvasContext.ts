import { createContext, useContext } from "react";
import { CanvasElement } from "../types/CanvasElement.type";
import { MutableRefObject } from "react";

export const DrawCanvasContext = createContext<
  MutableRefObject<CanvasElement> | undefined
>(undefined);

export const useDrawCanvasContext = () => {
  const canvasRef = useContext(DrawCanvasContext);

  if (canvasRef === undefined) {
    throw new Error(
      "useDrawCanvasContext must be used with a DrawCanvasContext.Provider"
    );
  }

  return canvasRef;
};
