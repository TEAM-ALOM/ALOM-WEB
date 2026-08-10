from fastapi.routing import APIRouter

router = APIRouter(prefix="/alom/question", tags=["Alom Questions Page"])

@router.get("/")
async def questions_page():
    return {"message": "this is Alom question page"}