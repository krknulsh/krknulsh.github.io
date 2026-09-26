import type { Project } from '../../types/portfolio'
import { ArchitectureDiagram } from './ArchitectureDiagram'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const links = [
    { label: 'GitHub', url: project.github },
    { label: 'Detail', url: project.detail },
    { label: 'Demo', url: project.demo },
  ].filter((link) => link.url)

  return (
    <article className="project-card">
      <header className="project-card__header">
        <p className="project-card__meta">{project.period} · {project.teamSize}명 · {project.type}</p>
        <h3>{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>
        <p className="project-card__role"><strong>담당</strong> {project.roles.join(' · ')}</p>
        <p className="project-card__result">{project.result}</p>
        <div className="project-card__footer">
          <ul className="inline-list" aria-label="사용 기술">
            {project.skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
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
        {project.recognition && project.recognition.length > 0 && (
          <p className="project-card__recognition">{project.recognition.join(' · ')}</p>
        )}
      </header>

      <div className="project-card__stories">
        {project.stories.map((story, index) => {
          const storyId = `${project.id}-${story.id}`
          return (
            <section className="project-case" id={storyId} key={story.id} aria-labelledby={`${storyId}-title`}>
              <div className="project-case__heading">
                <span className="project-case__number">{String(index + 1).padStart(2, '0')} / {String(project.stories.length).padStart(2, '0')}</span>
                <h4 id={`${storyId}-title`}>{story.title}</h4>
              </div>
              <figure className="project-case__figure">
                <ArchitectureDiagram project={project.architecture} focus={story.focus} storyId={storyId} title={story.title} />
                <figcaption>전체 아키텍처 · 파란색은 이 사례에서 다루는 경로</figcaption>
              </figure>
              <div className="project-case__narrative">
                <section>
                  <h5>문제와 원인</h5>
                  <div>
                    <p>{story.problem}</p>
                    <p>{story.cause}</p>
                  </div>
                </section>
                <section>
                  <h5>해결 과정</h5>
                  <ol>{story.process.map((step) => <li key={step}>{step}</li>)}</ol>
                </section>
                <section className="project-case__outcome">
                  <h5>결과</h5>
                  <div>
                    <p>{story.result}</p>
                    {story.note && <p className="project-case__note">{story.note}</p>}
                  </div>
                </section>
              </div>
            </section>
          )
        })}
      </div>
    </article>
  )
}
