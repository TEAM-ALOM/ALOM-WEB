from fastapi.routing import APIRouter

from schemas import MainPageData

router = APIRouter(tags=["Alom Main Page"])


@router.get("", response_model=MainPageData)
async def main_page():
    return MainPageData()
