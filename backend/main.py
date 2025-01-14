from flask import Flask, request
import tensorflow as tf
import numpy as np

MODEL_PATH = "./backend/model/digit-prediction.keras"

app = Flask(__name__)

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print(f"\n\nSuccesfully imported model from {MODEL_PATH}\n\n")
except Exception as e:
    raise RuntimeError(f"Failed to load model from {MODEL_PATH}: {e}")


@app.post("/api/prediction")
def prediction_post():
    pixel_list = request.get_json()["pixel_data"]

    if (len(pixel_array) != 784):
        return "Invalid Request"

    pixel_array = np.array(pixel_list)

    # add an extra dimension to give it
    # a "batch-like" shape of (1, 784)
    pixel_array = np.expand_dims(pixel_array, 0)
    prediction = model.predict(pixel_array)

    return prediction[0].tolist()


if __name__ == "__main__":
    app.run(debug=True)
