# Project Data

이 파일은 Portfolio와 GitHub README에서 공통으로 참조할 프로젝트 사실 정보다.

사실과 해석을 분리한다.
확인되지 않은 수치나 성과는 임의로 추가하지 않는다.


## Global Data Rules

이 파일은 Portfolio의 Single Source of Truth 역할을 한다.

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
  - 전체 서비스 아키텍처 초안 설계
  - Backend Development
  - Google OAuth / JWT Authentication
  - Database / Data Flow Integration
  - RAG / Routine Recommendation 핵심 기능
  - Frontend UI 배치 및 결과 시각화
  - 서비스 통합 및 리팩토링
  - GCP Cloud 배포 및 인프라 연결

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
NHS·APA 기반 행동 루틴 데이터를 RAG와 Vector Search로 검색해
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

- NHS 자료
- APA 자료
- 정신건강 및 행동 가이드 기반 행동 루틴 약 400건

외부 자료를 그대로 LLM의 답변으로 사용하는 것이 아니라,
서비스용 행동 루틴 데이터로 정리한 뒤 Embedding을 생성하여
Vector Search와 RAG 추천에 활용했다.

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
- 서비스 이용을 위한 JWT 발급
- JWT를 이용한 이후 요청의 인증 처리

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

NHS와 APA 등의 자료를 기반으로
약 400건의 정신건강 행동 루틴 데이터를 구축했다.

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

사용자의 감정 및 상황 분석 결과를 기반으로 관련 루틴을 검색하고,
검색 결과와 사용자 상황을 LLM에 전달하여
공감형 응답과 행동 루틴을 함께 제공하도록 구현했다.

### 5. Redis-Based Session State

대화 도중 계속 변경되는 임시 상태를
관계형 데이터베이스에 모두 저장하기보다 Redis를 이용해 관리했다.

세션 단위로 다음 상태를 관리했다.

- 대화 기록
- 현재 처리 상태
- 마지막 분석 결과
- 추가 정보 필요 여부
- 보고서 생성 가능 여부

여러 API 요청 사이에서도 같은 대화 세션의 상태가 이어지도록 구성했다.

### 6. Report Flow

사용자가 대화를 종료하면
현재 세션의 대화 내용과 분석 결과를 이용해
Session / Daily Report를 생성하도록 구현했다.

또한 일정 기간의 데이터를 집계하여
Weekly Report를 생성하는 구조를 구현했다.

Weekly Report의 주기적 생성은 APScheduler를 이용해 구성했다.

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

- LLM API
- Text-Based Emotion / Situation Analysis
- RAG
- Embedding
- Vector Search
- NHS / APA 기반 행동 루틴 약 400건 구축

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
- LLM API
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
- 기능 변경 시 다른 모듈에서도 연쇄적인 수정이 필요함

#### Investigation

전체 서비스 Flow를 기준으로
각 계층에서 실제로 전달되는 데이터를 다시 추적했다.

확인한 항목:

- Frontend Request Payload
- FastAPI Request / Response Schema
- Backend 내부 Module I/O
- Database Model
- 저장되는 JSON / Field 구조
- 다음 단계에서 기대하는 데이터 형식

#### Root Cause

프로젝트 초기 단계에서
API Contract와 Module Input / Output Schema를 충분히 세밀하게 고정하지 않은 상태로
각 기능을 병렬적으로 개발한 것이 주요 원인이었다.

같은 데이터에 대해
Frontend, Backend Module, Database가 서로 다른 구조를 예상하면서
통합 단계에서 불일치가 발생했다.

#### Solution

- 주요 API의 Request / Response 구조 재정리
- Frontend–Backend 데이터 흐름을 기준으로 Field 구조 통일
- Database Model과 실제 API 데이터 구조 재검토
- 기능 간 Interface를 다시 연결
- 전체 서비스 Flow를 기준으로 Refactoring 진행

#### Result

Frontend Input부터 Backend 처리,
Database 저장, RAG Recommendation, Report까지
연결되는 전체 Flow의 데이터 구조를 정리하고
통합 동작을 정상화했다.

#### Learning

프로젝트 초기에
`API Contract`, `Request / Response Schema`,
`Module I/O`, `Data Ownership`을 명확하게 정의하는 것이
통합 비용을 크게 줄인다는 점을 경험했다.

이후 시스템을 설계할 때는
기능 목록만 나누는 것이 아니라
모듈 사이에서 어떤 데이터가 어떤 형태로 이동하는지까지
먼저 정의해야 한다는 기준을 갖게 되었다.

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

Embedding Model / Data 구성이 변경되는 과정에서
새 Embedding Vector의 Dimension과
기존 Database Vector Schema의 Dimension이 일치하지 않았다.

#### Solution

- 최종 사용할 Embedding Model 기준으로 Vector 구조 결정
- PostgreSQL pgvector Schema를 해당 Dimension에 맞게 정리
- 필요한 Embedding Data 재생성
- 저장 → 검색 Flow 재검증

#### Result

Embedding Data와 pgvector Schema의 Dimension을 일치시키고
Vector Search Pipeline이 정상적으로 동작하는 것을 확인했다.

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
- 필수 Environment Variable 정리
- Container Port 및 실행 환경 점검
- Cloud SQL과 Backend 연결 개별 검증
- Redis 접근을 Serverless VPC Connector 기반으로 정리
- Direct VPC와 Connector의 중복 / 충돌 설정 제거
- Cloud SQL → Redis → API Flow를 단계적으로 검증

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

