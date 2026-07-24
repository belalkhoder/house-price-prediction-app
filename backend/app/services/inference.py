import joblib
import numpy as np
from pathlib import Path
from app.services.preprocessing import prepare_input_data
MODEL_PATH = Path(__file__).resolve().parent.parent.parent / "models" / "house_price.pkl"
model = None
def load_model():
    global model
    if model is None and MODEL_PATH.exists():
        model = joblib.load(MODEL_PATH)
def get_prediction(request_data: dict) -> float:
    global model
    if model is None:
        load_model()
    df_input = prepare_input_data(request_data)
    pred_log = model.predict(df_input)
    predicted_price = float(np.expm1(pred_log[0]))
    return round(predicted_price, 2)