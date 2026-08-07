from fastapi.routing import APIRouter

router = APIRouter(prefix="/alom", tags=["Alom Main Page"])

@router.get("/")
async def main_page():
    return {"message": "this is Alom main page"}