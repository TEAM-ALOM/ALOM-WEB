from fastapi import Request
from fastapi.routing import APIRouter
from fastapi.templating import Jinja2Templates

router = APIRouter(prefix="/question", tags=["Alom Question Page"])

templates = Jinja2Templates(directory="templates")

@router.get("/")
async def questions_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="alom_question.html",
        context={}
    )