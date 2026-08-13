from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routes import (alom_main, 
                    alom_question, 
                    alom_archive, 
                    alom_member, 
                    alom_login)

from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv
import os

# Secret key
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

app = FastAPI()

# 정적 파일 서빙
app.mount("/static", StaticFiles(directory="templates"), name="static")

# session middleware 설정
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY, max_age=3600)

# 아롬 메인 페이지
app.include_router(alom_main.router)
# 아롬 자주 묻는 질문 페이지
app.include_router(alom_question.router)
# 아롬 아카이브 페이지
app.include_router(alom_archive.router)
# 아롬 멤버 페이지
app.include_router(alom_member.router)
# 아롬 로그인 페이지
app.include_router(alom_login.router)