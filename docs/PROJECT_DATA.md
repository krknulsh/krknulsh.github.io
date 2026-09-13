# Project Data

이 파일은 프로젝트 라이브러리로 이관하기 전의 통합 사실 기록이다.

프로젝트별 최신 원본:

- `docs/projects/ai-mental-care.md`
- `docs/projects/daseo.md`

새 사실과 정정은 프로젝트별 파일에 먼저 반영하고, 이 파일은 이관 검증이 끝날 때까지 legacy 자료로 보존한다.

사실과 해석을 분리한다.
확인되지 않은 수치나 성과는 임의로 추가하지 않는다.


## Global Data Rules

프로젝트별 Markdown이 각 프로젝트의 Single Source of Truth 역할을 한다.

Codex는 이 파일에서 확인되지 않은 사실을 임의로 추론하거나 성과를 만들어내지 않는다.

### Feature / Technology Status

모든 기술과 기능은 가능한 경우 다음 상태 중 하나로 구분한다.

- `Implemented`: 실제 구현 및 확인
- `Planned but Not Completed`: 계획했으나 완료하지 않음
- `Candidate / Considered`: 검토했으나 실제 사용 여부를 의미하지 않음

Portfolio의 기술 스택 및 완료 기능에는 기본적으로 `Implemented`만 노출한다.

### Troubleshooting Format

모든 문제 해결 사례는 다음 순서로 작성한다.

```text
Problem
↓
Symptom
↓
Investigation
↓
Root Cause
↓
Solution
↓
Result
↓
Learning
```

### Result Format

프로젝트 결과는 성격에 따라 분리한다.

- `Technical Result`: 실제 구현 및 동작 결과
- `Exhibition`: 출품 / 전시
- `Award`: 수상
- `Planned but Not Completed`: 완료하지 못한 계획

---


# Project 01 — AI Mental Care – RAG-Based Personalized Mental Care Service

## Metadata

- Name: AI Mental Care – RAG-Based Personalized Mental Care Service
- Period: 2025.09 - 2025.12
- Team Size: 6
- Type: Team Project / Capstone Design
- Domain: AI / Mental Care
- My Role:
  - Team Lead
  - 전체 서비스 아키텍처 초안 설계
  - Backend Development
  - Google OAuth / JWT Authentication
  - Database / Data Flow Integration
  - RAG / Routine Recommendation 핵심 기능
  - Frontend UI 배치 및 결과 시각화
  - 서비스 통합 및 리팩토링
  - GCP Cloud 배포 및 인프라 연결

### README Verification

- Source: <https://github.com/krknulsh/AI_MentalCare_Refactored>
- Verified on: 2026-09-11
- README 기준 공개 운영 인스턴스는 현재 없으며, 의료적 진단·치료가 아닌 비임상적 자기관리 지원 서비스다.
- README가 명시한 개인 책임 범위는 `System Architecture`, `Backend Logic`, `RAG Pipeline`, `Cloud Deployment`다.
- 아래의 세부 기술 규격은 README와 일치하도록 보강했다. 다만 수치 성과와 개인 기여의 깊이는 별도 증거 또는 사용자 인터뷰로 검증한다.

### Local Code / Git Verification

- 검증 소스: `C:\projects\mentalcare\mentalcare_BE`, `C:\projects\mentalcare\google_ai`
- Backend Git 기록에서 사용자 식별 author의 commit은 45개이며, 전체 80개 중 alias를 제외한 보수적 집계다. 이 수치는 공개 성과가 아니라 소유권 확인용 내부 근거다.
- 현재 blame 기준으로 `rag_service.py`, `inference_service.py`, `compose_service.py`, `embedding_service.py`, `auth.py`, `security.py`, `generate_routines.py`, `embed_routines.py`는 사용자가 직접 작성한 범위로 확인된다.
- `chat_service.py`와 Frontend의 주 Chat 화면은 공동 작업 범위로 확인된다.
- `scheduler.py`와 `generate_weekly_report.py`는 다른 팀원의 작성 범위다. Weekly Report와 APScheduler는 팀 구현 기능으로만 쓰고 개인 구현 성과로 쓰지 않는다.
- 사용자 commit 기록에서 인증, DB 초기 구성, Redis / Docker, RAG, 루틴 생성·임베딩, 3단계 응답 구조, 배포·migration 수정이 확인된다.
- Git 집계는 author alias와 병합 방식에 따라 달라질 수 있으므로 대외 문구에는 commit 비율 대신 담당 파일과 설계·변경 내용을 사용한다.

---

## Background

4학년 캡스톤 디자인 프로젝트로 진행했다.

기존 생성형 AI 기반 상담 서비스는 사용자의 감정에 공감하는 대화를 제공하는 데에는 강점이 있지만,
사용자가 자신의 감정을 관리하기 위해 실제 생활에서 어떤 행동을 해야 하는지까지
구체적으로 연결해주는 데에는 한계가 있다고 판단했다.

이에 사용자가 입력한 텍스트에서 현재 감정과 상황을 분석하고,
신뢰할 수 있는 정신건강 관련 자료를 기반으로
사용자가 직접 수행할 수 있는 행동 루틴을 추천하는 서비스를 구현하고자 했다.

단순히 LLM의 생성 결과에만 의존하기보다
RAG 구조를 이용해 사전에 구축한 행동 루틴 데이터를 검색하고,
검색 결과를 사용자의 감정과 상황에 맞게 재구성하여 추천하는 것을 핵심 방향으로 설정했다.

---

## One-line Summary

사용자의 텍스트에서 감정과 상황을 분석하고,
정규화 문서 133건에서 생성한 셀프케어 루틴 310건을 RAG와 Vector Search로 검색해
개인화된 행동 루틴과 대화형 응답을 제공하며,
세션별 Daily Report와 기간별 Weekly Report까지 연결한 AI 멘탈 케어 서비스.

---

## System Design

### Architecture Type

- RAG-Based Recommendation Pipeline
- Stateful Conversational Service
- REST API 기반 Frontend–Backend 구조
- Serverless Container 기반 Cloud Deployment

### Main Components

```text
Expo Web / React Native
        ↓
     FastAPI
        ↓
 ┌─────────────────────────────┐
 │ Authentication              │
 │ Emotion / Situation Analysis│
 │ RAG / Routine Recommendation│
 │ Session / Report API        │
 └─────────────────────────────┘
        ↓
 ┌───────────────────┬────────────────┐
 │ PostgreSQL        │ Redis          │
 │ + pgvector        │ Session State  │
 └───────────────────┴────────────────┘
        ↓
 Cloud SQL / Memorystore
        ↓
      GCP
```

### Data Sources

#### User / Service Data

- 사용자 정보
- Chat Session
- 사용자 Text Input
- 감정 / 상황 분석 결과
- 추천 루틴
- Daily Report
- Weekly Report

#### External Routine Data

- 정규화 문서: 133건, `doc_id` 133개
- 생성 루틴: 310건, `routine_id` 310개
- 루틴 생성에 반영된 원본 문서: 121개
- 루틴 소요시간 데이터 범위: 1~10분
- 모든 루틴에 `source_url`, `title`, `description`, `steps`, `safety_notes`, `duration_min` 존재
- Source domain: Verywell Mind, Healthline, HelpGuide, Psych Central, NHS,
  Mental Health Foundation UK, Medical News Today, Harvard Health, Mayo Clinic, NIMH, WHO
- 기존 기록의 `약 400건`과 `APA 참고`는 현재 저장된 JSONL에서는 확인되지 않아 공개 문구에서 제외한다.
- 사용자가 생성 루틴을 직접 검수했으나, 일정 제약으로 명시적인 제외 기준과 중복 검사는 수행하지 못했다.
- 이 데이터 구축의 1차 목표는 RAG용 vector search dataset과 저장 구조를 완성하는 것이었다.

외부 자료를 그대로 LLM의 답변으로 사용하는 것이 아니라,
서비스용 행동 루틴 데이터로 정리한 뒤 Embedding을 생성하여
Vector Search와 RAG 추천에 활용했다.

