from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.root import root_router


origins = ["http://0.0.0.0:3000",
           "http://localhost:3000", "http://frontend:3000"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(root_router)
