from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.routers import auth

app = FastAPI()

app.include_router(auth.router, prefix="/auth", tags=["auth"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
