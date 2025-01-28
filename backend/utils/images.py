import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
import io
import base64


class PixelArrayPreprocessor:
    def __init__(self, pixel_list):
        self.pixel_array = np.array(pixel_list)

    def parse(self):
        # 313600 = array_len / 4
        rgba_pixels = self.pixel_array.reshape(313600, 4)
        rgb_pixels = rgba_pixels[:, :-1]  # Remove alpha column

        gray_pixels = rgb_pixels[:, 0]*0.299 + \
            rgb_pixels[:, 1]*0.587 + rgb_pixels[:, 2]*0.114

        # Seprate Pixels into 28*28 groups of 20*20
        pixel_array = gray_pixels.reshape(560, 560)
        pixel_array = pixel_array.reshape(28, 20, 28, 20)

        # Convert groups the 20*20 groups into a single pixel
        pixel_array = pixel_array.mean(axis=(1, 3))

        self.pixel_array = pixel_array.flatten()

    def normalize_and_expand(self):
        pixel_array_ready = self.pixel_array / 255  # Normalize pixel data

        # Add an extra dimension to give it
        # a "batch-like" shape of (1, 784)
        self.pixel_array_ready = np.expand_dims(pixel_array_ready, 0)

        return self.pixel_array_ready

    def encode_to_base64(self):
        img = Image.fromarray(self.pixel_array, mode="L")

        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)  # Reset file pointer to the start

        img_base64 = base64.b64encode(buffer.read()).decode("utf-8")

        return img_base64
