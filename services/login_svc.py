from dotenv import load_dotenv
from pydantic import BaseModel
import os

class manager_info(BaseModel):
    id: str
    password: str

# manager info 가져오는 함수
def get_manager_info():
    id = load_dotenv("id")
    password = load_dotenv("password")

    info = manager_info(id=id, password=password)

    return info