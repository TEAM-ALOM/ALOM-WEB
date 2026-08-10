from fastapi.routing import APIRouter

router = APIRouter(prefix="/alom/member", tags=["Alom Member Page"])

@router.get("/")
async def members_page():
    return {"message": "this is Alom member page"}