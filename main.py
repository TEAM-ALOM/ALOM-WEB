from fastapi import FastAPI
from routes import alom, alom_question, alom_archive, alom_member


app = FastAPI()

app.include_router(alom.router)
app.include_router(alom_question.router)
app.include_router(alom_archive.router)
app.include_router(alom_member.router)