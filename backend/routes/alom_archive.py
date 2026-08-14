from fastapi import Request
from fastapi.routing import APIRouter
from fastapi.templating import Jinja2Templates

router = APIRouter(prefix="/archive", tags=["Alom Archive Page"])
templates = Jinja2Templates(directory="templates")

@router.get("/")
async def archive_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="alom_archive.html",
        context={}
    )