정제한 루틴은 감정·상황 태그로 일반화하고 1~10분 안에 수행 가능한
비임상적 셀프케어 루틴으로 구조화했으며, 출처 URL을 함께 저장했다.

### Runtime AI / Retrieval Specification

- 실시간 감정·상황 분석 및 응답 구성: Gemini 2.5 Flash
- 증분 세션 요약 및 주간 리포트: Gemini 2.5 Pro
- Embedding: `text-embedding-004`, 768 dimensions
- Search: pgvector cosine distance + IVFFlat index
- Retrieval: 기본 상위 5개 후보 조회 후 대표 루틴 선택
- Analysis output: `emotions`, `main_mood`, `situations`, `summary`, `emotion_confidence`, `situation_clarity`
- LLM JSON parsing failure를 처리하는 fallback 적용

---

## Core Pipeline / Flow

```text
Google OAuth Login
        ↓
JWT Authentication
        ↓
User Text Input
        ↓
Emotion / Situation Analysis
        ↓
Information Sufficiency Check
     ↙                ↘
Need More Info      Enough Info
     ↓                ↓
Clarifying       Vector Search
Question              ↓
     └──────→ Routine Retrieval
                      ↓
             LLM Response Composition
                      ↓
                Routine Recommendation
                      ↓
                 Session End
                      ↓
                 Daily Report
                      ↓
                Weekly Report
```

감정 또는 상황 정보가 충분하지 않으면
바로 행동 루틴을 추천하지 않고 추가 질문을 반환한다.

정보가 충분해진 경우에만
RAG 검색과 행동 루틴 추천 단계로 이동하도록 구성했다.

---

## My Contribution

### 1. Overall Architecture Draft

프로젝트 초기 단계에서 서비스에 필요한 주요 기능과 데이터 흐름을 정의하고
전체 아키텍처의 초안을 설계했다.

주요 흐름:

```text
Frontend Input
→ FastAPI
→ User / Session Data
→ Emotion & Situation Analysis
→ RAG Search
→ Routine Recommendation
→ Report Generation
```

기능별 구현뿐 아니라 인증, AI 분석, RAG, 데이터 저장,
세션 상태, 리포트가 하나의 서비스 흐름으로 연결되도록 구조를 설계했다.

### 2. Authentication

Google OAuth 기반 로그인 기능을 구현했다.

- Frontend에서 Google 인증 수행
- Google IdToken을 Backend로 전달
- Backend에서 IdToken 검증
- 기존 사용자 조회 또는 신규 사용자 생성
- 서비스 이용을 위한 access / refresh JWT 발급
- JWT를 이용한 이후 요청의 인증 처리
- Access token 기본 유효시간 30분, refresh token 기본 유효시간 7일
- Web은 `localStorage`, Native는 Expo SecureStore에 token 저장

정확한 표현:
`Google OAuth 기반 로그인 및 JWT 인증 처리`

### 3. Database / Backend Data Integration

PostgreSQL을 기반으로 다음 데이터가 서비스 흐름에서 연결되도록 구현했다.

- User
- OAuth Identity
- Chat Session
- User Input
- Routine
- Session / Daily Report
- Weekly Report

사용자의 입력과 AI 분석 결과를 저장하고
이후 세션 리포트 및 사용자별 데이터 조회에 활용할 수 있도록 구성했다.

Frontend가 데이터베이스에 직접 접근하는 것이 아니라,
FastAPI REST API를 통해 데이터를 저장하고 조회하도록 구성했다.

### 4. RAG-Based Routine Recommendation

11개 출처 도메인에서 정규화한 문서 133건을 바탕으로
셀프케어 행동 루틴 310건을 생성했다.

현재 JSONL에서 확인되는 수치는 문서 133건, 루틴 310건, 루틴 생성에 반영된 원본 문서 121건이다.
기존 기록의 `약 400건`과 `APA 참고`는 현재 파일로 확인되지 않아 공개 문구에서 제외한다.

루틴에는 다음과 같은 정보를 구조화했다.

- 감정
- 상황
- 목표
- 난이도
- 소요 시간
- 수행 환경
- 수행 방법 / Steps
- Safety Notes 등

루틴 데이터를 Embedding한 뒤
PostgreSQL의 pgvector를 이용해 Vector Search가 가능하도록 구성했다.

- `text-embedding-004`로 768차원 벡터 생성
- cosine distance와 IVFFlat index 사용
- 사용자 맥락으로 상위 5개 후보를 조회한 뒤 대표 루틴 선택

사용자의 감정 및 상황 분석 결과를 기반으로 관련 루틴을 검색하고,
검색 결과와 사용자 상황을 LLM에 전달하여
공감형 응답과 행동 루틴을 함께 제공하도록 구현했다.

### 5. Redis-Based Session State

대화 도중 계속 변경되는 임시 상태를
관계형 데이터베이스에 모두 저장하기보다 Redis를 이용해 관리했다.

세션 단위로 다음 상태를 관리했다.

- 대화 기록
- 증분 요약과 마지막 요약 위치
- 현재 Pipeline 처리 상태
- 마지막 감정 분석 결과
- 추천 결과

여러 API 요청 사이에서도 같은 대화 세션의 상태가 이어지도록 구성했다.

### 6. Report Flow

사용자가 대화를 종료하면
현재 세션의 대화 내용과 분석 결과를 이용해
Session / Daily Report를 생성하도록 구현했다.

또한 팀이 일정 기간의 데이터를 집계하여
Weekly Report를 생성하는 구조를 구현했다.

Weekly Report의 주기적 생성은 다른 팀원이 APScheduler로 구성했다.
개인 기여로는 관련 schema·통합 수정이 확인되며, scheduler와 report 생성 로직 자체를 직접 구현한 것으로 쓰지 않는다.

README 기준 실행 시각은 매주 월요일 00:05(KST)다.

### 7. Frontend Integration

React Native / Expo Web 환경에서 다음 UI 및 데이터 연동에 참여했다.

- Login
- Chat
- Routine Recommendation Card
- Daily Report
- Weekly Report
- My Page 관련 화면

Backend API의 응답 데이터를
Frontend에서 사용할 수 있는 형태로 연결하고,
루틴 및 보고서 정보를 사용자가 확인할 수 있도록 배치하고 시각화했다.

### 8. Cloud Deployment

FastAPI Backend를 Docker 이미지로 구성하여
GCP Cloud Run에 배포했다.

Cloud 환경 구성:

- Backend: GCP Cloud Run
- Relational / Vector Data: Cloud SQL PostgreSQL + pgvector
- Session State: Memorystore for Redis
- Redis Network Connection: Serverless VPC Connector
- Frontend: Firebase Hosting

로컬에서만 동작하는 수준을 넘어
실제 Cloud 환경에서 주요 End-to-End Flow가 연결되도록 구성했다.

---

## Implemented Features

### Frontend

- React Native / Expo 기반 UI
- Expo Web
- Google OAuth 로그인 연동
- Chat UI
- Routine Recommendation Card
- Daily Report UI
- Weekly Report UI
- Backend REST API 연동
- 결과 데이터 배치 및 시각화
- Firebase Hosting 배포

### Backend

다음은 팀 프로젝트 전체 구현 범위다.

- Python / FastAPI
- REST API
- Google IdToken 검증
- JWT 인증
- 사용자 / 세션 / 입력 데이터 저장
- 감정 및 상황 분석
- 정보 부족 여부 판단 및 추가 질문
- RAG 기반 행동 루틴 검색 / 추천
- Session / Daily Report 생성
- Weekly Report 생성
- APScheduler 기반 Weekly Report Scheduling

### Database / State

- PostgreSQL
- SQLAlchemy
- pgvector
- Vector Search
- Redis
- 세션 상태 및 대화 상태 관리

### AI / Data

- Gemini 2.5 Flash
- Gemini 2.5 Pro
- `text-embedding-004`
- Text-Based Emotion / Situation Analysis
- RAG
- Embedding
- Vector Search
- 정규화 문서 133건에서 셀프케어 루틴 310건 생성, 이 중 원본 문서 121건이 루틴 생성에 반영됨
- 모든 루틴에 출처 URL, 수행 단계, safety note, 1~10분 소요시간 저장

