---
id: ai-mental-care
title: "AI Mental Care"
subtitle: "RAG 기반 개인화 멘탈 케어 서비스"
period: "2025-09..2025-12"
team_size: 6
project_type: "팀 프로젝트 / 캡스톤 디자인"
domain: ["backend", "ai", "mental-care"]
primary_role: "Team Lead / Backend"
roles:
  - "서비스 아키텍처 초안 설계"
  - "Backend 및 인증"
  - "RAG·embedding pipeline"
  - "데이터 흐름 통합"
  - "GCP 배포"
repository: "https://github.com/krknulsh/AI_MentalCare_Refactored"
last_verified: "2026-09-13"
public_card:
  approved: false
  summary: "사용자의 감정·상황을 분석하고 310건의 셀프케어 루틴을 검색해 행동 제안과 리포트로 연결한 RAG 서비스"
  roles: ["Team Lead", "Backend", "RAG", "Cloud"]
  skills: ["FastAPI", "PostgreSQL", "pgvector", "Redis", "Gemini", "GCP"]
  result: "정규화 문서 133건에서 루틴 310건을 구성하고 Cloud 환경의 주요 서비스 흐름을 연결"
---

# AI Mental Care

## Document rules

- 이 파일은 프로젝트 단위 사실 원장이다.
- 코드·Git·데이터로 확인된 사실과 사용자 회고를 구분한다.
- 측정하지 않은 latency, 정확도, 사용자 수는 만들지 않는다.
- 비공개 secret, token, 사용자 원문과 로컬 절대 경로는 기록하지 않는다.
- 의료 진단·치료 서비스가 아니라 비임상적 자기관리 지원 서비스로 표현한다.

## Scope

- 목표: 사용자의 텍스트에서 감정과 상황을 분석하고, 출처가 연결된 셀프케어 루틴을 검색해 실행 가능한 행동으로 제안한다.
- 사용자 문제: 공감형 답변만으로는 사용자가 실제 생활에서 무엇을 해야 하는지 연결하기 어렵다.
- 기간 제약: 3개월의 캡스톤 일정 안에서 데이터 구축, Backend, Frontend 통합과 Cloud 배포를 완료해야 했다.
- 주요 입력: 텍스트. 이미지·음성 분석은 계획했지만 완료하지 않았다.

### 내가 소유하거나 주도한 영역

- 전체 서비스 아키텍처 초안과 주요 데이터 흐름
- FastAPI Backend logic
- Google OAuth / service JWT 인증
- RAG, inference, response composition, embedding service
- 루틴 생성·적재·embedding script
- PostgreSQL·pgvector·Redis 연동
- Docker, Cloud Run, Cloud SQL, Memorystore 연결
- Frontend의 Chat·추천 결과 배치와 Backend API 통합

### 공동 작업 영역

- Chat service
- Frontend 주 Chat 화면과 API integration
- Report schema와 서비스 전체 통합

### 팀 소유 영역

- Weekly Report 생성 logic
- APScheduler 기반 월요일 00:05(KST) scheduling

Weekly Report와 scheduling은 팀 구현 기능으로는 설명할 수 있지만 개인 구현 성과로 쓰지 않는다.

## Project context, architecture and flow

### One-line summary

사용자의 텍스트에서 감정과 상황을 분석하고, 정규화 문서 133건에서 생성한 셀프케어 루틴 310건을 RAG로 검색해 개인화된 행동 제안과 세션·주간 리포트로 연결한 서비스다.

### Architecture

```text
Expo Web / React Native
        ↓
     FastAPI
        ↓
Authentication ─ Emotion·Situation Analysis
        ↓                    ↓
 PostgreSQL          Information Sufficiency
        ↓              ↙             ↘
 User·Session   Clarifying Question   RAG Retrieval
 Report Data                           ↓
                          pgvector + Routine Data
                                      ↓
                           Response Composition
                                      ↓
Redis Session State ← Conversation / Recommendation
        ↓
Cloud SQL · Memorystore · Cloud Run · Firebase Hosting
```

