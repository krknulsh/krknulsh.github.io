# Portfolio Renewal Plan

작성일: 2026-09-11
상태: 2026-09-11에 작성한 초기 계획. 아래 결정 중 현재 v3와 다른 항목은 다음 현행 메모를 우선한다.

## 현행 메모 (2026-09-26)

- 공개 사이트는 Backend Engineer 포트폴리오 v3로 변경됐다. Hero 소개는 기술 나열 대신 어떤 엔지니어를 지향하는지 한 문장으로 말하고, 프로젝트 섹션 제목은 `Projects`다.
- 프로젝트마다 네 사례를 제목 → 전체 아키텍처 도식 → 문제·원인 또는 개선 배경 → 해결 과정 → 결과·확인 근거·한계로 보여준다. 앱 화면과 설명은 프로젝트 섹션에 넣지 않는다.
- 다:서의 My Page API와 router 분리는 장애 대응이 아닌 후속 구조 개선이다. AI Mental Care의 후속 입력은 첫 입력과 합쳐 재분석하며, 별도 키워드 변화 감지 규칙은 확인되지 않는다.
- 현재 저장소의 최신 프로젝트별 사실 기록은 `docs/projects/daseo.md`와 `docs/projects/ai-mental-care.md`다. `PROJECT_DATA.md`는 legacy 기록으로 유지한다. 계획했던 별도 private 사실 원장 저장소는 현재 작업 공간에서 확인되지 않았다.
- 본 문서에 남은 초기 화면 이미지·2열 카드·요약만 노출하는 지침은 역사적 계획이며 현행 UI 정책은 `PORTFOLIO_MASTER.md`를 따른다. 기존 사용자가 추가한 작성 원칙은 유지한다.

## 1. 결정 요약

1. 개인 프로필 사진과 Hero 우측 미디어 영역을 완전히 제거한다.
2. 프로젝트 화면 이미지는 구현 증거이므로 유지한다.
3. STAR는 글의 뼈대로 사용하되 화면에 `Situation / Task / Action / Result`라는 레이블을 그대로 노출하지 않는다.
4. 메인 포트폴리오는 30~60초 요약, GitHub README는 상세 기술 사례, 저장소의 원본 문서는 사실과 근거를 보존하는 역할로 나눈다.
5. SQLite, CMS, 벡터 DB는 도입하지 않는다. 별도 private 저장소의 프로젝트별 Markdown을 사실 원장으로 사용한다.
6. LLM은 처음부터 완성 문장을 만들지 않는다. 사실 확인, 누락 질문, 구조화, 부분 작성, 주장 감사, 표현 감사 순서로 사용한다.
7. 확인하지 못한 사실은 자연스러운 문장으로 메우지 않고 `[확인 필요]`로 남긴다.
8. 주 지원 직무는 Backend Engineer로 정한다.
9. 전화번호는 공개 포트폴리오에서 제거한다.

## 2. 현재 상태에서 확인된 문제

### 2.1 사진 파일은 없지만 사진 영역은 남아 있다

- `src/data/profile.ts`의 `profileImage`는 이미 `null`이다.
- 현재 `public/assets/profile`에는 사진 파일이 없다.
- 그러나 `src/sections/Hero/Hero.tsx`는 사진이 없을 때 큰 placeholder를 렌더링한다.
- `src/styles.css`도 Hero를 사진 영역이 있는 2열로 유지한다.
- README와 체크리스트는 앞으로 프로필 사진을 다시 넣는 방법을 안내한다.

구현 단계의 최소 변경 범위:

- `Hero.tsx`: 이미지 상태, 이미지 분기, placeholder 삭제
- `portfolio.ts`: `Profile.profileImage` 삭제
- `profile.ts`: `profileImage` 값 삭제
- `styles.css`: Hero 이미지 전용 규칙과 2열 규칙 삭제
- `README.md`, `PORTFOLIO_MASTER.md`, `NEEDED_FROM_USER.md`, `ASSET_CHECKLIST.md`: 프로필 사진 요구와 교체 안내 삭제

Hero 자체와 `about` 앵커는 유지한다. 이름, 직무 방향, 핵심 근거를 보여주는 텍스트 Hero로 바꾼다.

### 2.2 콘텐츠 원본이 둘이다

- `docs/PROJECT_DATA.md`는 자신을 Single Source of Truth로 선언한다.
- 실제 사이트는 `src/data/*.ts`만 읽는다.
- README는 `src/data`를 콘텐츠 관리 위치로 안내한다.

앞으로는 보안 경계와 역할을 먼저 나눈다.

- 별도 private 저장소: 프로젝트 원자 사실, STAR, 근거, 지원 회사 문서의 유일한 원본
- 현재 public 포트폴리오 저장소의 `src/data/*.ts`: 사용자 승인 후 공개한 사이트 문구
- 각 프로젝트의 GitHub README: 사용자 승인 후 공개한 상세 기술 사례
- `docs/PORTFOLIO_MASTER.md`: 화면 및 편집 정책

`private`, `interview-only` 같은 라벨은 공개 저장소에서 접근 제어가 되지 않는다. 비공개 원본과 증거는 물리적으로 private 저장소에 둔다. 현재 `PROJECT_DATA.md`는 이관이 검증될 때까지 legacy 원본으로 보존한다.

