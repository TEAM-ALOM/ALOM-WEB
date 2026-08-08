from fastapi.routing import APIRouter

router = APIRouter(prefix="/alom/archive", tags=["Alom Archive Page"])

@router.get("/")
async def archive_page():
    return {"message": "this is Alom archive page"}