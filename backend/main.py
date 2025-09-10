from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
from tensorflow import keras
from PIL import Image
import io
import logging
import sys


app = FastAPI()
tf.config.set_visible_devices([], "GPU")

#add this so any domain can access the api
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = keras.models.load_model('backend/models/best_garbage.keras')
# Configure logging to always print to stdout
logging.basicConfig(
    level=logging.INFO,
    stream=sys.stdout,
    format="%(asctime)s - %(levelname)s - %(message)s",
    force=True  # ensures it overrides existing logging config
)
logger = logging.getLogger("uvicorn")

IMG_SIZE = (224, 224)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    image = image.resize(IMG_SIZE)
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)

    predictions = model.predict(image_array)
    predicted_class = np.argmax(predictions, axis=1)[0] 
    return {
        "predicted_class": int(predicted_class),
        "confidence": float(np.max(predictions))
    }

@app.get("/ping")
async def ping():
    logger.info("Pinged!")
    print("Pinged!")
    return {"message": "pong!"}