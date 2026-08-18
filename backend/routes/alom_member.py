from fastapi.routing import APIRouter

from schemas import MemberPageData

router = APIRouter(prefix="/member", tags=["Alom Member Page"])


@router.get("", response_model=MemberPageData)
async def member_page():
    return MemberPageData()
