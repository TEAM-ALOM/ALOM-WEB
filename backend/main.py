from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes import alom_archive, alom_login, alom_main, alom_member
from routes import (alom_question)

from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv
import os

# Secret key
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

# 프론트엔드(Next.js) 개발 서버 등 JSON API를 호출할 origin 목록
FRONTEND_ORIGINS = [
    origin.strip()
    for origin in os.getenv("FRONTEND_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]

app = FastAPI(redirect_slashes=False)

# 정적 파일 서빙
app.mount("/static", StaticFiles(directory="templates"), name="static")

# CORS 설정: 프론트엔드가 다른 origin에서 세션 쿠키와 함께 API를 호출할 수 있게 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# session middleware 설정
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY, max_age=3600)

# 아롬 메인 페이지
app.include_router(alom_main.router, prefix="/api")
# 아롬 자주 묻는 질문 페이지
app.include_router(alom_question.router, prefix="/api")
# 아롬 아카이브 페이지
app.include_router(alom_archive.router, prefix="/api")
# 아롬 멤버 페이지
app.include_router(alom_member.router, prefix="/api")
# 아롬 로그인 페이지
app.include_router(alom_login.router, prefix="/api")