import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { profile } from '../../data/profile'

export function Contact() {
  const links = [
    { label: 'Email', value: profile.links.email, url: profile.links.email ? `mailto:${profile.links.email}` : null, external: false },
    { label: 'GitHub', value: 'GitHub', url: profile.links.github, external: true },
    { label: 'Resume', value: 'Resume', url: profile.links.resume, external: true },
    { label: 'Blog', value: 'Blog', url: profile.links.blog, external: true },
    { label: 'LinkedIn', value: 'LinkedIn', url: profile.links.linkedIn, external: true },
  ].filter((link) => link.url)

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-heading-row">
          <span className="section-index">05</span>
          <SectionTitle title="Contact" description="프로젝트와 협업에 관한 연락을 기다립니다." />
        </div>
        {links.length > 0 ? (
          <ul className="contact-links">
            {links.map((link) => (
              <li key={link.label}>
                <span>{link.label}</span>
                <a href={link.url ?? undefined} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>
                  {link.value}
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
