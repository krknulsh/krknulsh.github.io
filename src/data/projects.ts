import type { Project } from '../types/portfolio'

export const projects: Project[] = [
  {
    id: 'multi-llm-resume-generator',
    title: '다:서 Multi-LLM–Based Cover Letter Writing System',
    summary:
      '사용자 경험 데이터로 자기소개서 초안을 생성하고, GPT·Gemini·Claude의 관점별 피드백을 사용자가 검토해 수정하는 Multi-LLM 서비스입니다. Frontend 흐름과 Google 인증 연동, My Page API 통합을 담당했습니다.',
    period: '2025.03 - 2025.11',
    teamSize: 5,
    type: 'Team Project / Capstone Design',
    roles: [
      'React Frontend 아키텍처 및 핵심 UI/UX 구현',
      'Google OAuth / JWT 인증 연동',
      '마이페이지·사용자 데이터 UI 및 REST API 연동',
    ],
    skills: [
      'React',
      'FastAPI',
      'PostgreSQL',
      'Google OAuth',
      'JWT',
    ],
    result: 'Google 로그인부터 생성·평가·사용자 수정·저장까지 Local 통합 흐름을 구현했습니다.',
    recognition: ['2025 강원SW 페스티벌 출품', '졸업작품 경진대회 장려상'],
    coverImage: '/assets/projects/multi-llm-resume-generator/cover.png',
    github: 'https://github.com/krknulsh/LLMate_refactored',
    detail: null,
    demo: null,
    caseStudy: {
      architecture: [
        'React Frontend에서 FastAPI REST API를 통해 프로필·경험·자기소개서 데이터를 조회하고 수정했습니다.',
        'HyperCLOVA X가 초안을 생성하고 GPT-4o-mini, Gemini 2.0 Flash, Claude 3 Haiku가 서로 다른 관점의 텍스트 피드백을 순차 생성했습니다.',
        '평가 모델이 자동으로 재작성을 반복하지 않고, 사용자가 피드백을 검토한 뒤 재작성 여부를 결정하도록 구성했습니다.',
      ],
      contributions: [
        '로그인–생성–피드백–수정–저장으로 이어지는 React 사용자 흐름과 Backend API 연동을 구성했습니다.',
        'Access token 30분, refresh token 7일 정책과 HttpOnly refresh cookie, 재발급 endpoint, logout 만료 처리를 Backend에 보강했습니다.',
        'My Page의 생성·수정·출력 schema를 분리하고 response model, 사용자 ownership filter, 빈 목록의 200 응답 계약을 정리했습니다.',
        '프로젝트 이후에는 대형 Frontend·Backend router를 기능과 책임별 module로 분리해 파일별 변경 범위를 줄였습니다.',
      ],
      troubleshooting: [
        {
          title: 'Google OAuth callback과 서비스 JWT 연결',
          problem: 'Google callback이 사용자 정보를 조회한 뒤 종료되어, 로그인 결과가 서비스 내부 사용자와 보호 API 인증으로 이어지지 않았습니다.',
          analysis: [
            'Frontend 요청부터 Google authorization code, provider token, callback, local user, service JWT 순서로 인증 흐름을 추적했습니다.',
            'Google이 발급한 token과 자체 API가 사용하는 JWT의 발급자·대상·용도가 다르다는 점을 팀원과 독립적으로 확인하고 교차 검증했습니다.',
          ],
          changes: [
            'Google user info를 social ID 기준 local user 조회·생성과 연결했습니다.',
            'Local user ID를 subject로 사용하는 service JWT 흐름을 구성하고, 이후 refresh token과 logout 처리를 보강했습니다.',
          ],
          result: 'Google 인증 결과가 서비스 내부 인증으로 연결되어 보호 REST API에서 service JWT를 사용할 수 있는 구조를 만들었습니다.',
          limitation: '최종 callback 코드는 팀원 명의 commit에 반영되어 있어 단독 구현이 아니라 독립 진단과 공동 해결로 기술했습니다. 브라우저 자동 refresh E2E는 확인하지 못했습니다.',
        },
      ],
      verification: [
        '원본 Git history에서 OAuth 초기·후속 구현과 refresh token, My Page API 변경을 대조했습니다.',
        'AWS 배포는 완료하지 않았으며 결과는 Local 통합 실행 범위입니다.',
        'LLM 역할 분리 효과와 응답 지연은 고정 데이터셋으로 측정하지 않았습니다.',
      ],
    },
  },
  {
    id: 'ai-mental-care',
    title: 'AI Mental Care – RAG-Based Personalized Mental Care Service',
    summary:
      '사용자의 텍스트에서 감정과 상황을 분석하고, 310개의 셀프케어 루틴 중 관련 항목을 검색해 행동 제안으로 연결했습니다. FastAPI, pgvector, Redis를 중심으로 인증부터 추천과 리포트까지 이어지는 Backend 흐름을 설계했습니다.',
    period: '2025.09 - 2025.12',
    teamSize: 6,
    type: 'Team Project / Capstone Design',
    domain: 'AI / Mental Care',
    roles: [
      '전체 서비스 아키텍처 및 Backend 설계·통합',
      'Google OAuth / JWT 인증과 Database·Data Flow 연동',
      'RAG 기반 루틴 추천 및 Report 핵심 기능 구현',
      'Frontend 결과 시각화와 GCP Cloud 배포·인프라 연결',
    ],
    skills: [
      'React Native',
      'Expo Web',
      'FastAPI',
      'PostgreSQL',
      'pgvector',
      'Redis',
      'RAG / Vector Search',
      'Docker',
      'GCP Cloud Run',
    ],
    result: '정규화 문서 133건에서 루틴 310건을 구성하고, Firebase–Cloud Run–Cloud SQL·Memorystore로 이어지는 주요 서비스 흐름을 연결했습니다.',
    coverImage: '/assets/projects/ai-mental-care/cover.png',
    github: 'https://github.com/krknulsh/AI_MentalCare_Refactored',
    detail: null,
    demo: null,
    caseStudy: {
      architecture: [
        'FastAPI가 인증, 감정·상황 분석, 정보 충분성 판단, RAG 검색과 응답 구성을 순서대로 조정했습니다.',
        'PostgreSQL에는 사용자·세션·루틴·리포트를 영속화하고, pgvector에는 text-embedding-004의 768차원 embedding을 저장했습니다.',
        '진행 중인 대화와 증분 요약 상태는 Redis에 분리하고, Cloud Run에서 Cloud SQL과 Memorystore에 연결했습니다.',
      ],
      contributions: [
        'Team Lead로 서비스 아키텍처 초안과 주요 데이터 흐름을 설계하고 FastAPI Backend, 인증, RAG pipeline과 GCP 배포를 주도했습니다.',
        '133개의 정규화 문서에서 출처 URL과 수행 단계가 포함된 1~10분 셀프케어 루틴 310건을 구성하고 직접 검수했습니다.',
        'Gemini 분석 결과의 confidence·clarity가 0.7 미만이면 추가 질문을 반환하고, 충분하면 pgvector cosine distance 기준 상위 5개 루틴을 검색하도록 구성했습니다.',
        'Dockerized Backend를 Cloud Run에 배포하고 Cloud SQL PostgreSQL·pgvector, Memorystore Redis, Firebase Hosting을 연결했습니다.',
      ],
      troubleshooting: [
        {
          title: 'Embedding 차원과 pgvector schema 정합성',
          problem: '소스와 migration에 1536차원과 768차원 정의가 혼재해 embedding 저장·검색 조건이 일치하지 않았습니다.',
          analysis: [
            'Embedding model 출력, ORM model, Alembic migration과 pgvector column·index 정의를 함께 대조했습니다.',
            '차원 변경은 column만의 문제가 아니라 기존 vector data와 IVFFlat index까지 함께 바꿔야 하는 변경임을 확인했습니다.',
          ],
          changes: [
            '기존 IVFFlat index를 제거한 뒤 vector column과 application의 EMBED_DIM을 768로 통일했습니다.',
            '기존 루틴을 다시 embedding하고 vector_cosine_ops 기반 IVFFlat index를 재생성했습니다.',
          ],
          result: '모델 출력과 DB schema를 768차원으로 통일해 루틴 저장과 cosine-distance 기반 top-5 검색 조건을 복구했습니다.',
          limitation: '계산 대상 차원은 1536에서 768로 줄었지만 전후 latency를 측정하지 않아 응답 속도 개선율로 표현하지 않았습니다.',
        },
        {
          title: 'API 계약 불일치와 Alembic migration drift',
          problem: '기능을 병렬 개발하며 Frontend payload, Pydantic schema, 내부 module I/O와 DB model이 서로 다른 구조를 기대했습니다.',
          analysis: [
            '요청 payload부터 handler, ORM model, 다음 module 입력까지 field의 흐름을 추적했습니다.',
            '오류가 가리키는 migration code와 현재 Backend model을 비교해 적용 revision과 field format의 차이를 확인했습니다.',
          ],
          changes: [
            '추가 질문과 추천 성공 response를 분리하고 flag, message, card 반환 조건을 맞췄습니다.',
            'OpenAPI로 request·response shape를 대조하고, 촉박한 일정에서는 DB 상태를 보존하는 migration 복구 조치를 적용했습니다.',
          ],
          result: '입력–분석–검색–추천–리포트 흐름의 데이터 구조를 다시 연결하고 팀 계정으로 반복적인 수동 통합 검증을 진행했습니다.',
          limitation: '적용 revision 수정·삭제와 조건부 migration은 schema drift를 숨길 수 있어 모범 사례가 아닌 회고 사례로 다룹니다.',
        },
      ],
      verification: [
        '코드와 Git history에서 RAG, 인증, migration과 배포 관련 구현을 확인했습니다.',
        '현재 데이터에서 고유 문서 133건, 루틴 310건과 루틴에 반영된 원본 문서 121건을 확인했습니다.',
        '정식 latency benchmark, retrieval relevance 평가셋과 자동 E2E test는 없습니다.',
      ],
    },
  },
]