### Cloud / DevOps

- Docker
- GCP Cloud Run
- Cloud SQL
- Memorystore for Redis
- Serverless VPC Connector
- Firebase Hosting

---

## Technology Stack

### Implemented

#### Frontend
- JavaScript / TypeScript
- React Native
- Expo
- Expo Web

#### Backend
- Python
- FastAPI
- REST API
- SQLAlchemy
- APScheduler

#### Database / State
- PostgreSQL
- pgvector
- Redis

#### Authentication
- Google OAuth
- JWT

#### AI / Data
- Gemini 2.5 Flash
- Gemini 2.5 Pro
- `text-embedding-004` (768 dimensions)
- RAG
- Embedding
- Vector Search

#### Cloud / DevOps
- Docker
- GCP Cloud Run
- Cloud SQL
- Memorystore for Redis
- Serverless VPC Connector
- Firebase Hosting

### Planned but Not Completed

#### Multimodal Input
- Image-based emotion analysis
- Voice / Audio-based emotion analysis

입력 데이터 구조는 TEXT / IMAGE / AUDIO 확장을 고려했지만,
프로젝트 기간 내 실제 완성한 분석 기능은 Text Input이다.

### Candidate / Considered

현재 별도로 기록할 후보 기술 없음.

---

## Technical Decisions

### FastAPI

AI 모델 호출과 데이터 처리 로직을 Python 기반으로 작성해야 했기 때문에
Python 생태계와 연결하기 쉬운 FastAPI를 선택했다.

REST API 구현과 Request / Response Schema 관리가 비교적 간결해
프로젝트 기간 내 서비스 API를 빠르게 구성하는 데 적합하다고 판단했다.

### PostgreSQL

사용자, 세션, 입력, 루틴, 보고서처럼
서로 관계를 갖는 구조화된 데이터가 많아 관계형 데이터베이스를 사용했다.

또한 pgvector Extension을 함께 사용할 수 있어
일반 서비스 데이터와 Vector Search용 데이터를
동일한 PostgreSQL 환경에서 관리할 수 있었다.

### pgvector

프로젝트 규모에서 별도의 Vector Database를 추가하기보다
기존 PostgreSQL에 Vector Search 기능을 추가하는 방향을 선택했다.

이를 통해 별도 Vector DB 운영 복잡도를 추가하지 않고
RAG 검색에 필요한 Embedding 데이터를 관리했다.

### Redis

대화 중 지속적으로 변경되는 세션 상태와 임시 데이터를
매번 PostgreSQL에 저장하기보다
빠르게 읽고 수정할 수 있는 Redis를 이용해 분리했다.

영속적으로 보존해야 하는 데이터와
세션 동안 빠르게 변경되는 상태의 저장 역할을 나누는 데 활용했다.

### Cloud Run

FastAPI Backend를 Docker 기반으로 배포하면서
VM을 직접 운영하지 않고 Container 단위로 서비스를 실행하기 위해 선택했다.

프로젝트 특성상 지속적인 고정 트래픽이 없었기 때문에
요청량에 따라 인스턴스를 조절할 수 있는 Serverless Container 구조도 적합하다고 판단했다.

---

## User Flow

### Normal Flow

1. 사용자가 웹 서비스에 접속한다.
2. Google 계정을 이용해 로그인한다.
3. Frontend에서 발급받은 Google IdToken을 Backend로 전달한다.
4. Backend에서 Google IdToken을 검증한다.
5. 기존 사용자를 조회하거나 신규 사용자를 생성한다.
6. Backend가 서비스 요청 인증을 위한 JWT를 발급한다.
7. 사용자가 현재 감정이나 상황을 Text로 입력한다.
8. Frontend가 입력 내용을 FastAPI Backend로 전달한다.
9. 활성화된 Chat Session이 없다면 새로운 Session을 생성한다.
10. 사용자 Input을 PostgreSQL에 저장한다.
11. AI가 입력에서 주요 감정과 상황을 분석한다.
12. 감정과 상황 정보가 충분한지 판단한다.
13. 정보가 충분하면 관련 행동 루틴을 Vector Search한다.
14. 검색된 루틴과 사용자 상황을 LLM에 전달한다.
15. LLM이 공감형 응답과 행동 루틴을 구성한다.
16. 사용자가 추천 루틴을 확인하고 필요한 경우 추가 대화를 진행한다.
17. 세션 중 필요한 임시 상태는 Redis에서 관리한다.
18. 사용자가 세션을 종료한다.
19. 세션의 대화 및 분석 결과를 이용해 Daily Report를 생성한다.
20. Daily Report를 PostgreSQL에 저장한다.
21. 일정 기간의 데이터를 기반으로 Weekly Report를 생성한다.
22. 사용자는 Daily / Weekly Report 화면에서 감정과 추천 루틴 관련 정보를 확인한다.

### Need More Information Flow

1. 사용자가 감정이나 상황을 판단하기 어려운 입력을 전달한다.
2. AI가 감정 및 상황을 분석한다.
3. 감정 confidence 또는 상황 정보가 충분하지 않다고 판단한다.
4. 바로 행동 루틴을 추천하지 않고 추가 질문을 반환한다.
5. 사용자가 추가 정보를 입력한다.
6. 기존 Session에 입력을 이어서 저장한다.
7. 정보가 충분해지면 RAG 검색 및 행동 루틴 추천 단계로 이동한다.

---

## Troubleshooting

모든 문제 해결 기록은 다음 순서를 유지한다.

```text
Problem
↓
Symptom
↓
Investigation
↓
Root Cause
↓
Solution
↓
Result
↓
Learning
```

### 1. API / Data Contract Mismatch

#### Problem

Authentication, AI Analysis, RAG, Database, Report 등
여러 기능을 통합하는 과정에서
각 모듈이 예상하는 데이터 형식이 맞지 않는 문제가 발생했다.

#### Symptom

- 개별 기능은 동작하지만 전체 Flow로 연결하면 일부 요청이 실패
- Frontend와 Backend가 기대하는 Request / Response 형식이 불일치
- Database Model 수정과 Migration이 반복됨
- 배포·업데이트 과정에서 Alembic revision과 현재 Backend model 사이의 불일치가 반복됨
- 기능 변경 시 다른 모듈에서도 연쇄적인 수정이 필요함

#### Investigation

전체 서비스 Flow를 기준으로
각 계층에서 실제로 전달되는 데이터를 다시 추적했다.

확인한 항목:

- Frontend Request Payload
- FastAPI Request / Response Schema
- Backend 내부 Module I/O
- Database Model
- Alembic revision / 현재 적용 version
- 저장되는 JSON / Field 구조
- 다음 단계에서 기대하는 데이터 형식

#### Root Cause

프로젝트 초기 단계에서
API Contract와 Module Input / Output Schema를 충분히 세밀하게 고정하지 않은 상태로
각 기능을 병렬적으로 개발한 것이 주요 원인이었다.

같은 데이터에 대해
Frontend, Backend Module, Database가 서로 다른 구조를 예상하면서
통합 단계에서 불일치가 발생했다.

Schema를 충분히 고정하지 않은 채 model과 migration을 반복 변경하면서
Alembic version과 현재 Backend가 기대하는 format도 함께 어긋났다.

#### Solution

- Pydantic request / response schema를 endpoint의 명시적 계약으로 사용
- Frontend 공통 TypeScript type 정의
- `NeedMoreInfoResponse`와 `RagSuccessResponse` 분리
- `flag`, `can_create_report`, `message`, `card`의 의미와 반환 조건 통일
- FastAPI OpenAPI 문서를 기준으로 연동 데이터 검증
- 오류가 가리키는 migration code와 현재 Backend model을 대조해 revision과 field format을 일치시킴

Git에서 확인되는 migration 대응:

- `b9d0382`: `routines`가 없을 때만 생성하는 조건부 migration 추가
- `f88b087`: `routines`의 key·column을 제거하려던 자동 생성 revision 삭제