초기에는 자동 생성기를 만들지 않는다. private 원본의 `public_card`와 `src/data`를 같은 변경에서 동기화하고, 실제 내용 불일치가 다시 발생할 때만 생성 또는 검증 스크립트를 추가한다.

### 2.3 현재 글은 상세하지만 주장 근거가 약하다

`PROJECT_DATA.md`에는 배경, 시스템 구조, 기술 선택, 트러블슈팅, 한계가 이미 충분히 들어 있다. 더 긴 설명부터 추가할 필요는 없다. 다음 네 가지를 먼저 보강한다.

1. 내가 직접 한 일과 팀이 한 일의 경계
2. 당시 성공 조건과 제약
3. 수정 전후를 확인한 방법과 조건
4. 주장과 연결되는 코드, 로그, 문서, 화면, 수상 자료

### 2.4 반복되는 문장 골격이 많다

현재 `PROJECT_DATA.md` 단순 문자열 집계:

- `기반`: 50회
- `연결`: 26회
- `구성했다`: 9회
- `구현했다`: 7회
- `확인했다`: 5회
- `경험했다`: 5회

기술 용어의 반복은 정확성을 위해 허용한다. 문제는 모든 문장이 `기반으로 구성했다`, `연결했다`, `정상 동작을 확인했다`로 끝나는 것이다. 유의어로 기계적으로 바꾸지 않고 관찰, 판단, 변경, 검증, 영향 중 문장의 실제 역할을 명확히 쓴다.

## 3. 포트폴리오 정보 구조

### 3.1 Hero / About

목표: 5~10초 안에 지원 직무와 대표 근거를 이해시킨다.

포함:

- 이름
- 목표 직무 한 가지
- 문제 해결 방식이 드러나는 소개 1~2문장
- 대표 근거 2~3개
- GitHub, 이메일, 이력서 링크. 전화번호는 표시하지 않는다.

제외:

- 개인 사진과 대체 이미지
- 기술 이름만 나열한 긴 목록
- `열정`, `성장`, `끊임없이`, `도전하는` 같은 자기평가

주 지원 방향은 Backend Engineer로 확정했다. Hero와 프로젝트 요약은 API·데이터 모델·인증·상태 관리·배포 문제를 어떻게 판단하고 해결했는지를 중심으로 작성한다. Frontend 경험은 전체 흐름을 연결한 근거로만 사용한다.

### 3.2 Projects

프로젝트 카드는 다음 내용만 남긴다.

1. 프로젝트와 검증된 결과 한 줄
2. 문제와 제약 한 문장
3. 개인 행동 최대 두 개
4. 검증된 결과 한 개

역할, 기간, 팀 규모, 핵심 기술, GitHub 링크는 짧은 보조 정보로 표시한다.

각 프로젝트에는 대표 문제 해결 사례 하나만 노출한다. 모든 트러블슈팅을 카드에 넣지 않는다.

### 3.3 Skills

기술 목록만 보여주지 않고 실제 프로젝트 근거와 연결한다.

예:

- `PostgreSQL / pgvector` — 행동 루틴 저장과 Vector Search
- `Redis` — 대화 세션의 임시 상태 관리
- `GCP Cloud Run` — 컨테이너 배포와 Private Network 연결

기술별 숙련도 퍼센트와 별점은 사용하지 않는다.

### 3.4 Research Experience / Certification / Contact

- 연구 경험도 짧은 STAR 사례로 정리한다.
- 자격은 취득이 확정된 항목만 표시한다.
- Contact에는 공개가 필요한 최소 정보만 둔다.
- 현재 전화번호가 공개 번들에 포함되므로 구현 단계에서 데이터와 화면에서 제거한다.

## 4. STAR 작성 설계

STAR는 정보 구조로 사용하고, 공개 화면에서는 자연스러운 기술 사례의 제목으로 바꾼다.

| 원천 필드 | 공개 제목 | 기록할 내용 |
|---|---|---|
| Situation | 문제와 제약 | 사용자 문제, 기술 환경, 증상, 영향, 당시 규모 |
| Task | 내 책임과 성공 조건 | 개인 소유 범위, 팀 경계, 목표, 시간·기술 제약 |
| Action | 판단과 구현 | 조사 순서, 대안, 선택 기준, 구현, 검증 방법 |
| Result | 검증된 결과 | 전후 변화, 측정 환경·표본·기간, 근거, 남은 한계 |

분량 비율은 고정하지 않는다. 다만 `무엇을 사용했다`보다 `무엇을 보고, 어떤 대안을 비교하고, 왜 선택하고, 어떻게 검증했는지`가 충분히 드러나야 한다.

기존 트러블슈팅 구조는 버리지 않는다.

```text
Problem → Symptom → Investigation → Root Cause → Solution → Result → Learning
```

이 구조 전체를 STAR의 Action과 Result를 뒷받침하는 기술 기록으로 사용한다.

### 좋은 문장의 기준

약한 문장:

> Redis를 활용해 효율적으로 세션을 관리했습니다.

필요한 정보가 갖춰진 문장:

> 요청마다 바뀌는 대화 상태와 영구 보관할 리포트를 분리했다. 세션 상태에는 `{키 구조}`, `{TTL}`, `{복구 방식}`을 적용했고, PostgreSQL에는 세션 종료 후 확정된 결과만 저장했다.

