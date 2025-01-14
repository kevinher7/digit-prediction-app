from flask import Flask, request
import tensorflow as tf
import numpy as np

MODEL_PATH = "./backend/model/digit-prediction.keras"

app = Flask(__name__)

model = tf.keras.models.load_model(MODEL_PATH)

# Add errorhandlers
# @app.errorhandler(404)
# def resource_not_found(e):
#     return jsonify(error=str(e)), 404


@app.post("/api/prediction")
def prediction_post():
    pixel_list = request.get_json()["pixel_data"]
    pixel_array = np.array(pixel_list)

    # add an extra dimension to give it a "batch-like" shape
    # (1, 784)
    pixel_array = np.expand_dims(pixel_array, 0)

    if (len(pixel_array) != 784):
        return "Invalid Request"

    prediction = model.predict()

    return prediction[0].tolist()


if __name__ == "__main__":
    app.run(debug=True)
