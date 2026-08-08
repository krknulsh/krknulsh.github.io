import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { profile } from '../../data/profile'

export function Contact() {
  const links = [
    { label: 'Email', url: profile.links.email ? `mailto:${profile.links.email}` : null },
    { label: 'GitHub', url: profile.links.github },
    { label: 'Resume', url: profile.links.resume },
    { label: 'Blog', url: profile.links.blog },
    { label: 'LinkedIn', url: profile.links.linkedIn },
  ].filter((link) => link.url)

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-heading-row">
          <span className="section-index">05</span>
          <SectionTitle title="Contact" description="연락처와 외부 링크는 확인 후 공개됩니다." />
        </div>
        {links.length > 0 ? (
          <ul className="contact-links">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.url ?? undefined} target={link.label === 'Email' ? undefined : '_blank'} rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">연락처 정보가 추가될 예정입니다.</p>
        )}
      </div>
    </section>
  )
}