두 번째 문장은 예시 구조일 뿐이다. 중괄호 값은 실제 자료로 확인하기 전에는 작성하지 않는다.

## 5. 기술 상세 수준

상세한 기술 설명은 포트폴리오에 적합하다. 단, 모든 정보를 첫 화면에 넣으면 핵심이 묻힌다.

| 계층 | 독자와 시간 | 내용 |
|---|---|---|
| 메인 포트폴리오 | 채용 담당자, 30~60초 | 문제, 내 역할, 핵심 Action, 검증된 Result |
| GitHub README / Case Study | 개발자·면접관, 3~7분 | 아키텍처, 데이터 흐름, 기술 결정, 대표 트러블슈팅, 검증, 한계 |
| 원본 Markdown | 본인과 LLM | 원자적 사실, 모든 STAR 사례, 주장 상태, 근거, 공개 제한, 미확인 질문 |

현재 앱에는 이미 `detail` 필드가 있다. 1차 리뉴얼에서는 별도 라우터와 상세 페이지를 만들지 않고 GitHub README의 상세 섹션으로 연결한다. 방문자 행동이나 콘텐츠 요구가 확인될 때만 사이트 내부 상세 페이지를 추가한다.

## 6. 저장 형식 설계

### 6.1 결정

별도 private Git 저장소에서 프로젝트별 Markdown과 짧은 YAML frontmatter를 사용한다.

- 사람과 LLM이 모두 읽기 쉽다.
- Git diff로 사실이 언제 바뀌었는지 확인할 수 있다.
- 장문 맥락, 표, 코드, 링크, 회고를 한 파일에 보존할 수 있다.
- 현재 프로젝트 수에서 SQLite의 질의·마이그레이션·도구 비용은 이점보다 크다.

논리적 목표 구조:

```text
career-context-private/       # private Git 저장소
├── AGENTS.md
├── profile.md
├── style.md
├── projects/
│   ├── ai-mental-care.md
│   └── multi-llm-resume-generator.md
├── applications/
│   └── 2026/
│       └── company-backend.md
└── evidence/                 # 공개할 수 없는 원본은 이 저장소에서만 관리

portfolio/                    # 현재 public GitHub Pages 저장소
├── AGENTS.md                 # 공개 안전성과 동기화 규칙만 포함
├── docs/PORTFOLIO_MASTER.md
└── src/data/*.ts             # 승인된 공개 화면 문구
```

지원 회사, 채용 공고 원문, 자소서 초안, 공개하지 않을 로그와 화면은 현재 포트폴리오 저장소에 커밋하지 않는다. private 애플리케이션 문서는 프로젝트 내용을 복사하지 않고 `project-id/story-id`만 참조한다.

### 6.2 프로젝트 파일 최소 스키마

```md
---
id: ai-mental-care
title: AI Mental Care
period: 2025-09..2025-12
team_size: 6
public_card:
  approved: false
  summary:
  roles: []
  skills: []
  result:
  repository:
---

# AI Mental Care

## Scope

- 목표:
- 사용자와 문제:
- 제약:
- 내가 소유한 영역:
- 팀이 소유한 영역:

## Project context, architecture and flow

- 시스템 경계:
- 주요 데이터 흐름:
- 당시 제약:

## STAR stories

### star-api-contract — API Contract 불일치

- Delivery: implemented
- Ownership: mine
- Verification: self-reported
- Publication: public-site
- Evidence: missing

#### Situation

#### Task

#### Action

#### Result

- 관찰된 변화:
- 비교 기준:
- 측정 방법:
- 환경 / 표본 / 기간:
- 근거:
- 한계:

#### Learning

## Limitations

- 완료하지 못한 범위:
- 검증하지 않은 규모:

## Technical decisions

### PostgreSQL + pgvector 선택

- Context:
- Constraints:
- Alternatives:
- Decision:
- Why:
- Trade-off:
- Outcome:
- Evidence:

## Open questions

- [ ] 확인이 필요한 질문
```

허용값:

- `delivery`: `implemented`, `partial`, `planned`, `considered`
- `ownership`: `mine`, `shared`, `team`
- `verification`: `verified`, `self-reported`, `missing`
- `publication`: `public-site`, `public-readme`, `interview-only`, `private`

`delivery`, `ownership`, `verification`, `publication`은 서로 다른 축이다. 구현됐다는 사실만으로 내가 구현했다는 뜻은 아니며, 내가 구현했다는 기억만으로 공개 가능한 증거가 있다는 뜻도 아니다. 근거는 STAR 또는 기술 결정 바로 아래에 파일 경로나 URL로 붙인다. 같은 근거를 여러 story가 참조하기 시작할 때만 별도 evidence ID를 만든다.

### 6.3 기존 문서 이관 규칙

AI Mental Care 하나만 새 형식으로 먼저 변환하고 사용자가 사실·누락·공개 범위를 확인한다. 형식이 유효하다고 확인한 뒤 두 번째 프로젝트를 옮긴다. 검증이 끝나기 전에는 기존 파일을 삭제하지 않는다.

