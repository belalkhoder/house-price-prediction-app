from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
from pathlib import Path
from app.api.routes import prediction

# 1. تحميل الموديل مرة واحدة عند بدء التشغيل (Lifespan)
ml_models = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    model_path = Path(__file__).resolve().parent.parent / "models" / "house_price.pkl"
    with open(model_path, "rb") as f:
        ml_models["model"] = pickle.load(f)
    yield
    ml_models.clear()

app = FastAPI(lifespan=lifespan)

# 2. إعدادات الـ CORS عشان الـ Frontend
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. الـ Router والـ Health Check
app.include_router(prediction.router, prefix="/api", tags=["Prediction"])

@app.get("/health")
def health_check():
    return {"status": "ok"}