### Request flow

1. Google identity를 Backend가 검증하고 서비스용 access / refresh JWT를 발급한다.
2. 사용자 입력과 session은 PostgreSQL에 저장한다.
3. Gemini 2.5 Flash가 감정·상황과 confidence를 분석한다.
4. 감정 confidence 또는 상황 clarity가 0.7 미만이면 추가 질문을 반환한다.
5. 후속 입력이 오면 첫 입력과 합쳐 감정·상황을 다시 분석한다. 정보가 충분해진 요약을 embedding하고 pgvector에서 상위 5개 후보를 검색한다.
6. 검색 결과와 사용자 상황을 이용해 공감형 응답과 행동 루틴을 구성한다.
7. 진행 중 상태는 Redis에 저장하고 세션 종료 결과는 report로 영속화한다.

## Verified facts

### Data

- 정규화 문서: 133건, 고유 `doc_id` 133개
- 생성 루틴: 310건, 고유 `routine_id` 310개
- 루틴 생성에 반영된 원본 문서: 121개
- 루틴 소요시간: 1~10분
- 모든 루틴에 `source_url`, `title`, `description`, `steps`, `safety_notes`, `duration_min`이 있다.
- 출처 도메인: Verywell Mind, Healthline, HelpGuide, Psych Central, NHS, Mental Health Foundation UK, Medical News Today, Harvard Health, Mayo Clinic, NIMH, WHO
- 사용자가 생성 루틴을 직접 검수했다.
- 일정 제약으로 명시적인 제외 기준과 중복 검사는 만들지 못했다.
- 기존 기록의 약 400건과 APA 출처는 현재 데이터에서 확인되지 않으므로 사용하지 않는다.

### AI and retrieval

- 감정·상황 분석과 응답 구성: Gemini 2.5 Flash
- 증분 세션 요약과 주간 리포트: Gemini 2.5 Pro
- embedding: `text-embedding-004`, 768차원
- 검색: pgvector cosine distance, IVFFlat, 기본 `top_k=5`
- 감정 confidence와 상황 clarity의 기준값: 0.7
- distance threshold와 metadata filter는 없다.
- 대표 루틴은 현재 검색 결과의 첫 항목이다.

### Clarifying question and changed context

- 사용자 설명: 첫 입력이 감정·상황을 충분히 표현하지 못했을 때 추가 질문으로 정보를 더 받는다. 후속 입력에서 앞선 이야기와 다른 중요한 사건이 드러나면 새 맥락을 분석과 추천에 반영하려는 설계다.
- 코드 확인: confidence 또는 clarity가 0.7 미만이면 `NeedMoreInfoResponse`를 반환한다. 후속 요청의 `flag=1` 경로는 세션의 첫 입력과 최신 입력을 합쳐 `run_full_rag`에 전달하고 감정·상황 분석과 검색을 다시 실행한다.
- 별도의 키워드 변화 감지 규칙은 확인되지 않는다. 후속 입력을 합쳐 재분석하는 방식이며, 반복 질문의 관련성이나 추천 품질 개선율을 측정한 평가셋은 없다.

### Authentication and state

- Backend에서 Google ID token을 검증하고 자체 access / refresh JWT를 발급한다.
- 기본 access token 만료: 30분
- 기본 refresh token 만료: 7일
- Web은 localStorage, Native는 SecureStore에 token을 저장한다.
- Redis는 session state, message list, stream, incremental summary와 summary index를 관리한다.
- 실제 session key에서 TTL과 세션 종료 시 명시적 삭제는 확인되지 않는다.

### Deployment

- Frontend: Firebase Hosting
- Backend: Docker + GCP Cloud Run
- 관계형·벡터 데이터: Cloud SQL PostgreSQL + pgvector
- session state: Memorystore for Redis
- private Redis 연결: Serverless VPC Connector
- 공개 운영 instance는 현재 없다.

