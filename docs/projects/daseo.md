---
id: daseo
title: "다:서"
subtitle: "Human-in-the-loop Multi-LLM 자기소개서 작성 시스템"
period: "2025-03..2025-11"
team_size: 5
team_composition:
  frontend: 2
  backend: 3
project_type: "팀 프로젝트 / 캡스톤 디자인"
domain: ["frontend", "backend-integration", "llm"]
primary_role: "Frontend"
roles:
  - "Frontend architecture"
  - "UI/UX flow"
  - "Google OAuth 연동"
  - "My Page"
  - "Backend authentication refactoring"
repository: "https://github.com/krknulsh/LLMate_refactored"
last_verified: "2026-09-13"
public_card:
  approved: false
  summary: "HyperCLOVA X 생성과 세 LLM의 관점별 피드백을 사용자가 검토·수정하는 자기소개서 작성 시스템"
  roles: ["Frontend", "Authentication Integration", "My Page"]
  skills: ["React", "FastAPI", "PostgreSQL", "OAuth", "JWT", "Multi-LLM"]
  result: "Google 로그인부터 생성·평가·사용자 수정·저장까지 Local 통합 흐름 구현"
---

# 다:서

## Document rules

- 이 파일은 프로젝트 단위 사실 원장이다.
- 2025년 원 프로젝트와 2026년 후속 리팩토링을 구분한다.
- Multi-LLM pipeline 전체를 개인 단독 구현으로 표현하지 않는다.
- 사용자 회고와 Git author가 다르면 진단 참여와 최종 코드 소유권을 분리한다.
- 정량 평가·latency·배포 성과를 근거 없이 만들지 않는다.
- 비공개 사용자 자기소개서, 개인정보, secret과 로컬 절대 경로는 기록하지 않는다.

## Scope

- 목표: 사용자 프로필·경험과 지원 기업·직무 맥락을 바탕으로 한국어 자기소개서를 생성하고, 복수 LLM 피드백과 사용자 수정을 연결한다.
- 사용자 문제: 초안 작성과 수정 과정에서 무엇을 보완해야 하는지 혼자 판단하기 어렵다.
- 핵심 방식: 생성 model과 관점별 평가 model을 분리하되 최종 수정 여부는 사용자가 결정한다.
- 실행 범위: Local 통합 실행. AWS 배포는 계획했지만 완료하지 않았다.

### 내가 소유하거나 주도한 영역

- React 기반 Frontend architecture와 주요 사용자 flow
- Google login UI와 Backend authentication integration
- access token 만료를 다루는 session timer hook
- My Page와 사용자 프로필·경험·자기소개서 UI
- Backend REST API integration
- refresh token, logout, token expiration 관련 Backend 보강
- 프로젝트 이후 대형 router를 기능별 module로 분리
- 2026년 Perplexity 기업·직무 조사 기능 복원

### 공동 작업 영역

- Login component
- My Page
- Backend user route
- Google OAuth callback 장애 분석과 해결

### 팀 소유 영역

- HyperCLOVA X 자기소개서 생성·재작성
- GPT·Gemini·Claude feedback pipeline
- PostgreSQL 기반 자기소개서·feedback 저장

## Project context, architecture and flow

### One-line summary

사용자 프로필·경험과 기업·직무 맥락을 이용해 HyperCLOVA X가 자기소개서를 생성하고, GPT·Gemini·Claude의 관점별 텍스트 피드백을 바탕으로 사용자가 수정과 저장을 결정하는 Human-in-the-loop Multi-LLM 서비스다.

### Architecture

```text
React Frontend
      ↓ REST API
FastAPI Backend
      ↓
User Profile · Experience · Essay Data
      ↓
HyperCLOVA X Generation
      ↓
GPT-4o-mini → Gemini 2.0 Flash → Claude 3 Haiku
      ↓                  sequential feedback
User Review
  ↙       ↘
Revise    Save
  ↓        ↓
HyperCLOVA X   PostgreSQL
```

현재 리팩토링본에서는 Perplexity가 회사명·직무명으로 외부 정보를 조사해 generation context에 citation과 함께 추가한다. 이 기능은 2026년 후속 복원이다.

### Authentication flow

```text
Google authorization code 또는 Google access token
        ↓
Google user info 확인
        ↓
Local user lookup / create
        ↓
Application access JWT
        ↓
Protected REST API
        ↓
Refresh token cookie → access token 재발급
```

