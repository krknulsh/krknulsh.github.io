import type { SkillCategory } from '../../types/portfolio'

export function SkillGroup({ title, skills }: SkillCategory) {
  return (
    <article className="skill-group">
      <h3>{title}</h3>
      <ul>
        {skills.map((skill) => <li key={skill}>{skill}</li>)}
      </ul>
    </article>
  )
}
