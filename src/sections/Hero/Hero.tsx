import { profile } from '../../data/profile'

export function Hero() {
  return (
    <section id="about" className="section hero">
      <div className="container hero__layout">
        <div>
          <p className="eyebrow">{profile.title}</p>
          <h1>{profile.name ?? profile.title}</h1>
          <p className="hero__introduction">{profile.introduction}</p>
          <ul className="hero__highlights">
            {profile.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
