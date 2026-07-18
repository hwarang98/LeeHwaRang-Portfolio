import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { X, Code, Play, Store, BookOpen, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Project, LinkLabel, CaseSection, ProjectMedia } from '../data/projects'
import { youTubeId } from '../utils/youtube'

interface CaseStudyProps {
  project: Project
  position: number
  total: number
  /** true 면 페이지가 페이드/슬라이드 아웃(닫히는 중) */
  leaving: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

const pad = (n: number) => String(n).padStart(2, '0')

function linkIcon(label: LinkLabel) {
  if (label === 'GitHub') return <Code size={15} />
  if (label === 'Steam') return <Store size={15} />
  if (label === 'Blog') return <BookOpen size={15} />
  return <ArrowUpRight size={15} />
}

// 인테리어 요소 stagger: title → tabs → media → meta → content 순
const EASE = [0.22, 1, 0.36, 1] as const
const containerVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}
const blockVariants: Variants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0, transition: { duration: 0.36, ease: EASE } },
  exit: { opacity: 0 },
}
const bodyVariants: Variants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0, transition: { duration: 0.36, ease: EASE, staggerChildren: 0.06 } },
  exit: { opacity: 0 },
}

function SectionBody({ section }: { section: CaseSection }) {
  if (section.kind === 'table') {
    const rows = section.rows ?? []
    return (
      <div className="case-table-wrap">
        <table className={`case-table ${section.columns ? '' : 'case-table--kv'}`}>
          {section.columns && (
            <thead>
              <tr>
                {section.columns.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (section.kind === 'tags') {
    return (
      <div className="case-section__tags">
        {(section.items ?? []).map((item) => (
          <span key={item} className="sys-chip sys-chip--lg mono">
            {item}
          </span>
        ))}
      </div>
    )
  }

  let n = 0
  return (
    <ul className="case-section__log">
      {(section.items ?? []).map((item, i) => {
        if (item.startsWith('# ')) {
          n = 0
          return (
            <li key={i} className="case-log-head mono">
              {item.slice(2)}
            </li>
          )
        }
        n += 1
        return (
          <li key={i} className="case-log-line">
            <span className="case-log-line__no mono">{pad(n)}</span>
            <span className="case-log-line__text">{item}</span>
          </li>
        )
      })}
    </ul>
  )
}

// Media 카드 — case evidence / footage 느낌.
// 항상 존재하는 hqdefault 를 먼저 표시하고, maxresdefault 가 실제로 있으면 업그레이드한다.
// (maxres 는 720p+ 업로드에만 존재 → Arc 처럼 없는 영상은 hqdefault 로 안정 표시)
function MediaCard({ m }: { m: ProjectMedia }) {
  const id = youTubeId(m.href)
  const [src, setSrc] = useState<string | null>(
    m.thumbnail ?? (id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null),
  )
  // hires = 16:9 원본(크롭 불필요). hqdefault(4:3)면 false → 살짝 크롭.
  const [hires, setHires] = useState(!!m.thumbnail)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!id || m.thumbnail) return
    let cancelled = false
    const url = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    const probe = new Image()
    probe.onload = () => {
      // 없는 maxres 는 120x90 회색 placeholder 로 뜨기도 하므로 실제 크기로 검증
      if (!cancelled && probe.naturalWidth > 200) {
        setSrc(url)
        setHires(true)
      }
    }
    probe.src = url
    return () => {
      cancelled = true
    }
  }, [id, m.thumbnail])

  return (
    <a
      className="media-card"
      href={m.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${m.title} (${m.label})`}
    >
      <div className="media-card__thumb">
        {src && !hidden && (
          <img
            className={`media-card__img ${hires ? '' : 'media-card__img--sd'}`}
            src={src}
            alt=""
            loading="lazy"
            onError={() => setHidden(true)}
          />
        )}
        <span className="media-card__scrim" aria-hidden="true" />
        <span className="media-card__badge mono">{m.label}</span>
        <span className="media-card__play" aria-hidden="true">
          <Play size={26} />
        </span>
      </div>
      <div className="media-card__meta">
        <span className="media-card__title">{m.title}</span>
        <span className="media-card__cue mono">FOOTAGE ▸ WATCH</span>
      </div>
    </a>
  )
}

function MediaGrid({ media }: { media: ProjectMedia[] }) {
  const cls = media.length === 1 ? 'case-media--single' : 'case-media--multi'
  return (
    <div className={`case-media ${cls}`}>
      {media.map((m) => (
        <MediaCard key={m.href} m={m} />
      ))}
    </div>
  )
}

// 3. Expanded Case Study — document.body 로 portal 되는 완전 full-screen 케이스 파일.
export default function CaseStudy({
  project,
  position,
  total,
  leaving,
  onClose,
  onPrev,
  onNext,
}: CaseStudyProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const caseRef = useRef<HTMLDivElement>(null)

  // full-screen inspection light — 카드 spotlight 보다 훨씬 넓고 은은한 배경 조명.
  // 마우스 위치를 CSS 변수로 저장하면 .case-full::before radial-gradient 가 따라온다.
  const handleCaseSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = caseRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--case-spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--case-spot-y', `${e.clientY - rect.top}px`)
    el.style.setProperty(
      '--case-spot-color',
      project.accent === 'cyan'
        ? 'rgba(70, 201, 189, 0.075)'
        : 'rgba(217, 160, 101, 0.065)',
    )
  }

  const scrollToSection = (key: string) => {
    const el = scrollRef.current?.querySelector<HTMLElement>(`[data-section="${key}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const hasMedia = !!project.media && project.media.length > 0

  // 플립 완료 후 나타나는 full-screen case page — opacity 0→1, y 28→0 (닫힐 땐 반대로)
  const view = (
    <motion.div
      ref={caseRef}
      onMouseMove={handleCaseSpotlight}
      className={`case-full case-full--${project.accent}`}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: leaving ? 0 : 1, y: leaving ? 28 : 0 }}
      transition={{ duration: leaving ? 0.3 : 0.44, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case file`}
    >
      {/* 상단 크롬 — 프로젝트 전환에도 유지 */}
      <div className="case-full__chrome">
        <button className="icon-btn" onClick={onClose} aria-label="닫기 (Esc)">
          <ChevronLeft size={16} />
          <span className="mono">BACK</span>
        </button>

        <span className="case-full__brand mono muted">case://archive/{project.id.toLowerCase()}</span>

        <div className="case-full__nav">
          <span className="case-full__counter mono">
            {pad(position)} / {pad(total)}
          </span>
          <button className="icon-btn" onClick={onPrev} aria-label="이전 프로젝트">
            <ChevronLeft size={16} />
          </button>
          <button className="icon-btn" onClick={onNext} aria-label="다음 프로젝트">
            <ChevronRight size={16} />
          </button>
          <button className="icon-btn icon-btn--close" onClick={onClose} aria-label="닫기 (Esc)">
            <X size={16} />
            <span className="mono">ESC</span>
          </button>
        </div>
      </div>

      <div className="case-full__scroll" ref={scrollRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            className="case-full__content"
            variants={containerVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.header className="case-full__head" variants={blockVariants}>
              <span className={`case-full__id mono status--${project.status.toLowerCase()}`}>
                CASE_{project.index} · ● {project.status}
              </span>
              <h2 className="case-full__title">
                {project.title}
                {project.subtitle && <span className="case-full__subtitle"> {project.subtitle}</span>}
              </h2>
            </motion.header>

            <motion.nav className="case-full__tabs mono" variants={blockVariants}>
              {hasMedia && (
                <button className="case-tab" onClick={() => scrollToSection('media')}>
                  Media
                </button>
              )}
              {project.sections.map((s) => (
                <button key={s.key} className="case-tab" onClick={() => scrollToSection(s.key)}>
                  {s.label}
                </button>
              ))}
            </motion.nav>

            {/* Media / Videos — 본문 첫 섹션, 전체 폭 */}
            {hasMedia && (
              <motion.section
                data-section="media"
                className="case-section case-section--media"
                variants={blockVariants}
              >
                <h3 className="case-section__label mono">
                  <span className="case-section__bullet" />
                  Media / Videos
                </h3>
                <MediaGrid media={project.media!} />
              </motion.section>
            )}

            <motion.div className="case-full__body" variants={bodyVariants}>
              <motion.aside className="case-meta" variants={blockVariants}>
                <div className="case-meta__row">
                  <span className="case-meta__k mono">ROLE</span>
                  <span className="case-meta__v">{project.role}</span>
                </div>
                <div className="case-meta__row">
                  <span className="case-meta__k mono">UE</span>
                  <span className="case-meta__v mono">{project.ueVersion}</span>
                </div>
                <div className="case-meta__row">
                  <span className="case-meta__k mono">GENRE</span>
                  <span className="case-meta__v">{project.formTags.join(' · ')}</span>
                </div>
                <div className="case-meta__row">
                  <span className="case-meta__k mono">TECH</span>
                  <span className="case-meta__v">
                    <span className="case-meta__tags">
                      {project.systemTags.map((t) => (
                        <span key={t} className="sys-chip mono">
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>
                </div>
                <div className="case-meta__links">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      className="btn btn--sm"
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {linkIcon(link.label)} {link.label}
                    </a>
                  ))}
                </div>
              </motion.aside>

              <motion.div className="case-content" variants={blockVariants}>
                {project.sections.map((section) => (
                  <section key={section.key} data-section={section.key} className="case-section">
                    <h3 className="case-section__label mono">
                      <span className="case-section__bullet" />
                      {section.label}
                    </h3>
                    {section.note && <p className="case-section__note">{section.note}</p>}
                    <SectionBody section={section} />
                  </section>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )

  return createPortal(view, document.body)
}
