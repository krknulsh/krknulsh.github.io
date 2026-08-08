import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { SkillGroup } from '../../components/SkillGroup/SkillGroup'
import { skillCategories } from '../../data/skills'

export function Skills() {
  return (
    <section id="skills" className="section section--muted">
      <div className="container">
        <div className="section-heading-row">
          <span className="section-index">02</span>
          <SectionTitle title="Skills" />
        </div>
        <div className="skill-grid">
          {skillCategories.map((category) => <SkillGroup key={category.id} {...category} />)}
        </div>
      </div>
    </section>
  )
}
