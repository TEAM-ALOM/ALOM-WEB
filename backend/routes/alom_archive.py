from fastapi.routing import APIRouter

from schemas import ArchivePageData

router = APIRouter(prefix="/archive", tags=["Alom Archive Page"])


@router.get("", response_model=ArchivePageData)
async def archive_page():
    return ArchivePageData()
