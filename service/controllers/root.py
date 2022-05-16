from fastapi import APIRouter

root_router = APIRouter()


@root_router.get("/", tags=["root"])
async def test_root() -> dict:
    return {"message": "Hello from the toto game service"}
