from pydantic import BaseModel


class LoginRequest(BaseModel):
    id: str
    password: str


class ManagerInfo(BaseModel):
    id: str
    email: str


class MainPageData(BaseModel):
    notices: list[str] = []


class ArchiveItem(BaseModel):
    title: str
    url: str


class ArchivePageData(BaseModel):
    items: list[ArchiveItem] = []


class MemberInfo(BaseModel):
    name: str
    role: str


class MemberPageData(BaseModel):
    members: list[MemberInfo] = []


class FaqItem(BaseModel):
    question: str
    answer: str


class QuestionPageData(BaseModel):
    faqs: list[FaqItem] = []
