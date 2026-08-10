import { useCallback, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { projects } from '../data/projects'
import type { ProjectCategory } from '../data/projects'
import ProjectCard, { type FlipMode } from './ProjectCard'
import CaseStudy from './CaseStudy'
import DecryptedText from './reactbits/DecryptedText'

// idle → flipInA(축소, front) → flipInB(확대, media + scan) → pageReveal → inside
// 닫힘: closing(page fade out) → flipOutA(축소, media) → flipOutB(확대, front) → idle
type Phase =
  | 'idle'
  | 'flipInA'
  | 'flipInB'
  | 'pageReveal'
  | 'inside'
  | 'closing'
  | 'flipOutA'
  | 'flipOutB'

const FLIP_A = 200
const FLIP_B = 230
const REVEAL = 440
const CLOSE = 300
const FLIP_OUTA = 180
const FLIP_OUTB = 200

const projectGroups: Array<{
  id: ProjectCategory
  eyebrow: string
  title: string
  description: string
}> = [
  {
    id: 'unreal',
    eyebrow: 'GAME_ENGINE / 01',
    title: 'GAMEPLAY SYSTEMS / UNREAL',
    description: 'C++ gameplay architecture, GAS combat, StateTree AI, CommonUI, release-ready systems.',
  },
  {
    id: 'unity',
    eyebrow: 'GAME_ENGINE / 02',
    title: 'MOBILE GAME SYSTEMS / UNITY',
    description: 'Idle RPG progression, BigNumber economy, save/offline loop, editor tooling, balance simulation.',
  },
]

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// 2 + 3. Project Grid + card-flip case-entry transition + full-screen Case Study.
export default function ProjectArchive() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [phase, setPhase] = useState<Phase>('idle')

  const open = useCallback((i: number) => {
    setSelectedIndex(i)
    setPhase(reducedMotion() ? 'pageReveal' : 'flipInA')
  }, [])

  const close = useCallback(() => setPhase('closing'), [])

  useEffect(() => {
    let id: number | undefined
    const to = (next: Phase, ms: number) => (id = window.setTimeout(() => setPhase(next), ms))
    if (phase === 'flipInA') to('flipInB', FLIP_A)
    else if (phase === 'flipInB') to('pageReveal', FLIP_B)
    else if (phase === 'pageReveal') to('inside', REVEAL)
    else if (phase === 'closing') {
      id = window.setTimeout(() => {
        if (reducedMotion()) {
          setPhase('idle')
          setSelectedIndex(null)
        } else setPhase('flipOutA')
      }, CLOSE)
    } else if (phase === 'flipOutA') to('flipOutB', FLIP_OUTA)
    else if (phase === 'flipOutB') {
      id = window.setTimeout(() => {
        setPhase('idle')
        setSelectedIndex(null)
      }, FLIP_OUTB)
    }
    return () => {
      if (id !== undefined) window.clearTimeout(id)
    }
  }, [phase])

  const isOpen = phase === 'pageReveal' || phase === 'inside'

  const prev = useCallback(() => {
    setSelectedIndex((v) => (v === null ? v : (v - 1 + projects.length) % projects.length))
  }, [])
  const next = useCallback(() => {
    setSelectedIndex((v) => (v === null ? v : (v + 1) % projects.length))
  }, [])
  const goto = useCallback((i: number) => setSelectedIndex(i), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return

      const num = Number(e.key)
      if (!Number.isNaN(num) && num >= 1 && num <= projects.length) {
        if (phase === 'idle') open(num - 1)
        else if (isOpen) goto(num - 1)
        return
      }
      if (!isOpen) return
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, isOpen, selectedIndex, open, goto, close, next, prev])

  useEffect(() => {
    if (phase === 'idle') return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [phase])

  const selected = selectedIndex === null ? null : projects[selectedIndex]
  const caseVisible = phase === 'pageReveal' || phase === 'inside' || phase === 'closing'

  const flipModeFor = (i: number): FlipMode => {
    if (reducedMotion()) return 'idle' // reduced-motion: 플립 없이 페이드만
    if (i !== selectedIndex) return 'idle'
    switch (phase) {
      case 'flipInA':
        return 'shrinkFront'
      case 'flipInB':
        return 'expandMedia'
      case 'pageReveal':
      case 'inside':
      case 'closing':
        return 'media'
      case 'flipOutA':
        return 'shrinkMedia'
      case 'flipOutB':
        return 'expandFront'
      default:
        return 'idle'
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <section className="archive section" id="projects">
        <header className="section__head">
          <span className="section__index mono">02</span>
          <h2 className="section__title">
            <DecryptedText
              text="CASE ARCHIVE"
              animateOn="view"
              className="decrypt-on"
              encryptedClassName="decrypt-off"
            />
          </h2>
          <span className="section__meta mono muted">
            // {projects.length} game system case files — press 1–{projects.length} to enter
          </span>
        </header>

        <div className="archive__groups">
          {projectGroups.map((group) => {
            const groupProjects = projects
              .map((project, index) => ({ project, index }))
              .filter(({ project }) => project.category === group.id)

            if (groupProjects.length === 0) return null

            return (
              <section key={group.id} className={`archive-group archive-group--${group.id}`}>
                <header className="archive-group__head">
                  <div>
                    <span className="archive-group__eyebrow mono">{group.eyebrow}</span>
                    <h3 className="archive-group__title">{group.title}</h3>
                  </div>
                  <p className="archive-group__desc">{group.description}</p>
                  <span className="archive-group__count mono">
                    {String(groupProjects.length).padStart(2, '0')} CASES
                  </span>
                </header>

                <div className={`archive__grid ${phase !== 'idle' ? 'archive__grid--busy' : ''}`}>
                  {groupProjects.map(({ project, index }) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      active={selectedIndex === index}
                      flip={flipModeFor(index)}
                      onOpen={() => open(index)}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {caseVisible && selected && selectedIndex !== null && (
          <CaseStudy
            project={selected}
            position={selectedIndex + 1}
            total={projects.length}
            leaving={phase === 'closing'}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </section>
    </MotionConfig>
  )
}
