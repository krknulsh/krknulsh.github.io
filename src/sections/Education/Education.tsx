import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { TimelineList } from '../../components/TimelineList/TimelineList'
import { certifications } from '../../data/education'

export function Education() {
  return (
    <section id="education" className="section section--muted">
      <div className="container">
        <div className="section-heading-row">
          <span className="section-index">04</span>
          <SectionTitle title="Certification" />
        </div>
        <TimelineList items={certifications} emptyMessage="확정된 자격 정보가 추가될 예정입니다." />
      </div>
    </section>
  )
}
