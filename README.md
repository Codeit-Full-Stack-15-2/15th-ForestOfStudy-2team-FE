# 팀 INT

### 팀 페이지
https://app.notion.com/p/e3c8809438758323bf53011c508f434e?v=1c08809438758257856408805b151014&source=copy_link

### 팀원 구성
곽소철 [깃허브](https://github.com/thcjfd)

윤욱진 [깃허브](https://github.com/Guts91-creator)

김재영 [깃허브](개인 Github 링크)

황영환 [깃허브](개인 Github 링크)

김다찬 [깃허브](개인 Github 링크)

### 프로젝트 소개
**공부의 숲**은 개인의 공부 습관과 집중 시간을 기록하고, 다른 사람의 스터디를 둘러보며 함께 학습할 수 있는 **공부 관리 및 커뮤니티 서비스**입니다.

사용자는 자신만의 스터디를 생성하고 매일 반복할 습관을 관리할 수 있으며, 집중 타이머를 통해 공부 시간을 기록하고 포인트를 획득할 수 있습니다. 또한 다른 사용자의 스터디를 검색·조회하고 이모지로 응원할 수 있습니다.
프로젝트 기간: 2026.09.01 ~ 2024.09.17

### 기술 스택
| 구분 | 기술 |
| --- | --- |
| **Language** | JavaScript |
| **Frontend** | React, Vite, CSS Modules |
| **Backend** | Node.js, Express.js, Prisma ORM |
| **Database** | PostgreSQL, Supabase |
| **Validation** | Zod |
| **API** | REST API, Fetch API |
| **Version Control** | Git, GitHub |
| **Code Quality** | ESLint, Prettier |
| **API / DB Test** | Swagger, DBeaver |
| **Communication** | Discord, Notion |

### 팀원별 구현 기능 상세
곽소철
  <p>
  <img width="500" height="394" alt="image" src="https://github.com/user-attachments/assets/c06f7b3b-61f0-4aa2-b627-39ccbe4ac110" />
</p>
타이머 기능, 시간 조정 기능, 타이머 만료 시 포인트 획득 기능

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

소셜 로그인 기능
구글 소셜 로그인 API 사용으로 소셜 로그인 기능 구현
사이트 이용을 위한 추가 정보 입력 기능 구현
소셜 로그인 후 회원 추가 정보 입력 기능
user 타입(관리자, 학생)에 대한 조건부 추가 입력 모달창 기능 및 페이지 이동 기능 구현
제이든
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

Nav
회원별 버튼 조건부 렌더링(학생: 커리어, 스킬, 수강후기, 커뮤니티, 관리자: 회원 관리 관리자 페이지)
반응형 레이아웃 구현
메인페이지
fetch(POST, GET)을 사용하여 무료 수강 종료 시간 기능 구현
공용 Modal 컴포넌트
공용으로 사용할 Modal 컴포넌트 구현
마크
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

마이 페이지
fetch(GET)를 사용하여 수강생 개인별 시간 정보 표시
반응형 레이아웃 구현
공용 Button 컴포넌트
공용으로 사용할 Button 컴포넌트 구현
데이지
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

관리자 페이지
path parameter를 사용하여 학생 페이지와 동적 라우팅 기능 구현
학생별 정보 목록 carousel 슬라이더 구현
fetch(PATCH, DELETE)를 사용하여 개인정보 수정 및 탈퇴 기능 구현
fetch(POST, PATCH, DELETE)를 사용하여 학생 정보 CRUD 기능 구현
공용 Button 컴포넌트
공용으로 사용할 Button 컴포넌트 구현
제이
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

관리자 페이지
fetch(GET)를 사용하여 학생별 시간 정보 표시 및 수강생 접속 현황 정보 표시
반응형 레이아웃 구현
마이 페이지
fetch(PATCH, DELETE)를 사용하여 수강생의 개인정보 수정 및 탈퇴 기능 구현
공용 Modal 컴포넌트
공용으로 사용할 Modal 컴포넌트 구현

### 파일 구조
```
15th-ForestOfStudy-2team-FE/
├── env/                              
├── public/                           
├── src/
│   ├── api/                          
│   ├── assets/                      
│   ├── components/                   
│   ├── mocks/                       
│   ├── pages/
│   │   ├── focusPage/               
│   │   ├── HabitPage/               
│   │   ├── home/                    
│   │   ├── studyCreate/             
│   │   ├── studyDetail/              
│   │   ├── studyEdit/                
│   │   └── notFound/
│   ├── utils/                        
│   ├── App.jsx
│   ├── main.jsx
│   └── router.jsx
├── vite.config.js
└── package.json
```

### 구현 홈페이지
https://forest-of-study-chi.vercel.app/

### 프로젝트 회고록
https://app.notion.com/p/2-9fe8809438758287833c013845c2cb83?source=copy_link
