from fastapi.routing import APIRouter

router = APIRouter(prefix="/alom/curriculum", tags=["Alom Curriculum Page"])

@router.get("/")
async def curriculum_page():
    return {"message": "this is Alom curriculum page"}