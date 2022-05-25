from fastapi import APIRouter

from business.teams import get_teams_from_json

teams_router = APIRouter()


@teams_router.get("/teams/search/Netherlands", tags=["teams"])
async def get_teams() -> dict:
    teams = get_teams_from_json()
    return {"api": {"teams": teams}}