## STAR stories

### star-embedding-dimension — embedding 차원과 pgvector schema 정합성

- Delivery: implemented
- Ownership: mine
- Verification: verified
- Publication: public-site
- Evidence: migration `f9dfb1ea6413`, RAG·embedding 관련 Git history

#### Situation

RAG pipeline을 통합하는 과정에서 소스와 migration에 1536차원과 768차원 정의가 혼재했다. embedding model 출력, pgvector column과 index가 일치하지 않아 vector 저장·검색 흐름을 안정적으로 연결하기 어려웠다.

#### Task

최종 embedding model에 맞는 단일 차원 규격을 정하고, 기존 schema·index·저장 데이터를 같은 규격으로 맞춰 RAG 검색을 복구해야 했다.

#### Action

- embedding model의 출력 차원과 ORM model, Alembic migration, pgvector column을 대조했다.
- 기존 IVFFlat index를 제거하고 `vector(1536)` column을 `vector(768)`로 변경했다.
- `vector_cosine_ops` 기반 IVFFlat index를 다시 생성했다.
- application의 `EMBED_DIM`과 model definition을 768로 통일했다.
- 기존 루틴의 embedding을 다시 생성하는 script와 검색 흐름을 연결했다.
- 개발 중 반복적인 수동 사용에서 1536차원 후보 구성의 대기가 길다고 판단한 경험도 최종 선택에 반영했다.

#### Result

- 모델 출력과 DB vector schema를 768차원으로 통일했다.
- 벡터 차원과 거리 계산 대상 차원을 1536에서 768로 50% 줄였다.
- 루틴 저장과 cosine-distance 기반 top-5 검색이 가능한 조건을 복구했다.
- latency 전후 수치는 측정하지 않았으므로 응답속도 개선율로 표현하지 않는다.

#### Learning

Embedding model은 단순한 외부 API 선택이 아니라 DB column, index, 기존 vector data와 함께 versioning해야 하는 아키텍처 의존성이다. 이후에는 model·dimension을 초기 ADR로 고정하고 변경 시 migration, 재임베딩, 검색 검증을 하나의 배포 계획으로 다룬다.

### star-api-contract — API·DB 계약 불일치와 migration drift

- Delivery: partial
- Ownership: shared
- Verification: verified
- Publication: public-site
- Evidence: commits `b9d0382`, `f88b087`, request/response schema

#### Situation

인증, 감정 분석, RAG, 리포트 기능을 병렬 개발하면서 Frontend payload, Pydantic schema, 내부 module I/O와 DB model이 서로 다른 형태를 기대했다. Schema 변경이 반복되면서 Alembic revision과 실제 Backend model도 어긋났다.

#### Task

전체 사용자 흐름을 막는 interface 불일치를 찾아 API response와 DB migration 상태를 다시 연결해야 했다.

#### Action

- Frontend request부터 Pydantic schema, handler, ORM model과 다음 module 입력까지 데이터를 추적했다.
- `NeedMoreInfoResponse`와 `RagSuccessResponse`를 분리했다.
- `flag`, `can_create_report`, `message`, `card`의 의미와 반환 조건을 맞췄다.
- OpenAPI 문서로 request / response shape를 대조했다.
- 오류가 가리키는 migration code와 현재 model을 비교해 revision과 field format을 맞췄다.
- 촉박한 일정에서 조건부 table 생성과 위험한 자동 생성 revision 제거로 DB 상태를 복구했다.

#### Result

- 입력→분석→검색→추천→리포트 흐름의 데이터 구조를 다시 연결했다.
- 팀원별 계정으로 반복적인 수동 통합 검증을 수행했다.
- 사용자는 본인 기준 약 200회 확인했다고 회고하지만 log로 집계한 수치가 아니므로 공개 성과 수치로 사용하지 않는다.
- 조건부 migration과 revision 삭제는 schema drift를 숨길 수 있어 모범 구현이 아니라 실패·회고 사례로 다룬다.

