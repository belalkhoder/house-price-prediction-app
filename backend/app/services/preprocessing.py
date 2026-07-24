import pandas as pd
from app.schemas.prediction import PredictionRequest

def preprocess_input(data: PredictionRequest) -> pd.DataFrame:
    input_data = data.model_dump()
    hp = pd.DataFrame([input_data])
    
    return hp