Google provider token과 애플리케이션 JWT는 발급자, 대상과 용도가 다르다.

## Verified facts

### LLM roles

- HyperCLOVA X: 한국어 자기소개서 초안 생성과 사용자 요청 기반 재작성
- GPT `gpt-4o-mini`: 주장 논리와 구조 관점의 feedback
- Gemini `gemini-2.0-flash`: 창의성과 정보 구체성 관점의 feedback
- Claude `claude-3-haiku-20240307`: 문맥·자연스러움·맞춤법 관점의 feedback
- feedback은 점수가 아니라 사용자가 읽는 text다.
- 세 feedback model은 현재 Backend에서 순차 호출된다.
- 재작성은 system이 자동 반복하지 않고 사용자가 요청할 때 실행한다.

### Authentication

- 초기 commit `8181e19`의 `GET /auth/login`과 callback은 다른 팀원 명의다.
- 초기 callback은 Google access token으로 user info를 조회·출력하고 종료해 local user 저장과 service JWT 발급이 빠져 있었다.
- 사용자 설명: Google provider token과 서비스 JWT를 분리하기로 규약했지만 초기 Backend는 첫 Google 로그인에서 받은 token으로 이후 인증까지 처리하는 방향으로 작성됐다. callback handler 함수 자체는 있었으나 내부 처리가 미완성이었다. 코드로 확인되는 범위는 바로 위의 초기 callback 동작이다.
- commit `0eaeebd`에서 Google token→local user→service JWT 흐름이 다른 팀원 명의로 최종 반영됐다.
- 사용자는 동일 장애를 팀원과 독립적으로 분석·수정하고 원인을 교차 검증했다고 회고했다.
- 사용자 commit `156178d`는 access 30분, refresh 7일, HttpOnly cookie, `POST /auth/refresh`, logout cookie 제거와 token 만료 처리를 추가했다.
- Frontend의 자동 refresh와 cross-origin cookie까지 포함한 E2E 증거는 확인되지 않는다.

### My Page API

- 사용자 commit `5736e7d`에서 경험·자기소개서 route와 schema 변경이 확인된다.
- `EssayExperienceCreate`, `EssayExperienceUpdate`, `EssayExperienceOut`을 분리했다.
- CRUD endpoint에 `response_model`을 명시했다.
- read / update / delete query에 현재 사용자 ownership filter를 적용했다.
- create / update 후 `db.refresh`로 반환 상태를 동기화했다.
- 빈 자기소개서 collection을 `404`가 아니라 `200 []`로 반환했다.
- 사용자 확인: My Page API 정리는 장애 증상을 해결한 작업이 아니라 이후에 진행한 구조 개선이다. 실제 UI 장애나 정량적인 사용자 경험 개선을 주장하지 않는다.

### Post-project changes

- 2026년 8월 사용자 commit에서 Perplexity 기업·직무 조사 기능을 복원했다.
- Perplexity에는 회사명과 직무명만 전달한다.
- 조사 citation을 generation context에 포함한다.
- mocked unittest에서 입력 범위, citation 포함과 API key 누락 실패를 확인한다.
- 대형 Frontend·Backend router 파일의 code를 기능과 책임별 새 module로 분리했다.
- 이 분리는 runtime load balancing이나 성능 최적화가 아니라 변경 범위와 파일 책임을 줄이기 위한 구조 개선이다.

## STAR stories

### star-auth-chain — Google OAuth callback과 service JWT chain

- Delivery: implemented
- Ownership: shared
- Verification: verified
- Publication: public-site
- Evidence: commits `8181e19`, `0eaeebd`, `156178d`

#### Situation

Google provider token과 서비스 JWT를 분리하기로 했지만, 초기 Backend는 첫 Google 로그인 token으로 이후 인증까지 처리하는 방향으로 작성됐다. login route와 callback handler는 존재했으나 callback은 Google user info 조회·출력에서 끝났다. local user와 서비스 JWT 연결이 빠져 보호 API 인증으로 이어질 수 없었다.

#### Task

Frontend login request부터 Google token, callback, local user와 service JWT까지 전체 인증 chain을 추적해 끊어진 단계를 찾아야 했다.

#### Action