#### Learning

적용된 revision은 수정·삭제하지 않고 `alembic current / heads / history`로 상태를 확인해야 한다. 이후 명시적인 forward migration을 작성하고 staging에서 `upgrade head`를 재현하는 방식이 안전하다. 기억이 불확실한 HTTP 422는 request validation 문제일 수 있으므로 Alembic 문제와 같은 원인으로 묶지 않는다.

### star-cloud-integration — Cloud Run과 managed data service 연결

- Delivery: implemented
- Ownership: mine
- Verification: self-reported
- Publication: public-site
- Evidence: Docker·배포 설정과 deployment Git history

#### Situation

로컬에서 동작한 FastAPI, PostgreSQL과 Redis 연결이 Cloud Run 환경에서는 container port, environment variable과 private network 차이로 동일하게 동작하지 않았다.

#### Task

Application 오류와 infrastructure 오류를 분리하고 Firebase→Cloud Run→Cloud SQL·Memorystore 흐름을 연결해야 했다.

#### Action

- Cloud Run log에서 container 시작 실패를 확인했다.
- application이 Cloud Run의 `$PORT`를 사용하도록 구성했다.
- local / deploy database URL, Redis URL과 secret을 환경변수로 분리했다.
- Cloud SQL과 Memorystore 연결을 나눠 확인하고 Serverless VPC Connector를 적용했다.
- Firebase origin을 CORS allowlist에 추가하고 migration과 service start 순서를 점검했다.

#### Result

Google 로그인, 사용자 입력, 감정·상황 분석, RAG 검색, 루틴 추천과 리포트 조회를 Cloud 환경에서 연결했다. 반복 가능한 배포 log와 장기 운영 자료는 없어 production-scale 성과로 확대하지 않는다.

#### Learning

Cloud 배포는 container 실행만의 문제가 아니다. runtime, secret, database migration, private network와 frontend origin을 하나의 시스템 경계로 검증해야 한다.

### change-clarifying-question — 정보 부족 시 추가 질문과 후속 입력 재분석

- Delivery: implemented
- Ownership: shared
- Verification: code-verified; recommendation quality unmeasured
- Publication: public-site
- Evidence: `chat_service.py`의 0.7 분기, `chat_message_service.py`의 입력 병합과 `run_full_rag` 호출

#### Situation

첫 입력에 감정·상황 단서가 부족하거나 후속 입력에서 중요한 사건이 드러나면 처음 입력만으로 추천을 구성하기 어려웠다.

#### Action

- confidence 또는 clarity가 0.7 미만이면 추가 질문을 반환한다.
- 후속 요청의 첫 입력과 최신 입력을 합쳐 감정·상황을 다시 분석하고 새 요약으로 루틴을 검색한다.

#### Result and limitation

정보가 부족할 때 질문을 돌려주고 후속 입력을 반영해 추천을 다시 구성하는 코드 경로를 만들었다. 별도 키워드 변화 감지 규칙과 관련성 평가셋은 없어 추천 품질 개선율을 주장하지 않는다.

## Technical decisions

### PostgreSQL + pgvector

- Context: 사용자·세션·루틴·리포트는 관계형 데이터이고 루틴 검색에는 vector 연산이 필요했다.
- Alternatives: 별도 vector database 추가.
- Decision: PostgreSQL에 pgvector extension을 사용했다.
- Why: 프로젝트 규모에서 관계형 데이터와 embedding을 한 DB에서 관리해 운영 구성요소를 줄일 수 있었다.
- Trade-off: vector workload가 커지면 독립 확장과 검색 기능에 한계가 생길 수 있다.
- Outcome: cosine distance와 IVFFlat index로 310개 루틴을 검색했다.

### Redis session state

- Context: 대화 중 message, 분석 결과와 summary 위치가 자주 변경됐다.
- Decision: 영속 결과는 PostgreSQL, 진행 중 상태는 Redis에 분리했다.
- Why: 요청 사이에서 session context를 빠르게 읽고 갱신하기 위해서다.
- Trade-off: TTL·종료 삭제와 DB 불일치 복구 규칙이 빠졌다.

