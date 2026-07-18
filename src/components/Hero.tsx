import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Play, Mail, ChevronRight, Terminal } from 'lucide-react'
import LetterGlitch from './reactbits/LetterGlitch'
import DecryptedText from './reactbits/DecryptedText'
import { profile } from '../data/profile'

interface HeroProps {
  onViewProjects: () => void
  onContact: () => void
}

// 1. Hero — Interactive Unreal Case Archive 진입부.
// Letter Glitch(배경 노이즈) + Decrypted Text(이름/역할)로 동적인 아카이브 느낌.
export default function Hero({ onViewProjects, onContact }: HeroProps) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (visibleLines >= profile.bootLog.length) return
    const t = setTimeout(() => setVisibleLines((n) => n + 1), 300)
    return () => clearTimeout(t)
  }, [visibleLines])

  return (
    <section className="hero" id="hero">
      <div className="hero__bg" aria-hidden="true">
        <LetterGlitch
          glitchColors={['#12181f', '#1d2a33', '#46c9bd']}
          glitchSpeed={95}
          smooth
          outerVignette
        />
      </div>

      <div className="hero__inner">
        <p className="hero__eyebrow mono">// interactive_unreal_case_archive</p>

        <div className="hero__grid">
          <div className="hero__identity">
            <h1 className="hero__name">
              <DecryptedText
                text={profile.nameEn}
                animateOn="view"
                sequential
                speed={40}
                className="decrypt-on"
                encryptedClassName="decrypt-off"
              />
            </h1>
            <p className="hero__role mono">
              <span className="accent-cyan">&gt;</span> {profile.role}
            </p>
            <p className="hero__summary">{profile.summary}</p>

            <div className="hero__keywords">
              {profile.techKeywords.map((kw, i) => (
                <motion.span
                  key={kw}
                  className="kw-chip mono"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
                >
                  {kw}
                </motion.span>
              ))}
            </div>

            <div className="hero__cta">
              <button className="btn btn--primary" onClick={onViewProjects}>
                <Terminal size={15} /> Open Case Archive
              </button>
              <a className="btn" href={profile.links.github} target="_blank" rel="noreferrer noopener">
                <Code size={15} /> GitHub
              </a>
              <a className="btn" href={profile.links.youtube} target="_blank" rel="noreferrer noopener">
                <Play size={15} /> YouTube
              </a>
              <button className="btn" onClick={onContact}>
                <Mail size={15} /> Contact
              </button>
            </div>
          </div>

          <div className="hero__console" role="log" aria-label="boot log">
            <div className="console-panel">
              <div className="console-panel__bar">
                <span className="mono muted">archive.boot</span>
                <span className="console-panel__lights">
                  <i /> <i /> <i />
                </span>
              </div>
              <div className="console-panel__body mono">
                {profile.bootLog.map((line, i) => {
                  const shown = i < visibleLines
                  const isLast = i === profile.bootLog.length - 1
                  return (
                    <motion.div
                      key={line}
                      className={`boot-line ${isLast ? 'boot-line--ok' : ''}`}
                      initial={{ opacity: 0, x: -6 }}
                      animate={shown ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight size={13} className="boot-line__caret" />
                      <span>{line}</span>
                      {shown && !isLast && <span className="boot-line__tag">OK</span>}
                    </motion.div>
                  )
                })}
                {visibleLines >= profile.bootLog.length && (
                  <div className="boot-line boot-line--cursor">
                    <span className="cursor-block" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
