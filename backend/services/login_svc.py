from dotenv import load_dotenv
from pydantic import BaseModel
import os

class manager_info(BaseModel):
    email: str
    id: str
    password: str

# manager info 가져오는 함수
def get_manager_info():
    load_dotenv()
    email = os.getenv("email")
    id = os.getenv("id")
    password = os.getenv("password")

    info = manager_info(id=id, password=password, email=email)

    return info