import pickle
from pathlib import Path
from app.services.preprocessing import preprocess_input
from app.schemas.prediction import PredictionRequest

MODEL_PATH = Path(__file__).resolve().parent.parent.parent / "models" / "house_price.pkl"

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

def get_prediction(data: PredictionRequest):
    hp = preprocess_input(data)
    prediction = model.predict(hp)
    return float(prediction[0])