| 기존 섹션 | 새 위치 |
|---|---|
| Metadata | frontmatter와 Scope |
| Background | STAR Situation 또는 Project context |
| System Design, Data Sources, Flow, User Flow | Architecture and flow |
| My Contribution | Scope의 소유 경계와 STAR Task/Action |
| Implemented Features, Technology Stack | story 상태와 `public_card` |
| Technical Decisions | Technical decisions |
| Troubleshooting | STAR stories와 상세 진단 기록 |
| Technical Result, Exhibition, Award | STAR Result와 근거 |
| Planned, Limitations | story 상태와 Limitations |
| Representation Rules | private `AGENTS.md`의 공개 규칙 |

문서별 처리:

- `PROJECT_DATA.md`: 두 프로젝트 이관과 사용자 승인 후 legacy 역할 종료
- `CODEX_INSTRUCTIONS.md`: 구현 규칙은 public `AGENTS.md` 또는 `PORTFOLIO_MASTER.md`에 병합
- `NEEDED_FROM_USER.md`: 미확인 항목을 각 프로젝트의 Open questions로 이관
- `ASSET_CHECKLIST.md`: 실제 공개 자산 체크리스트만 남기고 프로필 사진 항목 삭제

### 6.4 지원 회사 파일 최소 스키마

고정 위치는 private 저장소의 `applications/<year>/<company>-<role>.md`로 한다.

```md
---
company: Company
role: Backend Engineer
captured_at: 2026-09-11
source: https://...
---

## Requirement mapping

| 채용 요구 | 사용할 project/story | 근거 | 공백 |
|---|---|---|---|

## Writing constraints

- 문항:
- 글자 수:
- 강조할 역량:
- 제외할 내용:
```

### 6.5 Codex가 맥락을 읽는 방법

private 저장소의 루트 `AGENTS.md`에는 내용을 복사하지 않고 다음 규칙만 둔다.

1. 포트폴리오나 자소서를 작성하기 전에 `profile.md`, `style.md`, 관련 프로젝트 파일을 읽는다.
2. 지원 회사별 문서가 있으면 해당 문서가 참조한 story만 읽는다.
3. `partial`은 한계와 함께 쓰고, `planned`와 `considered`는 완료 성과로 쓰지 않는다.
4. `team` 또는 `shared`를 개인 단독 성과로 바꾸지 않는다.
5. `interview-only`와 `private`를 공개 산출물에 쓰지 않는다.
6. 원본에 없는 수치와 인과관계를 추정하지 않는다.
7. 빈 정보는 `[확인 필요: 질문]`으로 반환한다.
8. 초안 전에 주장과 근거의 대응표를 만들고 story와 근거 경로가 실제로 존재하는지 확인한다.
9. 생성한 문장을 사용자 확인 없이 사실 원장에 역기록하지 않는다.
10. 채용 담당자와 면접관이 내부 맥락을 모른다고 가정한다. 프로젝트 고유 명칭, 모델명, 약어는 역할과 효과를 먼저 풀어 쓰고, 판단에 필요하지 않은 세부 제품명은 생략한다.

Codex는 작업을 시작한 저장소 범위의 `AGENTS.md`를 읽는다. 따라서 이 자동 규칙은 private career-context 저장소에서 시작한 Codex 작업에만 적용된다. 다른 저장소나 일반 대화에서는 private 원본을 명시적으로 열어야 한다. 프로젝트의 긴 사실을 `AGENTS.md` 자체에 넣지 않는다.

현재 public 포트폴리오 저장소의 `AGENTS.md`에는 다음 완료 조건만 둔다.

- private 원본에서 `public-site`로 승인된 내용만 복사한다.
- `public_card`와 `src/data`를 같은 변경에서 동기화한다.
- `partial`, 팀 소유, 미확인 근거를 과장하지 않는다.
- 공개 저장소에 비공개 원본이나 증거를 추가하지 않는다.

별도 portfolio-writer skill이나 RAG는 아직 만들지 않는다. 같은 수동 절차가 반복되고 AGENTS 규칙만으로 부족하다는 증거가 생길 때 추가한다.

## 7. LLM 문체 반복 방지

### 7.1 핵심 원칙

금칙어 목록만으로는 부족하다. 관련 연구는 LLM 보조 글에서 균질화가 생길 수 있고 사람의 후편집만으로 흔적이 모두 사라지지 않을 수 있음을 보여준다. 아래 절차는 그 연구가 효과를 직접 검증한 해법이 아니라, 이번 리뉴얼에서 적용하고 결과를 검토할 편집 정책이다.

1. 사실 잠금: 사용자가 문장보다 메모, 수치, 로그, 당시 판단을 제공한다.
2. 인터뷰: LLM은 초안을 쓰지 않고 논리 공백만 질문한다.
3. 구조화: 잠긴 사실을 STAR와 주장-근거 관계에 배치한다.
4. 부분 작성: 섹션 하나씩 작성한다.
5. 주장 감사: 각 문장이 원본의 어느 사실을 쓰는지 확인한다.
6. 표현 감사: 전체 포트폴리오에서 반복되는 2~5어절과 문장 시작을 찾는다.
7. 사람 최종 편집: 실제로 본인이 쓰지 않을 표현을 삭제한다.

전체 문서를 다시 생성하지 않고 문제가 있는 문장만 수정한다. 자동 유의어 치환은 사실의 정확성과 문체를 해칠 수 있어 초기 정책에서는 사용하지 않는다.

