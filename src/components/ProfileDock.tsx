import { Code, Play, Mail, BookOpen } from 'lucide-react'
import DecryptedText from './reactbits/DecryptedText'
import SpotlightCard from './reactbits/SpotlightCard'
import { profile } from '../data/profile'

export default function ProfileDock() {
  const rows = [
    { label: 'NAME', value: profile.nameKo, mono: false },
    { label: 'ROLE', value: profile.role, mono: true },
    { label: 'EMAIL', value: profile.email, mono: true, href: `mailto:${profile.email}` },
  ]

  const links = [
    { label: 'GitHub', href: profile.links.github, icon: <Code size={15} /> },
    { label: 'YouTube', href: profile.links.youtube, icon: <Play size={15} /> },
    { label: 'Blog', href: profile.links.blog, icon: <BookOpen size={15} /> },
    { label: 'Email', href: `mailto:${profile.email}`, icon: <Mail size={15} /> },
  ]

  return (
    <section className="profile-dock section" id="contact">
      <header className="section__head">
        <span className="section__index mono">03</span>
        <h2 className="section__title">
          <DecryptedText text="PROFILE / CONTACT" animateOn="view" className="decrypt-on" encryptedClassName="decrypt-off" />
        </h2>
        <span className="section__meta mono muted">// operator credentials</span>
      </header>

      <SpotlightCard className="profile-card">
        <div className="profile-card__rows">
          {rows.map((row) => (
            <div key={row.label} className="profile-row">
              <span className="profile-row__label mono muted">{row.label}</span>
              {row.href ? (
                <a
                  className={`profile-row__value ${row.mono ? 'mono' : ''}`}
                  href={row.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {row.value}
                </a>
              ) : (
                <span className={`profile-row__value ${row.mono ? 'mono' : ''}`}>{row.value}</span>
              )}
            </div>
          ))}
        </div>

        <div className="profile-card__links">
          {links.map((link) => (
            <a
              key={link.label}
              className="btn"
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              {link.icon} {link.label}
            </a>
          ))}
        </div>
      </SpotlightCard>
    </section>
  )
}
