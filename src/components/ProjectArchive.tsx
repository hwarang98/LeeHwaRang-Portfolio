import { useCallback, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { projects } from '../data/projects'
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
            // {projects.length} unreal case files — press 1–{projects.length} to enter
          </span>
        </header>

        <div className={`archive__grid ${phase !== 'idle' ? 'archive__grid--busy' : ''}`}>
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              active={selectedIndex === i}
              flip={flipModeFor(i)}
              onOpen={() => open(i)}
            />
          ))}
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