이는 촉박한 일정에서 DB 상태를 보존하기 위한 복구 조치였지만,
적용된 migration 삭제나 `has_table` 기반 우회는 환경별 schema drift를 숨길 수 있다.
성숙한 migration 설계 사례가 아니라 실패와 개선점을 함께 설명하는 사례로 사용한다.

#### Result

Frontend Input부터 Backend 처리,
Database 저장, RAG Recommendation, Report까지
연결되는 전체 Flow의 데이터 구조를 정리하고
통합 동작을 정상화했다.

사용자는 팀원별 계정으로 기능을 확인했고 본인 기준 약 200회의 수동 검증을 수행했다고 회고했다.
실행 log나 checklist로 집계한 수치는 아니므로 공개 시 `약 200회 반복 테스트`가 아니라
`개발 과정에서 반복적인 수동 통합 검증`으로 표현한다.

당시 API 실패가 HTTP 422였을 가능성을 회고했지만 정확한 log는 없다.
422는 일반적으로 FastAPI request validation 실패를 뜻하며 Alembic revision 충돌과는 다른 계층이므로,
증거 없이 두 문제를 하나의 원인으로 연결하지 않는다.

#### Learning

프로젝트 초기에
`API Contract`, `Request / Response Schema`,
`Module I/O`, `Data Ownership`을 명확하게 정의하는 것이
통합 비용을 크게 줄인다는 점을 경험했다.

이후 시스템을 설계할 때는
기능 목록만 나누는 것이 아니라
모듈 사이에서 어떤 데이터가 어떤 형태로 이동하는지까지
먼저 정의해야 한다는 기준을 갖게 되었다.

다시 수행한다면 적용된 revision을 삭제하지 않고
`alembic current / heads / history`로 DB와 code의 migration graph를 확인한 뒤,
명시적인 forward migration과 staging rehearsal로 정합성을 검증한다.

---

### 2. Embedding Vector Dimension Mismatch

#### Problem

RAG 데이터와 Embedding 모델을 구성하는 과정에서
Embedding Vector Dimension과
PostgreSQL pgvector Schema의 Dimension이 맞지 않는 문제가 발생했다.

#### Symptom

- 기존 Vector Schema에 새로운 Embedding 결과를 정상적으로 저장하기 어려움
- Vector Search Pipeline을 그대로 사용할 수 없음
- Embedding 모델 또는 데이터 구조 변경이 Database Schema에 영향을 줌

#### Investigation

다음 항목을 비교했다.

- 현재 사용하는 Embedding Model
- Model이 반환하는 Vector Dimension
- PostgreSQL pgvector Column Dimension
- 기존에 생성된 Embedding Data
- 검색 Pipeline이 기대하는 Vector 구조

#### Root Cause

초기 `routines.embedding` schema는 `vector(1536)`이었지만,
최종 모델인 `text-embedding-004`는 768차원 벡터를 반환했다.
모델 출력 차원과 pgvector column / index 차원이 일치하지 않았다.

사용자 회고에 따르면 소스의 768·1536차원 혼용을 먼저 1536으로 맞췄으나
실제 사용 흐름에서 응답이 지루하게 느껴질 정도로 느리다고 판단해 최종적으로 768차원으로 변경했다.

#### Solution

- 기존 IVFFlat index 제거
- Alembic migration으로 `vector(1536)`을 `vector(768)`로 변경
- 기존 루틴을 `text-embedding-004`로 재임베딩
- `vector_cosine_ops` 기반 IVFFlat index 재생성
- application의 `EMBED_DIM`과 model definition을 768로 통일

#### Result

Embedding model의 실제 출력과 DB schema를 768차원으로 통일해
저장·검색 pipeline이 동작할 수 있는 조건을 맞췄다.

추천 품질과 지연시간의 전후 수치는 측정하지 않았다.
따라서 `성능을 N% 개선`이 아니라
`수동 사용에서 응답 대기가 길다고 판단해 768차원으로 규격을 통일`로 표현한다.

#### Learning

Embedding Model은 단순한 AI API 선택이 아니라
Database Schema와 저장된 Vector Data에 직접적인 영향을 주는 의존성이라는 점을 경험했다.

향후에는 Embedding Model과 Dimension을
초기 설계 단계에서 명시하고,
변경이 필요한 경우 Schema Migration과 Data Regeneration 비용까지 함께 고려해야 한다.

---

### 3. GCP Deployment / Network Integration

#### Problem

로컬 환경에서 정상적으로 동작하던 Backend와 Database / Redis 연결이
GCP Cloud 환경에서는 동일하게 동작하지 않는 문제가 발생했다.

#### Symptom

- Cloud Run Container가 정상적으로 시작되지 않는 경우 발생
- 환경변수 누락 시 Application 실행 실패
- Redis가 내부 Network에 있어 Cloud Run에서 바로 연결되지 않음
- VPC 연결 설정이 혼재되면서 Redis Connection 문제 발생
- Application 자체 문제와 Infra 문제를 구분하기 어려움

#### Investigation

Application과 Infra를 분리하여 단계적으로 확인했다.

확인한 항목:

- Cloud Run Log
- Container Port
- 필수 Environment Variables
- Cloud SQL Connection 정보
- Redis Internal IP / Connection URL
- Serverless VPC Connector
- Cloud Run Network 설정
- 각 Cloud Resource의 독립적인 연결 상태

#### Root Cause

하나의 단일 오류가 아니라
Cloud 환경에서 필요한 설정 차이가 복합적으로 존재했다.

주요 원인:

- 일부 Environment Variable 설정 누락
- Local과 Cloud의 Network 접근 방식 차이
- Memorystore Redis의 Private Network 접근 필요
- Direct VPC 방식과 Serverless VPC Connector 설정의 혼재

#### Solution

- Cloud Run Log를 이용해 Application Start Failure 원인 확인
- FastAPI container가 Cloud Run의 `$PORT`에서 실행되도록 구성
- local / deploy 환경의 database URL, Redis URL, secret을 환경변수로 분리
- Cloud SQL과 Memorystore 연결을 위한 VPC / connector 설정을 분리해 검증
- Firebase Hosting origin을 CORS allowlist에 추가하고 API routing 점검
- Alembic migration과 service start order를 배포 과정에 포함

#### Result

최종적으로 다음 End-to-End Flow가
실제 Cloud 환경에서 정상적으로 연결되는 것을 확인했다.

```text
Google OAuth Login
→ User Input
→ Emotion / Situation Analysis
→ RAG Vector Search
→ Routine Recommendation
→ Session End
→ Daily Report
→ Weekly Report
```

Frontend는 Firebase,
Backend는 Cloud Run,
PostgreSQL은 Cloud SQL,
Redis는 Memorystore를 이용해 연결했다.

#### Learning

로컬 환경에서 Application이 정상 동작하는 것과
Cloud 환경에서 전체 서비스가 정상 동작하는 것은 별개의 문제라는 점을 경험했다.

Cloud 배포에서는 Application Code뿐 아니라
Environment Variable, Container Runtime,
Private Network, Managed Service Connection까지
하나의 시스템으로 함께 검증해야 한다는 점을 배웠다.

---

## Technical Result

실제 Cloud 환경에서 다음 주요 서비스 Flow의 동작을 확인했다.

- Google OAuth 로그인
- JWT 인증
- 사용자 Text Input 저장
- 감정 및 상황 분석
- 정보 부족 시 추가 질문
- RAG Vector Search
- 행동 루틴 추천
- Redis 기반 Session State 관리
- Daily Report 생성 및 조회
- Weekly Report 생성 및 조회
- Firebase Frontend와 Cloud Run Backend 연결
- Cloud SQL PostgreSQL / pgvector 연결
- Memorystore Redis 연결

Data Result:

- 정규화 문서 133건과 생성 루틴 310건을 현재 JSONL에서 확인
- 생성 루틴에 반영된 원본 문서 121건과 고유 `routine_id` 310개를 확인
- 구축한 루틴 데이터를 RAG 검색에 활용

Deployment Result:

- Frontend: Firebase Hosting
- Backend: Docker + GCP Cloud Run
- Database: Cloud SQL PostgreSQL + pgvector
- Session State: Memorystore for Redis
- Network: Serverless VPC Connector

