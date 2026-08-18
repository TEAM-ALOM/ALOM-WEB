from typing import Annotated
from fastapi import Depends, Request
from fastapi.routing import APIRouter
from fastapi.templating import Jinja2Templates

router = APIRouter(tags=["Alom Main Page"])

templates = Jinja2Templates(directory="templates")

@router.get("/")
async def main_page(
    request: Request,
):
    return templates.TemplateResponse(
        request=request,
        name="alom_main.html",
        context={}
    )
