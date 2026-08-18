from fastapi import Request, Form
from fastapi.responses import RedirectResponse
from fastapi.routing import APIRouter
from fastapi.templating import Jinja2Templates
from fastapi.exceptions import HTTPException

from passlib.context import CryptContext
from pydantic import EmailStr

from services.login_svc import get_manager_info

router = APIRouter(prefix="/login", tags=["Alom Login Page"])

templates = Jinja2Templates(directory="templates")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_hashed_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

# 로그인 페이지    
@router.get("/")
def login_ui(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="alom_login.html",
        context={}
    )

@router.post("/")
def register_ui(request: Request,
                id: str = Form(min_length=5, max_length=30),
                password: str = Form(min_length=5, max_length=30)):
    # manager 정보 가져오기
    manager_info = get_manager_info()
    hashed_password = manager_info.password

    # 비밀번호 검증
    is_correct_pw = verify_password(plain_password=password,
                                    hashed_password = hashed_password)

    if not is_correct_pw:
        
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="등록하신 패스워드 정보가 입력 정보와 다릅니다.")

    # session에 저장
    request.session["manager_info"] = {
        "id": manager_info.id, 
        "email": manager_info.email
        }

    return RedirectResponse("/", status_code=302)
