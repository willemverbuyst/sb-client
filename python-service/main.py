from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.fixtures import fixtures_router
from controllers.root import root_router
from controllers.teams import teams_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(fixtures_router)
app.include_router(root_router)
app.include_router(teams_router)
