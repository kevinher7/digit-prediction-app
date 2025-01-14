import express, { Request, Response } from "express";

import { io } from "@tensorflow/tfjs-node";
// import loadModel from "./utils/modelLoader";

import * as tf from "@tensorflow/tfjs";
import { loadGraphModel } from "@tensorflow/tfjs-converter";

const MODEL_PATH = "./src/tensorflow/model.json";
const BIN_PATH = "./src/tensorflow/group1-shard1of1.bin";

const app = express();

const PORT = 8050;

// let model: LayersModel | undefined = undefined;

app.post("/api/prediction", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("hi");
});

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  try {
    // const handler = io.browserFiles([MODEL_PATH, BIN_PATH]);
    const handler = io.fileSystem(MODEL_PATH);
    const model = await tf.loadLayersModel(handler);
    // const model = await tf.loadGraphModel(handler);
    console.log(model);
  } catch (error) {
    console.error(`Failed to load model from ${MODEL_PATH}:`, error);
    return null;
  }
});
