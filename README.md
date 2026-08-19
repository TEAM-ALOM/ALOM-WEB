# ALOM-WEB
ALOM PUBLIC WEBSITE

## 테스트 방법

프로젝트는 FastAPI 백엔드와 Next.js 프론트엔드로 구성되어 있습니다.  
테스트하려면 두 서버를 각각 실행해야 합니다.

### 1. 백엔드 환경변수 설정

`backend` 폴더에 `.env` 파일을 생성하고 다음 내용을 작성합니다.

```env
SECRET_KEY=테스트용_비밀키
FRONTEND_ORIGINS=http://localhost:3000
```

`FRONTEND_ORIGINS`에는 FastAPI API 호출을 허용할 프론트엔드 주소를 설정합니다.  
여러 주소를 허용하려면 쉼표로 구분합니다.

```env
FRONTEND_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 2. FastAPI 백엔드 실행

프로젝트 루트에서 다음 명령어를 실행합니다.

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port=8081
```

백엔드 서버는 다음 주소에서 실행됩니다.

- API 서버: http://localhost:8081
- API 문서: http://localhost:8081/docs

> `templates` 등 백엔드 내부 파일의 상대 경로를 사용하므로 `backend` 폴더에서 서버를 실행해야 합니다.

### 3. 프론트엔드 환경변수 설정

새 터미널을 열고 `frontend/.env.local` 파일을 생성합니다.

```env
BACKEND_URL=http://127.0.0.1:8081
```

`BACKEND_URL`은 Next.js가 `/api/*` 요청을 전달할 FastAPI 서버 주소입니다.

예를 들어 프론트엔드에서 `/api/main`을 요청하면 다음 주소로 전달됩니다.

```text
http://127.0.0.1:8081/api/main
```

### 4. Next.js 프론트엔드 실행

프로젝트 루트에서 다음 명령어를 실행합니다.

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 다음 주소로 접속합니다.

- 프론트엔드: http://localhost:3000

### 서버 주소 정리

| 구분 | 주소 |
| --- | --- |
| Next.js 프론트엔드 | http://localhost:3000 |
| FastAPI 백엔드 | http://localhost:8081 |
| FastAPI API 문서 | http://localhost:8081/docs |


### commit 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경 (코드 포매팅, 세미콜론 누락 등)
design: 사용자 UI 디자인 변경 (CSS 등)
test: 테스트 코드, 리팩토링 (Test Code)
refactor: 리팩토링 (Production Code)
build: 빌드 파일 수정
ci: CI 설정 파일 수정
perf: 성능 개선
chore: 자잘한 수정이나 빌드 업데이트
rename: 파일 혹은 폴더명을 수정만 한 경우
remove: 파일을 삭제만 한 경우
```