### 7.2 style.md에 저장할 내용

- 본인이 직접 쓴 좋은 문단 3~5개
- 원하는 말투와 문장 길이
- 쓰지 않을 자기평가와 상투어
- 프로젝트 고유 용어와 정확한 표기
- 동일 접속어, 문장 시작, 핵심 동사의 반복 기준
- `내 역할`과 `팀 결과`를 분리하는 규칙
- 정보가 없을 때 질문으로 돌려보내는 규칙

초기 감시 표현:

- 이를 통해
- 또한
- 특히
- 결과적으로
- 효율적으로
- 체계적으로
- 유의미한
- 크게 개선
- 기여했습니다
- 단순히 ~를 넘어

이 목록은 영구 금칙어가 아니다. 반복되거나 구체적 사실을 대신할 때만 삭제한다.

### 7.3 품질 게이트

- 성능, 개선 폭, 처리 규모를 주장하는 수치는 기준값, 단위, 측정 도구, 환경, 표본 또는 기간을 갖는다. 팀 규모와 날짜 같은 메타데이터는 해당하지 않는다.
- 내 행동과 팀의 결과가 분리된다.
- 핵심 기술 결정마다 대안, 선택 기준, 트레이드오프가 있다.
- `개선`, `최적화`, `기여`에는 실제 변화와 검증 방법이 붙는다.
- 결과가 없으면 성공처럼 포장하지 않고 관찰 또는 한계로 기록한다.
- 첫 화면에서 문제, 역할, 결과를 빠르게 찾을 수 있다.
- 반복 표현은 유의어 치환보다 삭제 또는 구체화한다.
- LLM이 원본에 없던 사실과 인과관계를 추가하지 않는다.

## 8. 프로젝트별 논리 공백과 필요한 자료

### 8.1 AI Mental Care

README와 원본 코드·Git으로 확인 완료:

- 6명 팀의 Team Lead, 3개월 프로젝트
- 개인 책임 범위: System Architecture, Backend Logic, RAG Pipeline, Cloud Deployment
- Gemini 2.5 Flash / Pro 역할 분리
- `text-embedding-004`, 768차원, cosine distance, IVFFlat, top-5 검색
- 기존 `vector(1536)`에서 `vector(768)`로 Alembic migration 및 재임베딩
- access token 30분, refresh token 7일; Web `localStorage`, Native SecureStore
- `NeedMoreInfoResponse` / `RagSuccessResponse` 및 핵심 response field
- Cloud Run `$PORT`, Cloud SQL / Memorystore private network, VPC Connector, CORS, migration start order
- 정규화 문서 133건, 생성 루틴 310건, 루틴 생성에 반영된 원본 문서 121건
- 현재 데이터의 11개 출처 도메인과 모든 routine의 source URL·steps·safety note·1~10분 duration
- 사용자 직접 작성 범위: RAG·inference·compose·embedding service, auth/security, routine 생성·embedding script
- Chat service와 주 Chat 화면은 공동 작업, scheduler와 weekly report 생성은 다른 팀원 작업
- Redis 실제 key 구조가 있으나 session TTL·종료 삭제는 없음
- 매주 월요일 00:05(KST) in-process APScheduler 실행이며 persistent job store와 분산 lock은 없음
- 비임상적 자기관리 서비스라는 공개 범위와 현재 운영 인스턴스 부재
- 자동화 회귀 테스트와 위기 표현 대응 flow가 충분하지 않다는 한계

사용자 답변으로 추가 확인:

- 최종 루틴 수는 310건이며 사용자가 직접 검수했다.
- 일정이 촉박해 명시적인 제외 기준과 중복 검사는 만들지 못했다. 1차 목표는 RAG용 vector DB 구축이었다.
- 768·1536차원 혼용을 먼저 1536으로 맞춘 뒤, 수동 사용에서 응답이 느리다고 판단해 최종 768차원으로 변경했다.
- latency는 측정하지 않았으므로 정량 성능 개선으로 쓰지 않는다.
- schema를 충분히 고정하지 않아 model과 Alembic revision 변경이 반복됐고 version 충돌 대응이 어려웠다.
- 팀원별 계정으로 확인했으며 사용자는 개발 중 약 200회의 수동 검증을 했다고 회고했다. log 기반 수치는 아니다.
- 위기 표현에서 자살예방센터 안내 또는 답변 회피를 관찰했고 수동 확인 중 이탈은 없었다. 다만 현재 code에서 명시적인 위기 대응 rule을 찾지 못해 구현 완료로 단정하지 않는다.
- 프로젝트 기간은 2025.09~2025.12로 확정한다.

아직 필요한 정보:

1. `검색 품질`: 기억나는 정상 query와 부적절한 추천 query를 각각 2~3개 제공한다. 없다면 품질 검증 미완료로 확정한다.
2. `Alembic 재현`: 기억나는 command, revision ID, `multiple heads`·`can't locate revision` 같은 실제 문구가 있으면 제공한다. 기억나지 않으면 Git diff 기반 회고 사례로 제한한다.
3. `GCP 타임라인`: Cloud Run / Cloud SQL / Redis 중 본인이 직접 해결한 장애 하나와 확인 순서를 선택한다.
4. `수동 E2E 범위`: 200회에 포함된 대표 flow와 마지막 확인 시점, 팀원 계정 수, 영상·발표 자료 유무를 알려준다.
5. `안전 prompt 위치`: 자살예방센터 안내 문구를 넣었던 파일·prompt 또는 화면 캡처가 남아 있는지 확인한다.
6. `운영 설정`: Cloud Run min instance와 scheduler 실행 기록의 유무를 확인한다.
7. `성과`: 전시·발표·교수 피드백과 공개 가능한 증거가 있는지 알려준다.

