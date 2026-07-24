from fastapi import APIRouter
from app.schemas.prediction import PredictionRequest
from app.services.inference import get_prediction

router = APIRouter()

@router.post("/predict")
def predict_house_price(data: PredictionRequest):
    price = get_prediction(data)
    return {"predicted_price": price}