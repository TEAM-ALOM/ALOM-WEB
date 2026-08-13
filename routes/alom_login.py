from fastapi import Reqeust, Depends
from fastapi.routing import APIRouter
from fastapi.security import OAuth2PasswordBearer

from typing import Annotated
from pydantic import BaseModel

router = APIRouter(tags=["Alom Login Page"])

oauth2_sheme = OAuth2PasswordBearer(tokenUrl="token")

class User(BaseModel):
    username: str
    id: str
    password: str
    disabled: bool | None = None

def fake_decode_token(token):
    return User(
        username=token + "fakedecoded", id="1", password="1234", disabled=False
    )

async def get_current_user(token: Annotated[str, Depends(oauth2_sheme)]):
    user = fake_decode_token(token)
    return user

@router.get("/login/")
async def login_page(request: Reqeust, user: Annotated[User, Depends(get_current_user)]):
    return {"user": user}