첨부하면 좋은 자료:

- 담당 파일 또는 대표 commit/PR 링크
- 아키텍처와 데이터 흐름도
- 실제 Request/Response 예시
- 오류 로그와 수정 전후 schema diff
- Embedding 재생성 명령 또는 migration 기록
- Vector Search 테스트 질의와 결과 표
- E2E 체크리스트 또는 짧은 실행 영상
- Cloud 설정 화면과 배포 로그
- 데이터 정제·생성·사람 검수 기준과 제외 샘플
- latency, 비용, 성공률이 있다면 측정 원본

### 8.2 Multi-LLM 자기소개서 시스템

README와 원본 코드·Git으로 확인 완료:

- 기간: 2025.03~2025.11
- 주 역할: Frontend Development
- 공개된 개인 기여: Google Login, My Page, Backend Authentication Refactoring
- React 19.1 / React Router / Axios, FastAPI 0.115 / SQLAlchemy Async / Alembic / PostgreSQL
- HyperCLOVA X 생성, GPT-4o-mini·Gemini 2.0 Flash·Claude 3 Haiku 역할별 피드백
- 모델 역할: GPT는 논리·구조, Gemini는 창의성·구체성, Claude는 문맥·자연스러움·맞춤법
- 사용자 Backend 기여: My Page API 계약 안정화, refresh token·logout·session expiry, 2026년 Perplexity 복원
- My Page에서 create/update/output schema 분리, response model·ownership filter·`db.refresh` 적용, 빈 목록을 `200 []`로 정렬
- 초기 `/auth/login` route는 존재했지만 callback이 Google user info 출력에서 끝나 local user 저장과 service JWT 발급이 빠진 미완성 상태였음
- 다른 팀원 명의 commit에서 최종 callback 구현이 확인되며, 사용자는 같은 원인을 독립적으로 분석·수정하고 팀원과 교차 검증했다고 회고함
- 공개 문구는 `handler 신규 구현`이 아니라 `Google token과 service JWT의 역할 혼동으로 끊긴 인증 chain 진단·해결 참여`로 제한
- 세 feedback 모델은 병렬이 아니라 순차 호출되며, 모델 실패 text가 정상 feedback처럼 저장되는 한계
- Perplexity는 2026년 후속 복원이며 회사명·직무명만 전송하고 citation을 포함
- 모델별 prompt 실험과 정량 평가는 미완료였다는 한계
- 프로젝트 기간은 2025.03~2025.11로 확정
- 프로젝트 이후 큰 Frontend / Backend router 파일을 기능별 module로 분리

코드로 확인할 수 없어 사용자에게 필요한 정보:

1. `역할 경계`: 팀 5명·Frontend 2명 / Backend 3명이 맞는지, My Page·login·API client 공동 작업에서 본인이 설계하거나 최종 결정한 부분을 구분한다. Git alias나 pair programming이 있으면 알려준다.
2. `초기 login 소유권`: 문제와 진단은 코드·사용자 회고로 확인됐다. 최종 callback commit은 다른 팀원 명의이므로 pair work, 독립 수정안 공유, 최종 merge 경위를 더 기억하면 기록한다. 추가 증거가 없어도 공동 진단 사례로는 사용할 수 있다.
3. `My Page 후속 개선`: 장애 증상으로 재구성하지 않는다. schema·응답·ownership 변경의 근거만 기록하고 사용자 경험 효과는 측정 자료가 있을 때만 보강한다.
4. `인증 검증`: access 30분·refresh 7일을 왜 선택했는지, browser에서 refresh cookie와 `/auth/refresh`가 실제 동작했는지, 검증했다면 요청·응답이나 영상이 필요하다.
5. `Frontend 설계 판단`: 상태 관리, API client 공통화, error/loading 처리, route 보호에서 검토한 대안과 선택 이유를 설명한다.
6. `모델 선택`: 동일 prompt로 비교한 모델·시점·한국어 품질 기준, 비용·latency 기록이 있었는지 알려준다. 없으면 HyperCLOVA X 선택은 정성 판단으로만 쓴다.
7. `평가 prompt`: 세 모델의 역할을 정한 근거와 동일 자기소개서에 나온 서로 다른 feedback의 익명화 예시 한 세트를 제공한다.
8. `Human-in-the-loop 검증`: 계정 수, 문항 수, 반복 횟수, 한 모델 실패 시 UI, 저장까지 완료한 시나리오와 증거를 알려준다.
9. `데이터 보호`: 외부 모델별 전송 field, log·DB 보관 및 삭제 방식, secret 관리, 민감정보 masking 여부를 알려준다.
10. `Perplexity 시점`: 2026년 복원이 원래 2025년 기능의 복구인지 신규 추가인지, citation을 UI에도 노출했는지, 잘못된 기업 정보를 검증한 방식이 있는지 답한다.
11. `리팩토링 증거`: 큰 router 파일의 code와 기능을 새 파일로 분리한 작업이다. runtime load 분산으로 쓰지 않고, 원본·refactored 파일 대응표와 변경량을 확인한다.
12. `결과`: 출품·장려상 날짜와 상장·사진·행사 페이지 중 공개 가능한 증거를 제공한다.

