from fastapi import APIRouter

from business.fixtures import get_fixtures_from_json

fixtures_router = APIRouter()


@fixtures_router.get("/fixtures", tags=["fixtures"])
async def get_fixtures() -> dict:
    teams = get_fixtures_from_json()
    return teams