- NHS / APA 자료 기반 행동 루틴 약 400건 구축
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
- APScheduler
- Docker
- Firebase Hosting
- GCP Cloud Run
- Cloud SQL
- Memorystore
- Serverless VPC Connector
- NHS / APA 기반 약 400건 행동 루틴 데이터 구축
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
- Perplexity를 통한 외부 정보 보강

사용자 프로필과 경험 정보는 서비스 내부 저장 데이터를 활용하고,
지원 기업 및 직무에 대한 외부 정보는 Perplexity를 통해 보강하여
자기소개서 생성 Context를 구성했다.

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
- 논리성 평가

#### Gemini
- 직무 적합성 평가

#### Claude
- 표현 및 일관성 평가

평가 결과는 숫자 점수나 정량 지표가 아니라
사용자가 읽을 수 있는 단순 텍스트 피드백 형태로 제공했다.

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

- Google OAuth 기반 로그인 구현
- 로그인 이후 JWT 기반 인증 처리
- 인증된 사용자의 서비스 접근 흐름을 Frontend에 연결

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
- Perplexity 기반 기업 / 직무 외부 정보 보강
- GPT / Gemini / Claude 기반 복수 관점 평가
- 사용자 요청 기반 재생성 Pipeline

---

## Technology Stack

기술 스택은 반드시 상태를 구분해서 관리한다.

### Implemented

#### Frontend
- JavaScript
- React

#### Backend
- Python
- FastAPI
- REST API

#### Database
- PostgreSQL

#### Authentication
- Google OAuth
- JWT

#### AI / LLM
- HyperCLOVA X
- GPT
- Gemini
- Claude
- Perplexity

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
8. Perplexity를 통해 지원 기업 및 직무 관련 외부 정보를 보강한다.
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

### API Contract Mismatch During Integration

#### Problem

Frontend와 Backend에서 개별적으로 개발한 모듈을 최초 통합하는 과정에서
로그인 단계부터 요청이 정상적으로 처리되지 않았다.

#### Symptom

- Frontend에서 로그인 관련 요청을 전송했지만 정상 응답을 받지 못함
- 개별 모듈 개발 단계에서는 발견되지 않았으나 통합 이후 서비스 흐름이 시작 단계에서 중단됨
- 팀원들이 함께 원인을 확인했으나 최초 통합 미팅에서는 해결하지 못함

#### Investigation

최초 미팅 이후 디버깅을 진행하면서
오류가 발생하는 요청부터 순차적으로 흐름을 추적했다.

확인한 항목:

- Frontend에서 요청이 실제로 발생하는지
- Request URL
- HTTP Method
- Request Payload
- Backend Route
- Backend Handler 존재 여부
- 해당 Handler가 위치해야 할 Backend Module

#### Root Cause

Frontend가 호출하도록 설계된 API 요청과
실제 Backend 구현 사이의 API Contract가 일치하지 않았다.

구체적으로 Frontend가 데이터를 요청하고 있었지만
해당 요청을 처리할 Backend Handler가 구현되어 있지 않았다.

#### Solution

- 누락된 Backend Handler 구현
- Handler가 위치할 Backend Module 결정
- Frontend Request와 Backend Endpoint 연결
- 통합 흐름을 다시 테스트

#### Result

누락된 Backend Handler를 추가하고
Frontend 요청과 Backend Endpoint를 연결하여
로그인 단계의 통합 오류를 해결했다.

이후 다음 기능들의 전체 통합 테스트를 이어갈 수 있었다.

#### Learning

개별 모듈이 각각 정상적으로 동작하는 것만으로는
전체 시스템의 통합을 보장할 수 없다는 점을 경험했다.

특히 Frontend–Backend 협업에서는 구현 전에
다음 항목을 명확하게 정의하고 공유해야 한다는 것을 배웠다.

- API Endpoint
- HTTP Method
- Request Schema
- Response Schema
- Error Response
- 담당 Module

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
- Perplexity 기반 기업 / 직무 정보 보강
- HyperCLOVA X 기반 자기소개서 생성
- GPT / Gemini / Claude 텍스트 평가
- 사용자 요청 기반 자기소개서 재작성
- 최종 자기소개서 저장
- 마이페이지에서 자기소개서 조회 및 수정

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

프로젝트 기간 내에 추가적인 리팩토링을 수행하여
모듈 간 결합도를 낮추고 구조를 더 개선하고 싶었으나 완료하지 못했다.

다시 진행한다면 기능 개발 전에 다음을 먼저 고정한다.

- API Contract
- Request / Response Schema
- Module Responsibility
- Error Handling Convention
- Authentication Flow
- Data Ownership

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
- Perplexity Context 보강
- GPT / Gemini / Claude 텍스트 평가
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

### Preferred Terminology
- `Multi-LLM Pipeline`
- `Human-in-the-loop Revision Flow`
- `Google OAuth 기반 로그인 및 JWT 인증 처리`
- `REST API를 통한 Backend 연동`
- `텍스트 피드백`
- `API Contract 불일치`

### Avoid
- `JWT OAuth 로그인`
- `Perplexity가 사용자 데이터를 수집했다`
- `LLM이 자동으로 기준을 통과할 때까지 수정했다`
- `논리성/차별성을 수치화했다`
- `AWS에 배포했다`
