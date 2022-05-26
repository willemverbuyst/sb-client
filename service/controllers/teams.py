from fastapi import APIRouter
from typing import Union
from fastapi import Header
from business.teams import get_teams_from_json
from business.validators import validate_api_key

teams_router = APIRouter()


@teams_router.get("/teams/search/Netherlands", tags=["teams"])
async def get_teams(X_RapidAPI_Key: Union[str, None] = Header(default=None)) -> dict:
    valid = validate_api_key(X_RapidAPI_Key)
    if not valid:
        return {"message": "unauthorized"}

    teams = get_teams_from_json()
    return {"api": {"teams": teams}}