- 사용자와 다른 팀원이 각자 login flow를 추적하고 결과를 교차 검증했다.
- Google access token과 애플리케이션 JWT가 서로 다른 발급자와 대상 API를 가진다는 점을 구분했다.
- Google user info를 social ID 기준 local user 조회·생성으로 연결했다.
- local user ID를 subject로 하는 service JWT를 Frontend에 반환하는 흐름을 구성했다.
- 사용자는 후속 commit에서 refresh token, HttpOnly cookie, access token 재발급, logout과 session 만료 처리를 보강했다.

최종 callback code는 다른 팀원 명의 commit에 남아 있으므로 사용자의 역할은 `단독 handler 구현`이 아니라 `독립 진단·수정 및 해결 참여`로 표현한다.

#### Result

- Google 로그인 결과가 서비스 내부 인증으로 연결됐다.
- 이후 보호 REST API에서 service JWT를 사용할 수 있는 구조를 만들었다.
- access token 30분과 refresh token 7일의 수명주기를 Backend에 추가했다.
- 브라우저 자동 refresh E2E는 확인되지 않아 완료 성과로 쓰지 않는다.

#### Learning

OAuth는 외부 인증·권한 위임 절차이고 JWT는 token 표현 형식이다. 외부 provider token을 자체 API token처럼 사용하지 않고, 검증된 identity를 내부 사용자와 service token으로 교환하는 경계를 명시해야 한다.

### change-token-lifecycle — access token 만료 이후 인증 흐름 보강

- Delivery: implemented
- Ownership: mine
- Verification: code-verified; browser E2E unverified
- Publication: public-site
- Evidence: 사용자 commit `156178d`

짧은 access token만 발급한 초기 구조에는 만료 뒤 인증을 이어갈 Backend 경로가 없었다. access 30분·refresh 7일 정책, HttpOnly refresh cookie, `POST /auth/refresh`와 logout 시 cookie 제거를 추가했다. 코드에서 재발급·로그아웃 경로는 확인되지만, 브라우저 자동 재발급과 cross-origin cookie의 전체 흐름은 확인되지 않았다.

### change-mypage-contract — My Page API contract 정리

- Delivery: implemented
- Phase: later structural improvement, not an incident
- Ownership: mine
- Verification: verified
- Publication: public-site
- Evidence: commit `5736e7d`

사용자는 이 작업을 장애 대응이 아닌 후속 구조 개선으로 확인했다. 따라서 장애 증상을 가정해 STAR로 만들지 않고 evidence-backed change로 관리한다.

#### Change

- create / update / output schema 분리
- endpoint response model 명시
- 현재 사용자 기준 ownership filter
- 저장 후 ORM refresh
- delete 성공 응답을 `{"ok": true}`로 통일
- 빈 collection을 정상 상태인 `200 []`로 반환

#### Significance

Frontend가 사용할 response shape을 명시하고 사용자별 데이터 접근 조건을 query에 포함했다. 실제 장애 해결이나 정량적 사용자 경험 개선으로 표현하지 않는다.

### change-router-decomposition — 대형 router 기능별 분리

- Delivery: implemented
- Phase: post-project
- Ownership: mine
- Verification: self-reported
- Publication: public-site
- Evidence: refactored repository, 상세 대응표 미작성

#### Context

Frontend와 Backend에서 하나의 router 파일에 여러 기능이 집중돼 수정 범위와 책임을 파악하기 어려웠다.

#### Action

기능과 책임을 기준으로 새 파일을 만들고 기존 router의 code를 분리했다.

#### Result

파일별 책임과 변경 범위를 줄이는 구조로 개선했다. 원본 대비 파일 수, LOC, coupling은 측정하지 않았으므로 정량 개선이나 runtime load 분산으로 쓰지 않는다.

## Technical decisions

### Human-in-the-loop

- Context: 세 model의 feedback을 받아도 최종 수정 필요성은 사용자가 판단해야 했다.
- Decision: 자동 기준 통과 loop 대신 사용자 요청으로 재작성했다.
- Why: 정량 평가 기준이 없는 상태에서 model이 자동으로 종료 조건을 판단하지 않게 하기 위해서다.
- Trade-off: 사용자 개입이 필요하고 반복 횟수를 system이 최적화하지 않는다.

### Role-separated LLM pipeline

