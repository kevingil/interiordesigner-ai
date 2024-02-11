from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.api import router as api_router
from routes.auth import router as auth_router
# from routes.billing import router as billing_router
import uvicorn

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("run:app", port=5000, log_level="info")

app.include_router(api_router)
app.include_router(auth_router)
# app.include_router(billing_router)


