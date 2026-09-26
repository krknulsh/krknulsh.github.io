import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { projects } from '../../data/projects'

export function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container projects-section__container">
        <div className="projects-section__heading">
          <span className="section-index">01</span>
          <SectionTitle title="Selected Projects" description="프로젝트별 네 가지 사례에서 문제 해결과 후속 구조 개선의 과정·결과를 기록했습니다." />
        </div>
        <div className="project-grid">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  )
}
