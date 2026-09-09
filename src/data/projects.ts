import type { Project } from '../types/portfolio'

export const projects: Project[] = [
  {
    id: 'multi-llm-resume-generator',
    title: '다:서 Multi-LLM–Based Cover Letter Writing System',
    summary:
      '사용자와 외부 기업·직무 정보를 바탕으로 자기소개서를 생성하고, 복수 LLM의 텍스트 피드백과 사용자 요청을 반영해 수정하는 Human-in-the-loop Multi-LLM 시스템.',
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
    result: 'Local 환경에서 로그인부터 생성·평가·사용자 요청 기반 재작성·저장·조회까지 주요 서비스 흐름의 정상 작동을 확인했습니다.',
    recognition: ['2025 강원SW 페스티벌 출품', '졸업작품 경진대회 장려상'],
    coverImage: '/assets/projects/multi-llm-resume-generator/cover.png',
    github: 'https://github.com/krknulsh/LLMate_refactored',
    detail: null,
    demo: null,
  },
  {
    id: 'ai-mental-care',
    title: 'AI Mental Care – RAG-Based Personalized Mental Care Service',
    summary:
      '사용자 텍스트의 감정과 상황을 분석하고, NHS·APA 기반 행동 루틴을 RAG와 Vector Search로 검색해 추천과 리포트까지 연결한 서비스.',
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
    result: 'Firebase Frontend, Cloud Run Backend, Cloud SQL PostgreSQL·pgvector, Memorystore Redis를 연결한 Cloud 환경에서 주요 End-to-End Flow의 동작을 확인했습니다.',
    coverImage: '/assets/projects/ai-mental-care/cover.png',
    github: 'https://github.com/krknulsh/AI_MentalCare_Refactored',
    detail: null,
    demo: null,
  },
]
