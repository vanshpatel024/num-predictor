import numpy as np
import cv2
from PIL import Image
from tensorflow.keras.models import load_model
import os

model = load_model("model/mainModel.h5")

def preprocess_and_predict(image_path: str) -> str:
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # Invert white digits on dark background -> black digits on white
    img = cv2.bitwise_not(img)

    blurred = cv2.GaussianBlur(img, (5, 5), 0)
    _, thresh = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    kernel = np.ones((3, 3), np.uint8)
    closed = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
    eroded = cv2.erode(closed, kernel, iterations=1)

    contours, _ = cv2.findContours(eroded, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contours = sorted(contours, key=lambda ctr: cv2.boundingRect(ctr)[0])

    predicted_digits = []

    for ctr in contours:
        x, y, w, h = cv2.boundingRect(ctr)
        if w < 10 or h < 10:
            continue

        digit_roi = eroded[y:y+h, x:x+w]
        resized = cv2.resize(digit_roi, (24, 24), interpolation=cv2.INTER_AREA)
        padded = cv2.copyMakeBorder(resized, 4, 4, 4, 4, cv2.BORDER_CONSTANT, value=0)

        padded = padded / 255.0
        padded = padded.reshape(1, 32, 32, 1)

        prediction = np.argmax(model.predict(padded), axis=-1)[0]
        predicted_digits.append(str(prediction))

    return ''.join(predicted_digits)
