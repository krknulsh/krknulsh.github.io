import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { projects } from '../../data/projects'

export function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="projects-section__heading">
          <span className="section-index">01</span>
          <SectionTitle title="Selected Projects" description="설계부터 구현과 배포까지 연결한 프로젝트입니다." />
        </div>
        <div className="project-grid">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  )
}
