import type { Project } from '../types/portfolio'

export const projects: Project[] = [
  {
    id: 'ai-mental-care',
    title: 'AI Mental Care',
    summary:
      '사용자 텍스트에서 감정과 상황을 분석하고, RAG를 통해 적절한 행동 루틴을 추천하는 AI 멘탈 케어 서비스.',
    period: '2025.09 - 2025.12',
    teamSize: 6,
    type: 'Team Project',
    domain: 'AI / Mental Care',
    roles: ['전체 아키텍처 초안 설계', '핵심 기능 구현', 'Backend', '일부 Frontend'],
    skills: [
      'React Native',
      'Expo Web',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'pgvector',
      'Redis',
      'Docker',
      'GCP Cloud Run',
    ],
    coverImage: null,
    github: null,
    detail: null,
    demo: null,
  },
  {
    id: 'multi-llm-resume-generator',
    title: 'Multi-LLM Resume Generator',
    summary:
      '여러 LLM이 생성과 평가 역할을 나누고, 평가 결과를 다시 생성 단계에 반영하는 자기소개서 생성 시스템.',
    period: '2025.03 - 2025.11',
    teamSize: 5,
    type: 'Team Project',
    roles: [],
    skills: [],
    coverImage: null,
    github: null,
    detail: null,
    demo: null,
  },
]