### Information sufficiency gate

- Context: 감정·상황이 불명확한 입력에 바로 행동을 추천하면 관련성이 낮아질 수 있다.
- Decision: confidence 또는 clarity가 0.7 미만이면 추가 질문을 반환했다.
- Follow-up: 첫 입력과 후속 입력을 합쳐 다시 분석하고 새 요약으로 검색한다. 중요한 사건의 변화는 별도 키워드 규칙이 아니라 이 재분석 경로로 반영한다.
- Trade-off: 고정 threshold의 적절성을 별도 dataset으로 평가하지 않았다.

### Serverless deployment

- Context: 고정 트래픽이 없는 학기 프로젝트였다.
- Decision: Dockerized FastAPI를 Cloud Run에 배포했다.
- Why: VM 운영 없이 container 단위로 배포하기 위해서다.
- Trade-off: in-process APScheduler는 scale-to-zero에서 누락되고 다중 instance에서 중복 실행될 수 있다.

## Verification

- 코드와 Git으로 핵심 RAG, auth, migration, deployment 구현을 확인했다.
- 현재 JSONL에서 문서·루틴·고유 ID 수를 확인했다.
- 팀원별 계정으로 서비스 흐름을 수동 확인했다.
- formal latency benchmark, retrieval relevance dataset과 자동 E2E test는 없다.
- 위기 표현 입력에서 자살예방센터 안내 또는 답변 회피를 관찰했다는 사용자 회고가 있다.
- 현재 source에서는 명시적 위기 탐지·센터 연결 rule을 찾지 못했으므로 안전 기능의 완전성을 주장하지 않는다.

## Limitations

- retrieval distance threshold와 metadata filter가 없다.
- 대표 루틴을 top-5 중 첫 결과로 선택한다.
- Redis session key에 TTL과 명시적 종료 삭제가 없다.
- scheduler에 persistent job store와 distributed lock이 없다.
- 자동화 회귀 test가 부족하고 일부 smoke script가 현재 response와 맞지 않는다.
- prompt의 비진단·비치료 지침 외에 명시적인 crisis flow가 확인되지 않는다.
- JWT server-side revoke / blacklist가 없다.
- 보안 log와 secret 관리 상태는 공개 전 별도 정리가 필요하다.
- Image / Voice 분석, 장기 운영, 부하·복구·고가용성 검증은 완료하지 않았다.

## Publication rules

### May state

- Team Lead로 아키텍처 초안, Backend, RAG와 Cloud 배포를 담당했다.
- 133개 문서에서 생성한 루틴 310건을 RAG 검색에 사용했다.
- `text-embedding-004` 768차원과 pgvector cosine search를 사용했다.
- Google OAuth 기반 identity 확인과 service JWT 인증을 연결했다.
- Redis와 PostgreSQL의 상태 역할을 분리했다.
- Cloud Run, Cloud SQL, Memorystore와 Firebase를 연결했다.

### Must not state

- 약 400건 또는 APA 기반 데이터
- 측정하지 않은 latency·정확도·개선율
- APScheduler와 Weekly Report 생성 logic을 개인이 구현했다는 주장
- 완성된 multimodal service
- 위기 대응 신뢰성 검증 완료
- 대규모 사용자·production-scale·고가용성 운영

## Open questions

- [ ] 루틴 검수 시 실제로 확인한 항목을 정리한다.
- [ ] 정상·부적절 retrieval query 사례를 각각 2~3개 확보한다.
- [ ] 위기 대응 prompt 또는 당시 화면 자료가 남아 있는지 확인한다.
- [ ] Cloud 배포 log, E2E 영상 또는 발표 자료의 공개 가능 여부를 확인한다.
- [ ] 전시·수상·사용자 feedback 근거가 있는지 확인한다.
