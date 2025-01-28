from flask import Flask, jsonify, request
from flask_cors import CORS
from utils import PixelArrayPreprocessor
import tensorflow as tf
import numpy as np

MODEL_PATH = "./model/digit-prediction.keras"

(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print(f"\n\nSuccesfully imported model from {MODEL_PATH}\n\n")
except Exception as e:
    raise RuntimeError(f"Failed to load model from {MODEL_PATH}: {e}")


@app.post("/api/prediction")
def prediction_post():
    try:
        pixel_list = request.get_json()["pixel_data"]

        if (len(pixel_list) != 560*560*4):
            raise ValueError(
                "Request array is not the appropriate length (560x560x4)")

        # Image Preprocessing
        pixel_preprocessor = PixelArrayPreprocessor(pixel_list)
        pixel_preprocessor.parse()
        pixel_array = pixel_preprocessor.normalize_and_expand()

        # Resulting image data
        image_base64_string = pixel_preprocessor.encode_to_base64()

        predictions = model.predict(pixel_array)
        predictions_normalized = predictions / np.sum(predictions[0])

        return jsonify({"prediction": int(np.argmax(predictions[0])),
                        "probabilities": predictions_normalized.tolist(),
                        "image_base64": image_base64_string}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
