import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { projects } from '../../data/projects'

export function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container projects-section__container">
        <div className="projects-section__heading">
          <span className="section-index">01</span>
          <SectionTitle title="Selected Projects" description="설계와 구현 과정에서 맡은 역할과 확인된 결과를 소개합니다." />
        </div>
        <div className="project-grid">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  )
}
