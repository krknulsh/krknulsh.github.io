# Portfolio Master Plan

## 1. 목표

이 포트폴리오는 신입 백엔드 개발자 지원을 위한 메인 포트폴리오다.

핵심 메시지:

> 단순히 기능을 구현하는 데 그치지 않고, 서비스 전체 구조를 설계하고 구현·배포·운영까지 연결해본 개발자.

포트폴리오의 역할은 "모든 기술 내용을 담는 문서"가 아니다.

- 메인 포트폴리오: 30~60초 안에 지원자를 이해시키는 역할
- GitHub README: 프로젝트의 기술적 근거와 상세 설명
- Repository: 실제 구현 증거

---

## 2. 전체 정보 구조

### Section 01. Hero / About

목표:
- 방문자가 5~10초 안에 지원자의 직무 방향을 이해
- 너무 긴 자기소개 금지

초안:

**Backend Developer**

서비스의 기능 구현뿐 아니라  
아키텍처 설계 → API 구현 → 데이터 저장 → 배포까지 연결하는 개발자를 지향합니다.

주요 경험:
- FastAPI 기반 REST API
- PostgreSQL / Redis / pgvector
- Docker / GCP Cloud Run
- OAuth / JWT
- RAG 기반 AI 서비스 개발

표시 링크:
- GitHub
- Email
- Resume (선택)
- Blog (있다면)

필요 자료:
- [ ] 프로필 사진 또는 대체 일러스트
- [ ] GitHub URL
- [ ] 이메일 주소
- [ ] Resume 링크 또는 PDF
- [ ] 기술 블로그 URL (선택)

---

### Section 02. Projects

프로젝트를 가장 위쪽 핵심 영역에 배치한다.

우선순위:

1. AI Mental Care Service
2. Multi-LLM Resume Generation System
3. 추가 프로젝트가 생기면 동일한 카드 구조로 확장

각 프로젝트 카드는 다음 정보만 노출:

- 프로젝트명
- 한 줄 설명
- 기간
- 팀 규모
- 담당 역할
- 핵심 기술 4~7개
- 대표 이미지
- GitHub 링크
- 상세 README 링크 또는 Detail 링크

메인 페이지에는 상세 구현 설명을 길게 적지 않는다.

---

### Section 03. Skills

기술 숙련도를 별점이나 퍼센트로 표현하지 않는다.

카테고리:

#### Backend
- Python
- FastAPI
- REST API
- OAuth 2.0
- JWT

#### Database
- PostgreSQL
- Redis
- pgvector

#### Cloud / DevOps
- Docker
- GCP Cloud Run
- Cloud SQL
- Memorystore
- Firebase
- Git / GitHub

#### AI / Data
- RAG
- Embedding
- Vector Search
- LLM API

추가 기술은 실제 프로젝트에서 사용한 경우에만 추가한다.

---

### Section 04. Experience / Research

#### Computer Engineering
- 컴퓨터공학 전공

#### Network Lab
- 네트워크 연구실 활동
- 논문 리뷰 및 연구 활동

필요 시 경력/교육 추가.

---

### Section 05. Certification / Education

확정된 자격증만 기록한다.

현재 보유/취득 예정 정보를 별도로 구분하고,
취득하지 않은 자격은 절대 보유 자격처럼 표시하지 않는다.

---

### Section 06. Contact

최소 정보:
- Email
- GitHub

선택:
- Blog
- LinkedIn
- Resume

---

## 3. 디자인 방향

참고 사이트처럼 세로 스크롤 기반의 단일 페이지 구조를 사용하되,
정보량은 더 줄이고 프로젝트 비중을 키운다.

### 디자인 원칙

- White / Off-white 기반
- 텍스트 중심
- 여백 크게
- 섹션 구분 명확
- 1개의 강조색만 사용
- 프로젝트 대표 이미지는 동일한 비율 유지
- 기술 배지는 과도하게 사용하지 않음
- 애니메이션은 최소화
- 모바일에서도 읽기 쉬운 반응형 구조

### 추천 레이아웃

Desktop:
- Hero: 2-column 가능
- Projects: 2-column cards
- Skills: 3~4 category columns

Mobile:
- 모든 영역 1-column

---

## 4. 유지보수 / 확장성 원칙

포트폴리오 콘텐츠와 화면 구조를 분리한다.

프로젝트가 추가될 때 레이아웃을 직접 다시 작성하지 않고,
프로젝트 데이터만 추가해서 화면에 나타나도록 구성한다.

예시 데이터 구조:

```yaml
projects:
  - id: mental-care
    title: AI Mental Care
    period: 2025.09 - 2025.12
    team_size: 6
    role:
      - Architecture
      - Backend
      - Frontend
    summary: 사용자 감정 분석과 RAG 기반 행동 루틴 추천 서비스
    skills:
      - FastAPI
      - PostgreSQL
      - Redis
      - pgvector
      - Docker
      - GCP
    github: TODO
    image: assets/projects/mental-care/cover.png

  - id: multi-llm-resume
    title: Multi-LLM Resume Generator
    period: 2025.03 - 2025.11
    team_size: 5
    summary: 여러 LLM이 생성과 평가를 반복하는 자기소개서 생성 시스템
    github: TODO
    image: assets/projects/multi-llm/cover.png
```

---

## 5. GitHub README와 역할 분리

### Portfolio
채용 담당자가 빠르게 읽는 문서.

포함:
- 무엇을 만들었는가
- 내가 무엇을 담당했는가
- 어떤 기술을 썼는가
- 어떤 결과가 있었는가

### GitHub README
개발자/면접관이 자세히 보는 문서.

포함:
- Architecture
- API Flow
- Database
- Core Features
- Technical Decisions
- Troubleshooting
- Deployment
- 실행 방법
- 프로젝트 구조

Portfolio에서 모든 기술 내용을 설명하지 않는다.

---

## 6. 절대 하지 않을 것

- 기술 스택을 사용 경험 없이 나열
- 숙련도 별점
- 프로젝트 전체 기능을 장문으로 나열
- 구현하지 않은 기능을 완료한 것처럼 표현
- 코드 없는 프로젝트를 과하게 기술적으로 포장
- 모든 프로젝트에 서로 다른 디자인 사용
- 새로운 프로젝트 추가 시 기존 페이지 구조를 깨는 설계
