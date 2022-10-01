import os
from fastapi import APIRouter
from typing import Union
from fastapi import Header
from dotenv import load_dotenv
from business.fixtures import get_fixtures_from_json
from business.validators import validate_api_key
load_dotenv()

fixtures_router = APIRouter()

league_id = os.getenv("LEAGUE_ID")


@fixtures_router.get(f"/fixtures/league/{league_id}", tags=["fixtures"])
async def get_fixtures(X_RapidAPI_Key: Union[str, None] = Header(default=None)) -> dict:
    valid = validate_api_key(X_RapidAPI_Key)
    if not valid:
        return {"message": "unauthorized"}

    fixtures = get_fixtures_from_json()
    return {"api": {"fixtures": fixtures}}
