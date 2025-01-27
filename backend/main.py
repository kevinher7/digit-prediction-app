from flask import Flask, jsonify, request
from flask_cors import CORS
import tensorflow as tf
import matplotlib.pyplot as plt
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

        raw_pixel_array = np.array(pixel_list)
        rgb_pixel_array = raw_pixel_array.reshape(313600, 4)

        rgb_pixel_array = rgb_pixel_array[:, :-1]

        pixel_array = rgb_pixel_array[:, 0]*0.299 + \
            rgb_pixel_array[:, 1]*0.587 + rgb_pixel_array[:, 2]*0.114

        # Make it a big quare
        pixel_array = pixel_array.reshape(560, 560)
        # Separate into 28*28 groups of pixels
        pixel_array = pixel_array.reshape(28, 20, 28, 20)
        # Average the color in each group
        pixel_array = pixel_array.mean(axis=(1, 3))
        # Flatten the result
        pixel_array = pixel_array.flatten()

        plt.imshow(pixel_array.reshape(28, 28), cmap='gray')
        plt.axis('off')  # Turn off the axes for a clean image display
        plt.savefig("output_image.png", bbox_inches='tight', pad_inches=0)

        pixel_array = pixel_array / 255  # Normalize

        # add an extra dimension to give it
        # a "batch-like" shape of (1, 784)
        pixel_array = np.expand_dims(pixel_array, 0)
        prediction = model.predict(pixel_array)

        prediction_normalized = prediction / np.sum(prediction[0])

        return jsonify({"prediction": int(np.argmax(prediction[0])),
                        "probabilities": prediction_normalized.tolist()}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
