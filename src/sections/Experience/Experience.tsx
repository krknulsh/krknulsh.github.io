import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { TimelineList } from '../../components/TimelineList/TimelineList'
import { experiences } from '../../data/experience'

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-heading-row">
          <span className="section-index">03</span>
          <SectionTitle title="Research Experience" />
        </div>
        <TimelineList items={experiences} />
      </div>
    </section>
  )
}
