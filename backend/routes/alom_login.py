from fastapi import Request, HTTPException, status
from fastapi.routing import APIRouter

from passlib.context import CryptContext

from schemas import LoginRequest, ManagerInfo
from services.login_svc import get_manager_info

router = APIRouter(prefix="/login", tags=["Alom Login Page"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


@router.post("", response_model=ManagerInfo)
def login(request: Request, body: LoginRequest):
    manager_info = get_manager_info()

    is_correct_id = body.id == manager_info.id
    is_correct_pw = verify_password(
        plain_password=body.password,
        hashed_password=manager_info.password,
    )

    if not (is_correct_id and is_correct_pw):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="등록하신 계정 정보가 입력 정보와 다릅니다.",
        )

    # session에 저장
    request.session["manager_info"] = {
        "id": manager_info.id,
        "email": manager_info.email,
    }

    return ManagerInfo(id=manager_info.id, email=manager_info.email)


@router.post("/logout")
def logout(request: Request):
    request.session.pop("manager_info", None)
    return {"detail": "로그아웃되었습니다."}


@router.get("/me", response_model=ManagerInfo | None)
def me(request: Request):
    return request.session.get("manager_info")
