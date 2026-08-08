import { useState } from 'react'
import type { Project } from '../../types/portfolio'

type ProjectCardProps = {
  project: Project
}

function ProjectImage({ src, title }: { src: string | null; title: string }) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div className="project-card__placeholder" role="img" aria-label={`${title} 이미지 준비 중`}>
        <span className="project-card__placeholder-label">Project preview</span>
        <strong>{title}</strong>
      </div>
    )
  }

  return <img src={src} alt={`${title} 대표 화면`} onError={() => setHasError(true)} />
}

export function ProjectCard({ project }: ProjectCardProps) {
  const links = [
    { label: 'GitHub', url: project.github },
    { label: 'Detail', url: project.detail },
    { label: 'Demo', url: project.demo },
  ].filter((link) => link.url)

  return (
    <article className="project-card">
      <div className="project-card__image">
        <ProjectImage src={project.coverImage} title={project.title} />
      </div>
      <div className="project-card__body">
        <div className="project-card__heading">
          <p className="project-card__meta">
            {project.period} · {project.teamSize}명 · {project.type}
          </p>
          <h3>{project.title}</h3>
          {project.domain && <p className="project-card__domain">{project.domain}</p>}
        </div>
        <p className="project-card__summary">{project.summary}</p>

        {project.roles.length > 0 && (
          <div>
            <h4>Role</h4>
            <ul className="inline-list">
              {project.roles.map((role) => <li key={role}>{role}</li>)}
            </ul>
          </div>
        )}

        {project.skills.length > 0 && (
          <div>
            <h4>Tech</h4>
            <ul className="inline-list">
              {project.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </div>
        )}

        <div className="project-card__result">
          <h4>Technical Result</h4>
          <p>{project.result}</p>
        </div>

        {project.recognition && project.recognition.length > 0 && (
          <div className="project-card__recognition">
            <h4>Recognition</h4>
            <ul>
              {project.recognition.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}

        {project.plannedNotCompleted.length > 0 && (
          <details className="project-card__planned">
            <summary>Planned but not completed</summary>
            <ul>
              {project.plannedNotCompleted.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </details>
        )}

        {links.length > 0 && (
          <div className="project-card__links">
            {links.map((link) => (
              <a key={link.label} href={link.url ?? undefined} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
