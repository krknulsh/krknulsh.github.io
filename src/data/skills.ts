import type { SkillCategory } from '../types/portfolio'

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    title: 'Backend',
    skills: ['Python', 'FastAPI', 'REST API', 'OAuth 2.0', 'JWT'],
  },
  {
    id: 'database',
    title: 'Database',
    skills: ['PostgreSQL', 'Redis', 'pgvector'],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud / DevOps',
    skills: ['Docker', 'GCP Cloud Run', 'Cloud SQL', 'Memorystore', 'Firebase', 'Git', 'GitHub'],
  },
  {
    id: 'ai-data',
    title: 'AI / Data',
    skills: ['RAG', 'Embedding', 'Vector Search', 'LLM API'],
  },
]
