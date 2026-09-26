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
      <details className="project-card__details">
        <summary>Technical case study</summary>
        <div className="project-card__details-content">
          <section>
            <h4>Architecture</h4>
            <ul>{project.caseStudy.architecture.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section>
            <h4>Technical Contribution</h4>
            <ul>{project.caseStudy.contributions.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section>
            <h4>Troubleshooting</h4>
            {project.caseStudy.troubleshooting.map((story) => (
              <article className="troubleshooting" key={story.title}>
                <h5>{story.title}</h5>
                <dl>
                  <div><dt>문제</dt><dd>{story.problem}</dd></div>
                  <div><dt>분석</dt><dd><ul>{story.analysis.map((item) => <li key={item}>{item}</li>)}</ul></dd></div>
                  <div><dt>변경</dt><dd><ul>{story.changes.map((item) => <li key={item}>{item}</li>)}</ul></dd></div>
                  <div><dt>결과</dt><dd>{story.result}</dd></div>
                  {story.limitation && <div><dt>한계</dt><dd>{story.limitation}</dd></div>}
                </dl>
              </article>
            ))}
          </section>
          <section>
            <h4>Verification & Limitations</h4>
            <ul>{project.caseStudy.verification.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>
      </details>
    </article>
  )
}