---

## Exhibition

- 현재 제공된 정보 없음.

---

## Award

- 현재 제공된 정보 없음.

---

## Planned but Not Completed

### Multimodal Analysis

초기 기획에서는 다음 입력까지 지원하는 것을 목표로 했다.

- Image Emotion Analysis
- Voice / Audio Emotion Analysis

입력 데이터 구조는 TEXT / IMAGE / AUDIO 확장을 고려했지만,
실제 프로젝트 기간 내 완료한 분석 기능은 Text 기반이다.

### Production-Scale Operation Validation

Cloud 배포와 End-to-End 동작은 확인했으나
다수의 실제 사용자를 대상으로 장기간 운영하면서 다음 항목을 검증하지는 못했다.

- Production Traffic 성능
- 장기 장애 대응
- 운영 모니터링 체계
- 실제 사용자 규모에서의 확장성

---

## Limitations / Retrospective

### API / Interface Design

초기 설계 단계에서 API Contract와 Module Input / Output 규격을
더 구체적으로 정의했다면
프로젝트 후반부의 Database 수정과 통합 비용을 줄일 수 있었다.

다시 진행한다면 기능 구현 전에 다음을 먼저 확정한다.

- API Contract
- Request / Response Schema
- Data Model
- Module Responsibility
- Error Handling
- Data Ownership

### Embedding Dependency

Embedding Model의 변경이
Database Vector Schema와 기존 데이터에 영향을 준다는 점을
프로젝트 중간에 크게 경험했다.

다시 설계한다면 Embedding Model / Dimension을
Architecture Decision으로 명시하고
변경 시 Migration 전략까지 함께 설계한다.

### Multimodal Scope

TEXT / IMAGE / AUDIO 확장을 고려한 구조는 만들었지만
Image와 Audio 분석까지 완성하지 못했다.

완료 기능과 확장 가능 구조를 명확하게 구분해 표현한다.

### Operations

Cloud 환경에 실제 배포했지만
장기적인 Production 운영 경험까지 확보한 프로젝트는 아니다.

따라서 Portfolio에서는
`Cloud 배포 및 End-to-End 실행 경험`으로 표현하고,
`대규모 운영 경험`, `고가용성 검증`, `Production Scale 검증` 등으로 과장하지 않는다.

### Code-Verified Risks / Unverified Scope

- RAG는 cosine distance 기준 상위 5개를 조회하지만 distance threshold와 metadata filter가 없다. 현재 대표 루틴은 조회 결과의 첫 항목이다.
- Redis의 실제 session key에는 TTL 또는 명시적 종료 삭제가 확인되지 않는다. Redis read 실패 시 빈 상태로 진행하며, 상태 의존 기능은 비활성화될 수 있다.
- APScheduler는 앱 process 내부에서 월요일 00:05(KST)에 실행된다. 영속 job store나 분산 lock이 없어 Cloud Run scale-to-zero에서는 누락되고 다중 instance에서는 중복될 위험이 있다.
- 테스트 파일은 자동화된 회귀 테스트보다 수동 smoke script에 가깝고, 일부는 현재 response field와 맞지 않는다. Cloud E2E 동작은 README·기존 기록에 있으나 반복 가능한 체크리스트나 자동화 증거를 추가로 받아야 한다.
- 안전 장치는 현재 코드 기준 prompt의 비진단·비치료 지침과 routine별 `safety_notes` 수준이다. 사용자는 위기 표현에서 자살예방센터 안내 또는 답변 회피가 동작했고 수동 확인 중 이탈을 보지 못했다고 회고했지만, 테스트 횟수는 적고 현재 소스에서 명시적인 위기 탐지·센터 연결 rule은 확인되지 않는다. 모델 자체 안전 동작이나 이전 prompt였을 가능성이 있어 구현 성과로 단정하지 않는다.
- JWT refresh는 구현됐지만 server-side revoke / blacklist는 없다. 현재 security logging에는 decoded payload와 token 일부가 포함돼 운영 전 제거해야 한다.
- Frontend의 routine response 처리와 Backend union response 사이에 재검증이 필요한 계약 차이가 남아 있다.
- migration history에는 같은 table을 여러 단계에서 다시 생성하거나 1536·768차원 정의가 교차하는 흔적이 있다. 조건부 table 생성과 revision 삭제는 당시 복구 조치였지만 운영 환경에서는 schema drift를 만들 수 있다.
- `C:\projects\mentalcare\google_ai\.env`가 Git 추적 대상이다. 실제 secret이 들어간 적이 있다면 Git 기록에서 지우는 것만으로 충분하지 않으므로 즉시 폐기·재발급하고 repository history 정리를 별도로 수행해야 한다.

---

## Portfolio Representation Rules

Codex는 이 프로젝트를 Portfolio Card, Project Detail, GitHub README로 변환할 때
다음 규칙을 반드시 지킨다.

### May State as Implemented

- 전체 서비스 Architecture 초안 설계
- React Native / Expo Web Frontend
- FastAPI Backend
- Google OAuth 기반 로그인
- JWT 인증 처리
- PostgreSQL
- pgvector
- Redis
- RAG
- Embedding / Vector Search
- Text 기반 감정 / 상황 분석
- 정보 부족 시 추가 질문 Flow
- 행동 루틴 추천
- Daily Report
- Weekly Report
- APScheduler 기반 Weekly Report scheduling `[팀 구현 기능; 개인 구현으로 쓰지 않음]`
- Docker
- Firebase Hosting
- GCP Cloud Run
- Cloud SQL
- Memorystore
- Serverless VPC Connector
- 정규화 문서 133건에서 생성한 셀프케어 루틴 310건
- 실제 Cloud 환경 End-to-End Flow 확인

### Must NOT State as Implemented

- Image Emotion Analysis
- Voice / Audio Emotion Analysis
- 완성된 Multimodal AI Service
- 대규모 사용자 운영
- 고가용성 검증
- Production Scale 성능 검증
- 장기 운영 모니터링 체계
- 근거 없는 성능 향상 수치
- 위기 표현 대응의 신뢰성·완전성 검증 완료

### Preferred Terminology

- `RAG-Based Routine Recommendation`
- `Text-Based Emotion / Situation Analysis`
- `Google OAuth 기반 로그인 및 JWT 인증 처리`
- `PostgreSQL + pgvector 기반 Vector Search`
- `Redis 기반 Session State 관리`
- `Cloud Run 기반 Backend 배포`
- `Serverless VPC Connector를 통한 Memorystore 연결`
- `Cloud 환경 End-to-End Flow 확인`

### Avoid

- `멀티모달 감정 분석을 구현했다`
- `이미지와 음성 감정 분석을 지원한다`
- `대규모 Production 환경을 운영했다`
- `Redis로 모든 사용자 데이터를 저장했다`
- `LLM이 임의로 정신건강 치료를 제공한다`
- 근거 없이 `성능 최적화`, `고가용성`, `무중단`, `확장성 검증` 등의 표현 사용

---

# Project 02 — 다:서 Multi-LLM–Based Cover Letter Writing System

## Metadata

- Name: 다:서 Multi-LLM–Based Cover Letter Writing System
- Period: 2025.03 - 2025.11
- Team Size: 5
- Type: Team Project / Capstone Design
- Team Composition:
  - Frontend: 2
  - Backend: 3
- My Role:
  - Frontend Development
  - Frontend Architecture
  - UI/UX Flow Design
  - Authentication Integration
  - My Page / User Data Management UI
  - Backend Authentication Refactoring

### README Verification

- Source: <https://github.com/krknulsh/LLMate_refactored>
- Verified on: 2026-09-11
- README가 명시한 주 역할은 Frontend Development다.
- README가 명시한 개인 기여는 Google Login, My Page, Backend Authentication Refactoring이다.
- Multi-LLM pipeline 전체는 팀 구현 범위이며, 각 Backend / prompt 단계의 개인 소유권은 별도 인터뷰로 확정한다.

### Local Code / Git Verification

