from fastapi import Request
from fastapi.routing import APIRouter
from fastapi.templating import Jinja2Templates

router = APIRouter(prefix="/alom", tags=["Alom Main Page"])

templates = Jinja2Templates(directory="templates")

@router.get("/")
async def main_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="alom_main.html",
        context={}
    )