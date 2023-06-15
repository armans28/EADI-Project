from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
import tensorflow as tf
import tempfile
import os


app = Flask(__name__)

# Load the model
model = tf.keras.models.load_model("best_modelResNetv4.h5")
class_labels = ['Non-Autistic', 'Autistic']

@app.route('/predict', methods=['POST'])
def predict():
    # Get the uploaded image
    file = request.files['image']

    # Create a temporary file
    temp_file = tempfile.NamedTemporaryFile(suffix='.jpg', delete=False)
    temp_path = temp_file.name

    # Save the uploaded file to the temporary location
    file.save(temp_path)

    # Read and preprocess the image
    img = image.load_img(temp_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0

    # Make predictions
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions)
    predicted_label = class_labels[predicted_class]

    # Cleanup: Remove the temporary file
    temp_file.close()
    os.remove(temp_path)

    # Prepare the response
    return jsonify(predicted_label)

if __name__ == '__main__':
    app.debug = True 
    app.run()