- 검증 소스: `C:\projects\LLMate\LLMate_BE`, `C:\projects\LLMate\LLMate_FE`
- Backend 전체 71개 commit 중 사용자 식별 author의 commit은 4개, Frontend 전체 97개 중 36개다. 이 수치는 공개 성과가 아니라 개인 소유권 확인용 내부 근거다.
- 사용자 Backend commit으로 확인되는 작업은 My Page route/schema 통합, logout, access 만료·refresh flow, 2026년 Perplexity 복원이다.
- 초기 Google `GET /auth/login`과 callback route는 다른 팀원의 commit `8181e19`(2025-04-29)에서 먼저 확인된다. 다만 초기 callback은 Google access token으로 user info를 조회하고 출력한 뒤 종료했으며, 로컬 사용자 저장과 service JWT 발급이 없어 애플리케이션 인증 체인이 완성되지 않았다.
- commit `0eaeebd`(2025-09-09)에서 다른 팀원이 Google token 검증→사용자 조회·생성→service JWT 발급 흐름을 최종 반영했다.
- 사용자는 같은 통합 장애를 다른 팀원과 독립적으로 분석했고, Google token과 service JWT의 역할 혼동 및 callback 미완성을 함께 확인해 수정했다고 회고했다. 현재 Git만으로 최종 callback 코드의 단독 작성은 입증되지 않으므로 `문제 진단 및 해결 참여`로 표현한다.
- 사용자 commit `156178d`(2025-09-26)는 기존 login route에 refresh token cookie를 추가하고 `POST /auth/refresh`, logout cookie 제거, token 만료 처리를 보강한 변경이다.
- 현재 `main.py`에는 같은 user router를 중복 include하고 별도의 `GET /auth/login`도 정의한 흔적이 있어 routing 구조가 정리된 상태라고 보기 어렵다.
- 현재 My Page, login, user route는 공동 작업 범위이며, `useSessionTimer.js`는 현재 blame 기준 사용자 작성 범위다.
- 2026년 Perplexity 복원은 원 프로젝트 기간 이후 작업으로 분리하고, 사용자가 원래 일정에 포함됐다고 확인하기 전에는 2025년 결과에 합치지 않는다.

---

## Background

4학년 캡스톤 디자인 프로젝트로 진행했다.

이전 프로젝트에서 Multi-LLM 기반 서비스를 구현했던 경험을 확장하고,
팀원들이 공통적으로 가지고 있던 취업 및 자기소개서 작성에 대한 고민을 결합하여
Multi-LLM 기반 자기소개서 작성 시스템을 기획했다.

당시 여러 LLM이 경쟁적으로 발전하고 있었고 모델마다 비용과 강점이 달랐기 때문에,
하나의 LLM에 모든 역할을 맡기기보다 생성 모델과 복수의 평가 모델을 분리하는 구조를 선택했다.

사용 가능한 모델들의 가격과 특성을 조사한 결과,
한국어 텍스트 생성에서는 HyperCLOVA X가 프로젝트 목적에 적합하다고 판단해 생성 모델로 선택했다.

평가 단계에서는 하나의 모델의 관점에만 의존하지 않고
여러 LLM의 서로 다른 평가 관점을 활용하기 위해 GPT, Gemini, Claude를 사용했다.

---

## One-line Summary

사용자 프로필·경험 데이터와 외부 기업·직무 정보를 결합해
HyperCLOVA X가 한국어 자기소개서를 생성하고,
GPT·Gemini·Claude가 서로 다른 관점에서 텍스트 피드백을 제공하는
Human-in-the-loop Multi-LLM Pipeline 기반 자기소개서 작성 시스템.

---

## System Design

### Architecture Type

- Multi-LLM Pipeline
- Human-in-the-loop Revision Flow
- REST API 기반 Frontend–Backend 구조

실제 구현 구조를 과장하지 않기 위해
`Multi-LLM Orchestration`보다 `Multi-LLM Pipeline`을 우선 표현으로 사용한다.

### Data Sources

#### User Context
- 학력
- 경험
- 자격증
- 기존 자기소개서
- 기타 서비스에 저장된 사용자 프로필 데이터

#### External Context
- 지원 기업 정보
- 지원 직무 관련 정보
- Perplexity를 통한 외부 정보 보강 `[2026년 원 프로젝트 이후 복원]`

사용자 프로필과 경험 정보는 서비스 내부 저장 데이터를 활용하고,
현재 리팩토링본은 지원 기업 및 직무에 대한 외부 정보를 Perplexity로 보강하여
자기소개서 생성 Context를 구성했다.

이 기능은 사용자 commit 기준 2026년 8월에 복원된 작업이다.
2025년 원 프로젝트 성과와 이후 리팩토링 성과를 공개 문구에서 분리한다.

---

## LLM Roles

### Generation

#### HyperCLOVA X
- 한국어 자기소개서 초안 생성
- 사용자 입력 및 생성 Context 반영
- 사용자 수정 요청을 반영한 재작성

선정 배경:
- 당시 사용 가능한 LLM의 비용과 장점을 비교
- 한국어 텍스트 생성 성능을 중요 기준으로 판단
- 프로젝트 목적에 적합하다고 판단하여 생성 모델로 선택

### Evaluation

복수 모델을 사용해 하나의 평가 관점에만 의존하지 않도록 구성했다.

#### GPT
- Runtime model: `gpt-4o-mini`
- 주장 논리성과 글의 구조 평가

#### Gemini
- Runtime model: `gemini-2.0-flash`
- 창의성과 정보의 구체성 평가

#### Claude
- Runtime model: `claude-3-haiku-20240307`
- 문맥, 문장 자연스러움과 맞춤법 평가

평가 결과는 숫자 점수나 정량 지표가 아니라
사용자가 읽을 수 있는 단순 텍스트 피드백 형태로 제공했다.

세 평가 모델은 현재 Backend에서 순차 호출된다. 일부 모델 호출이 실패해도 error text가 반환되지만,
이를 정상 feedback과 구분하는 구조화된 상태 없이 Feedback row에 저장하는 한계가 있다.

---

## Revision Flow

재생성 여부는 시스템이 자동으로 결정하지 않는다.

사용자가 생성 결과와 평가 피드백을 확인한 뒤
추가 수정이 필요하다고 판단하면 대화형 수정 UI에서 수정 요청을 입력한다.

```text
User Context + Company / Job Context
                ↓
        HyperCLOVA X Generation
                ↓
       GPT / Gemini / Claude
          Text Evaluation
                ↓
          User Review
          ↙       ↘
   Revision       Save
      ↓
HyperCLOVA X Regeneration
      ↓
Evaluation
```

사용자가 더 이상 수정할 필요가 없다고 판단하면
대화식 수정 화면에서 저장을 선택하고 작성 과정을 종료한다.

따라서 이 프로젝트의 반복 구조는
자동 평가 기준에 따른 Autonomous Loop가 아니라
사용자 판단을 트리거로 하는 Human-in-the-loop 방식이다.

---

## My Contribution

### 1. Frontend Architecture

- React 기반 Frontend Architecture 설계
- 주요 화면과 기능 간 연결 구조 설계
- Frontend에서 Backend REST API를 호출하는 데이터 흐름 구성

### 2. UI/UX Flow

다음 사용자 흐름을 중심으로 UI/UX를 설계했다.

```text
Login
 ↓
Main
 ↓
New / Existing Cover Letter
 ↓
Input Form
 ↓
Generation
 ↓
Evaluation Feedback
 ↓
Conversational Revision
 ↓
Save
 ↓
My Page
```

### 3. Authentication

- 팀이 구현한 Google OAuth 로그인과 service JWT 인증 흐름을 Frontend에 연결
- Access token 30분, refresh token 7일 설정 및 refresh token 발급 추가
- HttpOnly refresh cookie와 `/auth/refresh` endpoint 구성
- logout 시 refresh cookie 제거와 만료 token 처리 추가
- Frontend session timer hook으로 access token 만료를 감지

현재 코드에서는 Frontend의 자동 refresh 호출과 cookie 포함 요청이 완결된 흐름으로 확인되지 않는다.
따라서 `refresh token 발급·갱신 endpoint 구현`과 `브라우저 자동 갱신 검증 완료`를 구분한다.

