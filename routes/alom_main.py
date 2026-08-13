from typing import Annotated
from fastapi import Depends, Request
from fastapi.routing import APIRouter
from fastapi.templating import Jinja2Templates

from routes.alom_login import User, get_current_user_optional

router = APIRouter(tags=["Alom Main Page"])

templates = Jinja2Templates(directory="templates")

@router.get("/")
async def main_page(
    request: Request,
    current_user: Annotated[User | None, Depends(get_current_user_optional)],
):
    return templates.TemplateResponse(
        request=request,
        name="alom_main.html",
        context={"current_user": current_user}
    )