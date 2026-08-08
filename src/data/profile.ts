import type { Profile } from '../types/portfolio'

export const profile: Profile = {
  name: null,
  title: 'Backend Developer',
  introduction:
    '서비스의 기능 구현뿐 아니라 아키텍처 설계, API 구현, 데이터 저장, 배포까지 연결하는 개발자를 지향합니다.',
  highlights: [
    'FastAPI 기반 REST API',
    'PostgreSQL / Redis / pgvector',
    'Docker / GCP Cloud Run',
    'OAuth / JWT',
    'RAG 기반 AI 서비스 개발',
  ],
  profileImage: null,
  links: {
    github: null,
    email: null,
    resume: null,
    blog: null,
    linkedIn: null,
  },
}
