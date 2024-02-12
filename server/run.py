from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from routes import services, users
from database import create_pool
import uvicorn
import asyncio

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(services.router)
app.include_router(users.router)
#app.include_router(billing.router)


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    pool = loop.run_until_complete(create_pool())

    uvicorn.run("run:app", port=5000, log_level="info")