정확한 표현:
`Google OAuth 기반 로그인 및 JWT 인증 처리`

OAuth와 JWT를 동일한 인증 기술로 표현하지 않는다.

### 4. My Page

마이페이지에서 다음 사용자 정보를 조회하고 수정할 수 있도록 구현했다.

- 학력
- 경험
- 자격증
- 사용자 프로필 정보
- 기존에 작성한 자기소개서 목록
- 저장된 자기소개서 수정

### 5. REST API Integration

React 프론트엔드에서 REST API를 호출하여
사용자 프로필과 자기소개서 데이터를 조회·수정하고,
백엔드의 저장 API와 연동했다.

Frontend가 PostgreSQL에 직접 접근하거나 저장한 것으로 표현하지 않는다.

정확한 데이터 흐름:

```text
React Frontend
      ↓ HTTP / REST
FastAPI Backend
      ↓
PostgreSQL
```

---

## Implemented Features

### Frontend
- React 기반 Web UI
- Frontend Architecture
- UI/UX Flow
- Google OAuth 로그인 UI 및 인증 연동
- JWT 기반 인증 상태 처리
- 자기소개서 작성 화면
- 기존 자기소개서 선택 및 수정 화면
- 대화형 수정 인터페이스
- 마이페이지
- 사용자 프로필 조회·수정
- 자기소개서 아카이빙 및 수정
- Backend REST API 연동

### Backend / System
팀 프로젝트 전체 시스템 기준으로 다음 기능이 구현되었다.

- Python FastAPI Backend
- REST API
- PostgreSQL 데이터 저장
- 사용자 프로필 및 자기소개서 저장
- HyperCLOVA X 기반 자기소개서 생성
- Perplexity 기반 기업 / 직무 외부 정보 보강 `[2026년 후속 복원]`
- GPT / Gemini / Claude 기반 복수 관점 평가
- 사용자 요청 기반 재생성 Pipeline

---

## Technology Stack

기술 스택은 반드시 상태를 구분해서 관리한다.

### Implemented

#### Frontend
- JavaScript
- React 19.1
- React Router
- Axios

#### Backend
- Python
- FastAPI 0.115
- REST API
- SQLAlchemy Async
- Alembic

#### Database
- PostgreSQL

#### Authentication
- Google OAuth
- JWT

#### AI / LLM
- HyperCLOVA X
- GPT-4o-mini
- Gemini 2.0 Flash
- Claude 3 Haiku (`claude-3-haiku-20240307`)
- Perplexity `[2026년 후속 복원]`

### Planned but Not Completed

#### Deployment
- AWS

AWS 배포는 계획했으나 실제로 완료하지 않았으므로
Portfolio의 실제 사용 기술이나 배포 경험으로 표현하지 않는다.

### Candidate / Considered

현재 확정된 별도 후보 기술 없음.

---

## User Flow

### Normal Flow

1. 사용자가 웹 서비스에 접속한다.
2. Google OAuth를 통해 로그인한다.
3. 인증 이후 JWT를 이용해 서비스 요청의 인증 상태를 처리한다.
4. 사용자가 새 자기소개서 작성 또는 기존 임시 자기소개서 작성을 선택한다.
5. 시스템이 자기소개서 작성에 필요한 입력 항목을 표시한다.
6. 사용자가 지원 기업, 직무, 사용자 경험, 사용자 스토리, 포함할 내용, 스타일 가이드 등을 입력한다.
7. 서비스 내부의 사용자 프로필 및 경험 데이터와 입력 내용을 생성 Context에 포함한다.
8. 현재 리팩토링본은 Perplexity를 통해 지원 기업 및 직무 관련 외부 정보를 보강한다. `[2026년 후속 복원]`
9. 구성된 Context를 기반으로 HyperCLOVA X가 자기소개서를 생성한다.
10. GPT, Gemini, Claude가 각자의 평가 기준에 따라 텍스트 피드백을 생성한다.
11. 사용자가 생성된 자기소개서와 평가 피드백을 확인한다.
12. 추가 수정이 필요하면 대화형 수정 UI에 수정 요청을 입력한다.
13. HyperCLOVA X가 수정 요청을 반영해 자기소개서를 재작성한다.
14. 복수의 평가 LLM이 다시 텍스트 피드백을 제공한다.
15. 사용자가 더 이상 수정할 필요가 없다고 판단하면 저장을 선택한다.
16. 최종 자기소개서가 Backend API를 통해 PostgreSQL에 저장된다.
17. 사용자는 마이페이지에서 저장된 자기소개서를 다시 조회하고 수정할 수 있다.

### Invalid Input Flow

1. 사용자가 자기소개서 작성 화면에 진입한다.
2. 필수 입력 항목이 누락된 상태로 생성을 요청한다.
3. 시스템이 정상적인 생성이 어렵다는 것을 사용자에게 알린다.
4. 사용자가 필요한 입력을 보완할 수 있도록 작성 화면으로 복귀한다.

---

## Troubleshooting

모든 문제 해결 기록은 앞으로 아래 순서를 사용한다.

```text
Problem
↓
Symptom
↓
Investigation
↓
Root Cause
↓
Solution
↓
Result
↓
Learning
```

### Google OAuth Callback / Service JWT Chain

#### Problem

Google 로그인 redirect와 callback endpoint는 존재했지만,
callback이 Google access token으로 user info를 조회하고 출력한 뒤 종료했다.
로컬 사용자와 연결된 service JWT가 발급되지 않아 로그인 이후 보호 API 인증으로 이어질 수 없었다.

#### Investigation

사용자와 다른 팀원이 각자 로그인 흐름을 추적한 뒤 원인을 교차 검증했다.

```text
Google authorization code
→ Google access token
→ Google user info
→ Local user lookup / create
→ Application service JWT
→ Authorization: Bearer <service JWT>
```

이 과정에서 Google이 발급한 token과 애플리케이션이 자체 API 인증에 사용하는 JWT가
서로 다른 책임과 수명을 가진다는 점을 구분했다.

#### Root Cause

endpoint의 존재 여부가 아니라 callback 이후의 인증 chain이 미완성이었다.
초기 구현은 외부 identity 확인에서 끝났고, 이를 내부 사용자와 service JWT로 변환하는 단계가 없었다.

#### Solution

- Google token으로 user info 조회
- social ID 기준 local user 조회 또는 생성
- local user ID를 subject로 하는 service JWT 발급
- Frontend에 access token과 사용자 정보를 반환
- 이후 사용자 commit에서 refresh token, HttpOnly cookie, 만료·logout 처리를 보강

최종 callback 구현은 다른 팀원 명의 commit `0eaeebd`에 남아 있다.
사용자의 독립 진단·수정 참여는 회고로 확인되지만 단독 구현으로 쓰지 않는다.

#### Result

Google 인증 결과를 서비스 내부 인증으로 교환하는 흐름이 연결됐고,
이후 보호 API에서 service JWT를 사용할 수 있는 구조가 만들어졌다.

#### Learning

OAuth는 외부 인증·권한 위임 절차이고 JWT는 token 표현 형식일 수 있으므로 같은 개념으로 다루면 안 된다.
외부 provider token의 발급자·대상과 내부 API token의 발급자·대상을 분리해 설계해야 한다.

---

### My Page API Contract Stabilization — Code Change Record / STAR Candidate

이 사례는 commit diff로 변경 내용은 확인했지만 사용자가 당시 증상과 해결 과정을 기억하지 못한다.
따라서 공개 STAR로 확정하지 않고, 추가 증거가 나오기 전까지 code change record로만 보관한다.

#### Problem

Commit diff상 Frontend의 My Page가 사용하는 경험·자기소개서 API에서
Backend response schema, 빈 목록 처리, 소유권 조건을 정리할 필요가 있었다.

#### Symptom

- 경험 CRUD의 입력·수정·출력 schema 경계가 불명확함
- 빈 자기소개서 목록이 `404`를 반환해 Frontend의 배열 처리와 맞지 않음
- 사용자별 데이터 조회·수정·삭제에 일관된 소유권 filter가 필요함

