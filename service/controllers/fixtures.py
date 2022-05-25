from fastapi import APIRouter
from dotenv import load_dotenv
import os
from business.fixtures import get_fixtures_from_json
load_dotenv()

fixtures_router = APIRouter()

league_id = os.getenv("LEAGUE_ID")


@fixtures_router.get(f"/fixtures/league/{league_id}", tags=["fixtures"])
async def get_fixtures() -> dict:
    fixtures = get_fixtures_from_json()
    return {"api": {"fixtures": fixtures}}
