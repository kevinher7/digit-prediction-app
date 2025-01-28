import { createContext, useContext } from "react";
import { PredictionResponse } from "../types/PredictionResponse.type";

export const PredictionResponseContext = createContext<
  PredictionResponse | undefined | null
>(undefined);

export const usePredictionResponseContext = () => {
  const predictionContext = useContext(PredictionResponseContext);
  if (predictionContext === undefined) {
    throw new Error(
      "usePredictionResponseContext must be used with a PredictionResponseContext.Provider"
    );
  }

  return predictionContext;
};
