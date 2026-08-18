from fastapi.routing import APIRouter

from schemas import QuestionPageData

router = APIRouter(prefix="/question", tags=["Alom Question Page"])


@router.get("", response_model=QuestionPageData)
async def questions_page():
    return QuestionPageData()
