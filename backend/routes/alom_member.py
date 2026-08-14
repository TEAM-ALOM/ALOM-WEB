from fastapi import Request
from fastapi.routing import APIRouter
from fastapi.templating import Jinja2Templates

router = APIRouter(prefix="/member", tags=["Alom Member Page"])

templates = Jinja2Templates(directory="templates")

@router.get("/")
async def member_page(request: Request):
    return templates.TemplateResponse(
            request=request,
            name="alom_member.html",
            context={}
        )