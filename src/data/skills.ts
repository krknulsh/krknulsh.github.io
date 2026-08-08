import type { SkillCategory } from '../types/portfolio'

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    skills: ['JavaScript', 'TypeScript', 'React', 'React Native', 'Expo', 'Expo Web'],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: ['Python', 'FastAPI', 'REST API', 'SQLAlchemy', 'APScheduler', 'Google OAuth', 'JWT'],
  },
  {
    id: 'database',
    title: 'Database',
    skills: ['PostgreSQL', 'Redis', 'pgvector'],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud / DevOps',
    skills: ['Docker', 'GCP Cloud Run', 'Cloud SQL', 'Memorystore', 'Serverless VPC Connector', 'Firebase Hosting'],
  },
  {
    id: 'ai-data',
    title: 'AI / Data',
    skills: ['RAG', 'Embedding', 'Vector Search', 'LLM API'],
  },
]
