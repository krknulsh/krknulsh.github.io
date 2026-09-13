import type { Profile } from '../types/portfolio'

export const profile: Profile = {
  name: 'SEUNGHWAN LEE',
  title: 'Backend Engineer',
  introduction:
    'FastAPI와 PostgreSQL을 중심으로 API 계약, 인증, 데이터 모델과 배포 환경을 연결하는 Backend Engineer입니다. RAG 서비스에서는 pgvector 검색과 Redis 세션 상태를 설계했으며, 기능 구현뿐 아니라 모듈 간 경계와 실패 조건을 함께 확인합니다.',
  highlights: [
    'Backend — Python · FastAPI · SQLAlchemy · Pydantic · Alembic',
    'Data & Retrieval — PostgreSQL · Redis · pgvector · RAG',
    'API & Authentication — REST · OpenAPI · Google OAuth · JWT',
    'Infrastructure — Docker · Cloud Run · Cloud SQL · Memorystore',
  ],
  links: {
    github: 'https://github.com/krknulsh',
    email: 'esm9837@gmail.com',
    resume: null,
    blog: null,
    linkedIn: null,
  },
}
