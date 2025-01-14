import * as tf from "@tensorflow/tfjs";

const MODEL_PATH = "../tensorflow/model.json";

const loadModel = async () => {
  try {
    return await tf.loadLayersModel(MODEL_PATH);
  } catch (error) {
    console.error(`Failed to load model from ${MODEL_PATH}:`, error);
    return null;
  }
};

export default loadModel;

// const cat = document.getElementById("cat");
// model.execute(tf.browser.fromPixels(cat));