첨부하면 좋은 자료:

- 담당 commit/PR과 화면별 소유 표
- 사용자 flow와 주요 화면 캡처
- API 명세와 실패 응답
- 모델 비교표와 익명화한 입력/출력 샘플
- prompt 버전과 평가 기준
- latency, token, API 비용 기록
- 통합 테스트 체크리스트 또는 영상
- 행사 페이지, 상장, 전시 사진

### 8.3 연구실 경험

필요한 자료:

- NeuroScaler 논문 링크와 발표 자료
- 발표 시간, 청중, 받은 질문과 답변
- ns-3 시나리오 파일 또는 핵심 설정
- 노드 수, 트래픽 종류, 측정 항목, 실행 결과
- 단순 실습인지 논문 구조 재현인지 정확한 범위

현재 설명은 활동 목록에 가까우므로, 한 가지 관찰 또는 판단이 드러나는 사례를 골라 짧은 STAR로 만든다.

## 9. 추가할 요구사항

1. 지원 직무 우선순위: 한 포트폴리오가 모든 개발 직무를 동시에 주장하지 않게 한다.
2. 주장 추적성: 공개 문장마다 원본 claim과 evidence를 찾을 수 있어야 한다.
3. 개인/팀 경계: `내가 구현`, `공동 구현`, `팀 시스템에 존재`를 구분한다.
4. 공개 범위: 전화번호, 개인 데이터, API key, 비공개 저장소, 사용자 입력을 점검한다.
5. 접근성: 키보드 탐색, 대비, 대체 텍스트, reduced motion을 유지한다.
6. 링크 신뢰성: GitHub, README section, Demo, 수상 근거의 broken link를 검사한다.
7. 검증 일자: 시간이 지나 바뀔 수 있는 링크와 서비스 상태에는 마지막 확인 날짜를 남긴다.
8. 실패와 한계: 미완료 기능과 운영하지 않은 규모를 명시한다.

## 10. 실행 순서

### Phase 0 — 방향 확정

- [x] 주 지원 직무: Backend Engineer
- [x] 개인 사진 영역 제거, 프로젝트 이미지 유지
- [x] 전화번호 비공개. GitHub와 이메일은 유지

### Phase 1 — 원본 정리

- private career-context 저장소와 최소 구조 확정
- AI Mental Care만 새 Markdown 형식으로 시험 이관
- `profile.md`, `style.md`, private `AGENTS.md` 작성
- 현재 public 저장소에는 공개 안전 규칙을 담은 짧은 `AGENTS.md` 작성
- 기존 문서와 `src/data`의 충돌 목록 정리
- 사용자 검증 후 Multi-LLM을 이관하고 legacy 문서의 유지·병합·종료 처리

### Phase 2 — 프로젝트 인터뷰

- AI Mental Care부터 한 프로젝트씩 진행
- 미확인 정보를 질문하고 관련 STAR를 갱신
- 근거를 해당 STAR와 기술 결정에 직접 연결
- 사용자가 사실과 공개 범위를 승인

### Phase 3 — STAR와 상세 사례 작성

- 프로젝트별 대표 STAR 1~2개 선정
- 메인 카드용 압축본 작성
- GitHub README용 기술 사례 작성
- 기술 검토와 주장 감사를 별도로 수행

### Phase 4 — UI 리뉴얼

- Hero 미디어 영역 제거
- 카드가 문제, 책임, 행동, 결과를 보여주도록 타입과 UI 수정
- 기술을 프로젝트 근거와 연결
- 확정된 콘텐츠만 반영

### Phase 5 — 표현 및 품질 감사

- 반복구와 상투 표현 검사
- 내 역할과 팀 결과 검사
- 숫자와 인과관계의 근거 검사
- 모바일, 접근성, 링크, lint, production build 확인

## 11. 첫 인터뷰 입력 양식

다음 단계에서는 AI Mental Care의 대표 문제 하나부터 시작한다. 현재 후보는 `API Contract 불일치`, `Embedding 차원 불일치`, `GCP Network 연결`이다. 가장 설명할 자료가 많은 사례 하나를 고른다.

완성 문장으로 쓰지 않아도 된다. 기억과 증거를 구분하기 위해 자료가 없는 항목에는 `기억에 의존`, 모르는 항목에는 `모름`이라고 적는다.

### 11.1 내가 직접 한 일과 팀이 한 일의 경계

필요한 정보:

- 문제를 처음 발견한 사람과 해결 책임을 맡은 사람
- 내가 단독 구현, 공동 구현, 지원만 한 범위
- 직접 수정한 endpoint, 함수, schema, table, 화면, Cloud resource
- 설계 결정을 내가 제안했는지, 팀 합의였는지, 다른 팀원이 정했는지
- 팀원이 담당한 인접 기능
- commit, PR, 파일 경로 또는 당시 작업 기록

답변 형식 예시이며 아래 값은 프로젝트 사실이 아니다:

