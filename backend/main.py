from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from utils import preprocess_and_predict
import shutil
import os
from dotenv import load_dotenv

# Load .env variables
load_dotenv()

# Create FastAPI app
app = FastAPI()

# Load allowed origins from .env
raw_origins = os.getenv("ALLOWED_ORIGINS", "")
allowed_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    temp_dir = "backend/temp"
    os.makedirs(temp_dir, exist_ok=True)

    temp_path = os.path.join(temp_dir, "uploaded.png")
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = preprocess_and_predict(temp_path)
    return {"prediction": result}