#### Investigation

Frontend의 My Page 호출 형태와 Backend의 route, Pydantic schema, ORM 반환 흐름을 대조했다.

확인한 항목:

- 생성·수정·조회 endpoint의 request / response schema
- commit 이전의 빈 목록 응답 규칙
- ORM 변경 후 최신 값을 반환하는지
- read / update / delete에서 현재 사용자 조건이 일관되게 적용되는지

#### Root Cause

Backend가 My Page의 create / update / output을 명확히 분리하지 않았고,
빈 collection을 오류로 다뤄 Frontend가 기대한 `list` 계약과 맞지 않았다.
일부 CRUD에는 현재 사용자 기준의 ownership 조건과 갱신 후 반환 절차도 일관되게 필요했다.

#### Solution

- `EssayExperienceCreate`, `EssayExperienceUpdate`, `EssayExperienceOut` schema를 분리
- CRUD endpoint에 `response_model`을 명시
- read / update / delete query에 현재 사용자 ownership filter를 적용
- create / update 후 `db.refresh`로 반환 상태를 동기화
- delete 응답을 `{ok: true}`로 통일
- 빈 자기소개서 목록을 `404` 대신 `200 []`로 반환해 Frontend의 배열 계약과 정렬

#### Result

2025-09-17 사용자 commit `5736e7d`에서 위 변경이 확인된다.
My Page의 데이터 계약과 사용자별 접근 조건을 일관되게 만들었으며,
빈 목록도 정상 상태로 처리하도록 Frontend–Backend 계약을 정렬했다.

자동화된 회귀 테스트나 당시 HTTP 오류 로그는 저장소에서 확인되지 않으므로
`전체 통합 오류 완전 해결` 또는 정량 개선 수치로 확장하지 않는다.

#### Learning

CRUD의 경로 존재 여부만 맞추는 것으로는 API 계약이 완성되지 않는다.
collection의 빈 상태, schema 방향, ownership, 성공 응답 형태까지 함께 정의해야
Frontend가 예외 분기 없이 안정적으로 사용할 수 있다는 점을 확인했다.

- API Endpoint
- HTTP Method
- Request Schema
- Response Schema
- Error Response
- 담당 Module
- Empty Collection Semantics
- Ownership Rule

향후 프로젝트에서는 API Contract를 먼저 정의하고
이를 기준으로 각 모듈을 개발하는 방식을 우선한다.

---

## Technical Result

최종적으로 Local 환경에서 주요 서비스 흐름의 정상 작동을 확인했다.

구현 및 확인한 주요 흐름:

- Google OAuth 로그인
- JWT 기반 인증 처리
- 사용자 프로필 조회 및 수정
- 자기소개서 작성 입력
- 사용자 Context 구성
- HyperCLOVA X 기반 자기소개서 생성
- GPT / Gemini / Claude 텍스트 평가
- 사용자 요청 기반 자기소개서 재작성
- 최종 자기소개서 저장
- 마이페이지에서 자기소개서 조회 및 수정

후속 리팩토링 결과:

- 2026년 8월 Perplexity 기업 / 직무 조사 기능 복원
- 외부 조사 요청에는 회사명과 직무명만 전달하고 citation을 생성 context에 포함
- mocked `unittest`로 입력 범위, citation 포함, API key 누락 실패를 검증

---

## Exhibition

- 2025 강원SW 페스티벌 출품

---

## Award

- 졸업작품 경진대회 장려상

---

## Planned but Not Completed

- AWS 배포
- 프로젝트 기간 내 전체 구조 리팩토링
- 모듈 간 결합도를 더 낮추기 위한 구조 개선
- 초기 기획 단계의 일부 세부 기능

완료하지 못한 항목을 Portfolio에서 완료 기능처럼 표현하지 않는다.

---

## Limitations / Retrospective

### Deployment

계획했던 AWS 배포까지 이어가지 못했다.

따라서 프로젝트의 Technical Result는
`Local 환경에서 전체 시스템 통합 및 정상 동작 확인`으로 표현한다.

### Integration Design

초기 개발 단계에서 Frontend–Backend API Contract를
더 명확하게 정의했다면 통합 과정에서 발생한 비용을 줄일 수 있었다.

### Architecture

프로젝트 기간 이후 Frontend와 Backend의 큰 router 파일에 몰린 코드를
기능과 책임별 새 파일로 분리하는 리팩토링을 진행했다.

이 작업은 runtime traffic이나 LLM 요청을 분산한 것이 아니라
파일 크기와 module responsibility를 나눈 구조 개선이다.
따라서 `모듈 로드 분산`이나 `성능 최적화` 대신
`대형 router를 기능별 module로 분리해 변경 범위를 축소`라고 표현한다.

원본 대비 분리된 파일 목록과 변경량은 refactored source를 추가 대조한 뒤 확정한다.

다시 진행한다면 기능 개발 전에 다음을 먼저 고정한다.

- API Contract
- Request / Response Schema
- Module Responsibility
- Error Handling Convention
- Authentication Flow
- Data Ownership

### LLM Evaluation

모델별 prompt의 특성에 맞춘 충분한 실험과 정량 평가는 완료하지 못했다.
향후 보강 항목은 prompt versioning, 고정 평가 dataset, 평가 rubric 및 정량 지표다.

### Code-Verified Risks / Unverified Scope

- GPT·Gemini·Claude feedback은 순차 호출되므로 세 모델 latency가 누적된다.
- 모델 실패 시 error text가 정상 feedback과 같은 형태로 DB에 저장돼 부분 실패를 구조적으로 구분하기 어렵다.
- HyperCLOVA X의 정확한 model version은 현재 코드에서 확인되지 않는다.
- refresh token endpoint는 있으나 Frontend의 자동 refresh와 `credentials` 설정을 포함한 브라우저 E2E는 확인되지 않는다.
- React route 수준의 보호보다 Backend API 인증에 의존한다.
- Perplexity 외에는 통합·E2E 자동 테스트가 거의 없고 Frontend test는 기본 placeholder다.
- AWS 배포는 완료되지 않았으며 Local 동작 범위 이상으로 운영 성과를 확장하지 않는다.

---

## Portfolio Representation Rules

Codex는 이 프로젝트를 Portfolio, Project Detail, README로 변환할 때
다음 규칙을 반드시 지킨다.

### May State as Implemented
- React Frontend
- Frontend Architecture 및 UI/UX Flow 설계
- Google OAuth 기반 로그인
- JWT 인증 처리
- REST API 연동
- 사용자 프로필 / 자기소개서 조회 및 수정
- HyperCLOVA X 생성
- GPT-4o-mini / Gemini 2.0 Flash / Claude 3 Haiku 텍스트 평가 `[팀 구현]`
- Perplexity Context 보강 `[2026년 후속 복원]`
- Human-in-the-loop Revision Pipeline
- PostgreSQL
- Local 통합 실행

### Must NOT State as Implemented
- AWS Production Deployment
- 자동 평가 점수 / 정량 평가 지표
- Autonomous Self-Revision Loop
- Frontend의 직접 DB 접근
- 완료되지 않은 리팩토링
- 완료되지 않은 세부 기능
- 초기 `/auth/login` handler를 사용자가 신규 구현했다는 주장
- Google token과 service JWT를 동일한 token으로 표현
- 세 feedback 모델을 병렬 호출했다는 주장
- refresh token 자동 갱신 E2E를 완료했다는 주장
- router 파일 분리를 runtime load 분산이나 성능 개선으로 표현

### Preferred Terminology
- `Multi-LLM Pipeline`
- `Human-in-the-loop Revision Flow`
- `Google OAuth 기반 로그인 및 JWT 인증 처리`
- `REST API를 통한 Backend 연동`
- `텍스트 피드백`
- `API Contract 불일치`
- `빈 collection과 ownership을 포함한 API contract 정렬`

### Avoid
- `JWT OAuth 로그인`
- `Perplexity가 사용자 데이터를 수집했다`
- `LLM이 자동으로 기준을 통과할 때까지 수정했다`
- `논리성/차별성을 수치화했다`
- `AWS에 배포했다`