```text
내가 담당: [직접 구현한 endpoint / 기능]
공동 담당: [공동 구현한 연결부]
팀 담당: [다른 팀원이 소유한 인접 기능]
근거: [commit URL], [파일 경로], [회의 노트 날짜]
```

### 11.2 성공 조건과 제약

필요한 정보:

- 해결 전 실제 증상과 영향을 받은 사용자 흐름
- 해결됐다고 판단할 수 있는 최소 조건
- 마감, 비용, 인프라, API, 데이터, 팀 협업 제약
- 성능 목표가 있었다면 목표값과 그 근거
- 의도적으로 해결 범위에서 제외한 항목

`정상 동작`만으로는 부족하다. 어떤 입력과 단계가 어디까지 성공해야 했는지를 적는다.

```text
증상: [실제 사용자 흐름]에서 [실제 상태 코드 / 오류] 발생
성공 조건: [입력 조건]에서 [완료돼야 하는 저장·응답·화면]
제약: [마감 / 비용 / 인프라 / migration 제약]
제외: [검증하지 않은 범위]
```

### 11.3 기술 조사와 실제 변경

필요한 정보:

- 오류가 발생한 로컬 또는 Cloud 환경과 주요 버전
- 재현 입력, 요청 순서, 오류 메시지와 로그
- 처음 세운 가설과 확인한 순서
- 각 가설을 배제하거나 확정한 증거
- 검토한 해결안과 채택하지 않은 이유
- 최종 원인
- 수정 전후 Request/Response, schema, 설정 또는 데이터 흐름
- 직접 실행한 명령, migration, 배포 설정

```text
재현: [HTTP method] [endpoint] → [다음 endpoint] 순서에서 실패
로그: 정확한 오류 문구 또는 상태 코드
확인 순서: Network request → Pydantic schema → handler → ORM model
대안 A/B: 각각의 장점, 비용, 선택하지 않은 이유
원인: [검증으로 확정한 실제 원인]
변경: 수정 전 payload → 수정 후 payload, 함께 바꾼 endpoint와 model
```

### 11.4 검증 방법과 증거

필요한 정보:

- 수정 전과 수정 후의 관찰 가능한 차이
- 검증 환경, 계정, 데이터, 테스트 시나리오
- 테스트 횟수와 실패 여부. 기록이 없으면 정확한 숫자를 만들지 않는다.
- 성능·개선·규모 수치의 측정 도구와 조건
- commit, PR, log, screenshot, 영상, API 문서, ERD, 발표 자료
- 이후 같은 문제가 재발했는지
- 검증하지 못한 범위와 남은 위험

```text
검증 환경: local Docker Compose / GCP project 등
시나리오: 신규 로그인 → 입력 → 추천 → 세션 종료 → 리포트 조회
결과: 성공한 단계와 실패한 단계
증거: 로그, 영상, commit, 화면 경로
한계: 부하 테스트, 장애 복구, 장기 운영은 검증하지 않음
```

### 11.5 복사해서 답할 양식

```text
프로젝트: AI Mental Care
문제 사례 이름:

[상황과 책임]
당시 환경과 증상:
왜 중요한 문제였는지:
문제를 발견한 사람:
내 책임 범위:
팀원이 맡은 범위:
내가 직접 수정한 endpoint/function/schema/table/config:
설계 결정 방식(내 제안/공동 합의/팀 결정):

[목표와 제약]
성공 조건:
마감/비용/인프라/협업 제약:
의도적으로 제외한 범위:

[조사와 변경]
재현 입력과 요청 순서:
오류 메시지/로그:
처음 확인한 것과 조사 순서:
세운 가설과 배제 근거:
검토한 대안:
최종 선택과 이유:
확정한 근본 원인:
직접 변경한 코드/설정:
수정 전후의 차이:

[검증과 증거]
검증 방법과 결과:
검증 환경/데이터/시나리오:
테스트 횟수와 실패 여부:
이후 재발 여부:
남은 한계:
첨부 가능한 commit/PR/log/screenshot/document:
공개 가능 범위:
```

## 12. 참고 근거

- 영어 논증문 공동작성 통제 실험에서 InstructGPT 지원군의 글이 다른 조건보다 어휘·내용 다양성이 낮았다는 연구: [Padmakumar & He, ICLR 2024](https://arxiv.org/abs/2309.05196)
- 한국어 인간/LLM 텍스트에서 띄어쓰기, 품사 다양성, 쉼표 등 언어 특성 차이를 분석한 연구: [Park et al., ACL 2025](https://aclanthology.org/2025.acl-long.1030/)
- 사람이 후편집해도 LLM 문체 흔적과 다양성 저하가 남을 수 있다는 사전등록 연구: [Baumler et al., ACL 2026](https://aclanthology.org/2026.acl-long.2030/)
- 현재 OpenAI 모델도 반복 문구가 나타날 수 있어 원하는 문체와 구조를 구체적으로 지시하라는 공식 안내: [OpenAI Model Guidance](https://developers.openai.com/api/docs/guides/latest-model)
- Codex가 작업 전에 프로젝트의 `AGENTS.md`를 읽는 방식과 적용 범위: [OpenAI AGENTS.md Guide](https://developers.openai.com/codex/agent-configuration/agents-md)