- Context: 하나의 model에 생성과 모든 평가 관점을 맡기지 않으려 했다.
- Decision: HyperCLOVA X는 생성, GPT·Gemini·Claude는 서로 다른 text feedback 역할을 맡았다.
- Trade-off: 세 feedback 호출이 순차 실행돼 latency와 실패 지점이 누적된다.
- Limitation: model별 prompt 품질과 역할 분리 효과를 고정 dataset으로 평가하지 않았다.

### REST API boundary

- Context: React Frontend와 FastAPI Backend가 프로필·경험·자기소개서 데이터를 공유해야 했다.
- Decision: Frontend는 DB에 직접 접근하지 않고 REST API로만 데이터를 조회·수정했다.
- Why: 인증, ownership과 schema validation을 Backend 경계에서 처리하기 위해서다.

### Token lifecycle

- Context: 짧은 access token만으로는 만료 시 사용자 흐름이 끊길 수 있었다.
- Decision: access token 30분, refresh token 7일과 HttpOnly refresh cookie를 추가했다.
- Trade-off: local 설정의 `secure=False`를 HTTPS 배포에 그대로 사용할 수 없고, Frontend 자동 refresh E2E가 완결됐는지 확인되지 않는다.

## Verification

- 원본 Backend·Frontend Git history와 현재 code에서 담당 범위를 확인했다.
- Google callback 초기·후속 구현과 사용자 refresh commit을 비교했다.
- My Page schema와 CRUD 변경을 commit diff로 확인했다.
- Local 환경에서 주요 사용자 flow가 동작했다는 프로젝트 기록이 있다.
- Perplexity를 제외하면 자동화된 통합·E2E test가 거의 없다.
- 출품·수상은 사용자 제공 사실이며 공개 증거를 추가로 확인해야 한다.

## Limitations

- AWS 배포를 완료하지 않았다.
- HyperCLOVA X의 정확한 model version이 source에서 확인되지 않는다.
- 세 feedback model은 순차 호출된다.
- model 실패 text가 정상 Feedback row와 같은 형태로 저장된다.
- 역할별 prompt의 효과를 정량 평가하지 않았다.
- refresh cookie와 자동 재발급을 포함한 browser E2E가 확인되지 않는다.
- React route protection보다 Backend API 인증에 의존한다.
- 현재 authentication router가 중복 등록된 흔적이 있어 routing 구조 정리가 필요하다.
- My Page 변경은 장애 대응이 아닌 후속 구조 개선이며, 사용자 경험의 전후 효과는 측정하지 않았다.
- Local 실행을 production 운영 성과로 확대하지 않는다.

## Publication rules

### May state

- Frontend architecture와 로그인–생성–feedback–수정–저장 flow를 설계했다.
- Google OAuth와 service JWT의 끊어진 인증 chain을 팀원과 독립적으로 진단하고 해결에 참여했다.
- refresh token, HttpOnly cookie, access token 재발급과 logout 처리를 Backend에 보강했다.
- My Page API의 schema, ownership와 빈 collection 계약을 정리했다.
- HyperCLOVA X 생성과 세 model의 관점별 text feedback을 사용하는 팀 pipeline을 구현했다.
- 2026년 후속 작업에서 Perplexity와 router module 분리를 진행했다.

### Must not state

- 초기 `/auth/login` handler를 사용자가 단독 신규 구현
- Google token과 service JWT가 같은 token
- Multi-LLM pipeline 전체를 사용자 단독 구현
- 세 feedback model의 병렬 호출
- 자동 평가 점수와 autonomous revision
- refresh token 자동 갱신 E2E 완료
- router 분리를 runtime load balancing 또는 성능 개선으로 표현
- AWS production 배포

## Open questions

- [ ] 팀 5명, Frontend 2명·Backend 3명 구성이 맞는지 최종 확인한다.
- [ ] OAuth 장애에서 사용자가 만든 독립 수정안의 branch, 화면 또는 팀 기록이 남아 있는지 확인한다.
- [ ] HyperCLOVA X 선택 당시 비교한 model, 비용과 한국어 품질 근거를 정리한다.
- [ ] 세 feedback prompt의 차이를 보여주는 익명화 예시를 확보한다.
- [ ] router 분리 전후 파일 대응표를 작성한다.
- [ ] 강원SW 페스티벌 출품과 졸업작품 장려상의 날짜·사진·증거를 확인한다.
