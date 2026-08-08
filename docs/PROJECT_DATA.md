# Project Data

이 파일은 Portfolio와 GitHub README에서 공통으로 참조할 프로젝트 사실 정보다.

사실과 해석을 분리한다.
확인되지 않은 수치나 성과는 임의로 추가하지 않는다.

\---

# Project 01 — Multi-LLM Resume Generator

## Basic

* Name: Multi-LLM Resume Generator
* Period: 2025.03 - 2025.11
* Team Size: 5
* Type: Team Project

## One-line Summary

여러 LLM이 생성과 평가 역할을 나누고,
평가 결과를 다시 생성 단계에 반영하는 자기소개서 생성 시스템.

## LLM Roles

* HyperCLOVA X: Generation
* Gemini: Evaluation
* GPT: Evaluation
* Claude: Evaluation

## Core Concept

```text
User Input
 ↓
Generation LLM
 ↓
Multiple Evaluation LLMs
 ↓
Feedback
 ↓
Revision
 ↓
Repeat
```

## Main Learning / Problem Solving

* 각 팀원이 개발한 모듈 통합 과정에서 인터페이스 불일치 경험
* 입력 / 출력 형식의 명확한 정의 필요성 경험
* 확장 가능한 아키텍처의 중요성 학습
* Embedding dimension 변경 문제 경험

## Need More Information

* \[ ] 실제 사용 기술 스택
* \[ ] Backend / Frontend framework
* \[ ] Database
* \[ ] Deployment 여부
* \[ ] 사용자가 직접 구현한 정확한 기능
* \[ ] Repository URL
* \[ ] 실행 화면
* \[ ] 최종 결과물 상태

\---

# Project 02 — AI Mental Care

## Basic

* Name: AI Mental Care
* Period: 2025.09 - 2025.12
* Team Size: 6
* Type: Team Project
* Domain: AI / Mental Care
* Main Role:

  * 전체 아키텍처 초안 설계
  * 핵심 기능 구현
  * Backend
  * 일부 Frontend

## One-line Summary

사용자 텍스트에서 감정과 상황을 분석하고,
RAG를 통해 적절한 행동 루틴을 추천하는 AI 멘탈 케어 서비스.

## Implemented Features

* Google OAuth 로그인
* JWT 인증
* 사용자/세션 데이터 저장
* 텍스트 기반 감정 분석
* RAG 기반 루틴 검색 및 추천
* pgvector 기반 Vector Search
* Redis 기반 세션/대화 상태 관리
* Daily Report
* Weekly Report
* APScheduler 기반 Weekly Report 생성
* Docker 환경 구성
* GCP Cloud Run 배포
* Cloud SQL PostgreSQL
* Memorystore Redis
* Firebase Frontend 배포

## Not Implemented

다음 항목은 완료 기능으로 표현하지 않는다.

* Image Emotion Analysis
* Voice Emotion Analysis

표현이 필요한 경우:
"멀티모달 입력 확장을 고려한 구조를 설계했다."
정도로만 기술한다.

## Data

* NHS / APA 등 권위 있는 기관 자료 기반
* 정신건강 행동 루틴 데이터 약 400건 구축

## Main Stack

### Frontend

* React Native
* Expo Web

### Backend

* Python
* FastAPI

### Database

* PostgreSQL
* pgvector
* Redis

### Cloud / Infra

* GCP Cloud Run
* Cloud SQL
* Memorystore
* Docker
* Firebase

### Authentication

* Google OAuth
* JWT

### AI

* LLM API
* RAG
* Embedding
* Vector Search

## Important Architecture Flow

```text
User
 ↓
Expo Web
 ↓
FastAPI / Cloud Run
 ↓
Authentication / Chat / RAG / Report
 ↓
PostgreSQL + pgvector
 ↓
Redis
```

## Core User Flow

```text
Google OAuth
→ Login
→ User Text Input
→ Emotion / Situation Analysis
→ Vector Search
→ Routine Retrieval
→ LLM Response
→ Session Report
→ Weekly Report
```

## Problem Solving Candidates

### A. API / Module Interface

Problem:
초기 API 명세와 모듈 입출력 규격이 명확하지 않아
통합 단계에서 DB 및 모듈 간 인터페이스 문제가 발생.

Learning:
구현 전에 API Schema와 Module I/O를 먼저 정의해야
통합 비용을 줄일 수 있다는 점을 경험.

### B. Embedding Dimension

Problem:
Embedding 모델/데이터 변경 과정에서 Vector dimension 불일치 발생.

Action:
Embedding dimension과 DB vector schema를 맞추고
데이터를 재구성하여 검색 pipeline 정상화.

### C. Deployment / Environment

Problem:
로컬에서 동작하던 서비스가 Cloud 환경에서
환경변수, 네트워크, Redis 연결 문제 등으로 실패.

Action:
Cloud Run / Cloud SQL / VPC Connector / Memorystore 설정을
분리해서 점검하고 연결 구조를 수정.

Result:
로그인 → RAG 검색 → 루틴 추천 흐름의 Cloud 실행 확인.



