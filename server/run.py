from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from routes.services import router as services
from routes.users import router as users
from database import create_pool, get_db
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

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    pool = loop.run_until_complete(create_pool())

    app.include_router(services, dependencies=[Depends(get_db)])
    app.include_router(users, dependencies=[Depends(get_db)])

    uvicorn.run("run:app", port=5000, log_level="info")

