import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { projects } from '../../data/projects'

export function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container projects-section__container">
        <div className="projects-section__heading">
          <span className="section-index">01</span>
          <SectionTitle title="Selected Projects" description="각 프로젝트에서 마주한 네 가지 문제를 어떻게 파악하고 해결했는지 기록했습니다." />
        </div>
        <div className="project-grid">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  )
}
