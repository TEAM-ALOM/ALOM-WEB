// backend/schemas.py 의 Pydantic 모델과 1:1로 대응한다.
// TODO: 추후 openapi-typescript로 자동 생성해 이 파일을 대체할 수 있다.

export type ManagerInfo = {
  id: string;
  email: string;
};

export type ArchiveItem = {
  title: string;
  url: string;
};

export type ArchivePageData = {
  items: ArchiveItem[];
};

export type MemberInfo = {
  name: string;
  role: string;
};

export type MemberPageData = {
  members: MemberInfo[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type QuestionPageData = {
  faqs: FaqItem[];
};
