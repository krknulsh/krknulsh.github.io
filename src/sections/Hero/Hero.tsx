import { useState } from 'react'
import { profile } from '../../data/profile'

export function Hero() {
  const [imageFailed, setImageFailed] = useState(false)

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
        {profile.profileImage && !imageFailed ? (
          <img
            className="hero__image"
            src={profile.profileImage}
            alt={`${profile.name ?? profile.title} 프로필`}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="hero__placeholder" aria-hidden="true">
            <span>Building solutions</span>
            <strong>from idea to implementation.</strong>
          </div>
        )}
      </div>
    </section>
  )
}
