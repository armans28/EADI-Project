from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
import tensorflow as tf

app = Flask(__name__)

# Load the model
model_path = 'C:/Users/jonas/Downloads/CAPSTONE EADI/Model ML/best_modelResNetv4.h5'
model = tf.keras.models.load_model(model_path)
class_labels = ['Autistic', 'Non-Autistic']

@app.route('/predict', methods=['POST'])
def predict():
    # Get the uploaded image
    file = request.files['image']

    # Read and preprocess the image
    img = image.load_img(file, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0

    # Make predictions
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions)
    predicted_label = class_labels[predicted_class]

    # Prepare the response
    response = {
        'predicted_label': predicted_label
    }

    return jsonify(response)

if __name__ == '__main__':
    app.debug = True 
    app.run()
