import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Code, Play, Store, BookOpen, ArrowUpRight } from 'lucide-react'
import type { Project, LinkLabel } from '../data/projects'
import { youTubeId } from '../utils/youtube'

export type FlipMode =
  | 'idle'
  | 'shrinkFront'
  | 'expandMedia'
  | 'media'
  | 'shrinkMedia'
  | 'expandFront'

interface ProjectCardProps {
  project: Project
  onOpen: () => void
  active: boolean
  flip?: FlipMode
}

function linkIcon(label: LinkLabel) {
  if (label === 'GitHub') return <Code size={14} />
  if (label === 'Steam') return <Store size={14} />
  if (label === 'Blog') return <BookOpen size={14} />
  return <ArrowUpRight size={14} />
}

const FLIP_EASE = [0.4, 0, 0.2, 1] as const

// 2. Project Grid — 카드 전체가 scaleX 1→0.04→1 로 뒤집히며 대표 미디어 면으로 전환.
// stroke/corner/glow 는 flip layer 안에 포함되어 카드와 함께 뒤집힌다.
export default function ProjectCard({ project, onOpen, active, flip = 'idle' }: ProjectCardProps) {
  const mediaHref = project.media?.[0]?.href
  const ytId = mediaHref ? youTubeId(mediaHref) : null
  const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null

  const flipping = flip !== 'idle'
  const showMedia = flip === 'expandMedia' || flip === 'media' || flip === 'shrinkMedia'
  const scaleTarget = flip === 'shrinkFront' || flip === 'shrinkMedia' ? 0.04 : 1

  // React Bits SpotlightCard 효과 —
  //  1) 마우스 위치를 CSS 변수로 넣어 flip layer 안 ::before spotlight 를 이동시킨다.
  //  2) 마우스를 따라 카드가 살짝 기우는 3D tilt 를 바깥 slot 에 적용한다.
  //     (scaleX flip 은 안쪽 .report-card 가 담당하므로 tilt 는 slot 에 걸어 충돌을 피한다.)
  const cardRef = useRef<HTMLDivElement>(null)
  const slotRef = useRef<HTMLElement>(null)

  const MAX_TILT = 6 // deg

  const handleSpotlightMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    el.style.setProperty('--rb-spot-x', `${x}px`)
    el.style.setProperty('--rb-spot-y', `${y}px`)
    el.style.setProperty(
      '--rb-spot-color',
      project.accent === 'cyan'
        ? 'rgba(70, 201, 189, 0.16)'
        : 'rgba(217, 160, 101, 0.14)'
    )

    // 마우스 위치(0~1)를 중심 기준 편차로 환산해 tilt 각도 계산
    const slot = slotRef.current
    if (!slot || rect.width === 0 || rect.height === 0) return
    const px = x / rect.width - 0.5
    const py = y / rect.height - 0.5
    slot.style.setProperty('--rb-rot-y', `${px * MAX_TILT * 2}deg`)
    slot.style.setProperty('--rb-rot-x', `${-py * MAX_TILT * 2}deg`)
  }

  const handleSpotlightLeave = () => {
    const slot = slotRef.current
    if (!slot) return
    slot.style.setProperty('--rb-rot-x', '0deg')
    slot.style.setProperty('--rb-rot-y', '0deg')
  }

  return (
    <article
      ref={slotRef}
      className="report-card-slot"
      data-card-id={project.id}
      role="button"
      tabIndex={0}
      aria-label={`${project.title} 케이스 열기`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleSpotlightMove}
        onMouseLeave={handleSpotlightLeave}
        className={`report-card report-card--${project.accent} ${
          active ? 'report-card--active' : ''
        } ${flipping ? 'report-card--flip' : ''}`}
        animate={{ scaleX: scaleTarget }}
        transition={{ duration: 0.2, ease: FLIP_EASE }}
      >
        <span className="report-card__corner report-card__corner--tl" aria-hidden="true" />
        <span className="report-card__corner report-card__corner--br" aria-hidden="true" />
        <div className="report-card__glow" aria-hidden="true" />

        {/* front face — 항상 렌더(카드 높이 유지). media 면이 위를 덮는다 */}
        <div className="report-card__face">
          <div className="report-card__head">
            <span className="report-card__index mono">CASE_{project.index}</span>
            <span className={`report-card__status mono status--${project.status.toLowerCase()}`}>
              ● {project.status}
            </span>
          </div>

          <h3 className="report-card__title">
            {project.title}
            {project.subtitle && <span className="report-card__subtitle"> {project.subtitle}</span>}
          </h3>

          <div className="report-card__meta mono">
            <span className="report-card__ue">{project.ueVersion}</span>
            <span className="report-card__sep">/</span>
            <span>{project.formTags.join(' · ')}</span>
          </div>

          <p className="report-card__summary">{project.summary}</p>

          <div className="report-card__tags">
            {project.systemTags.map((tag) => (
              <span key={tag} className="sys-chip mono">
                {tag}
              </span>
            ))}
          </div>

          <div className="report-card__load" aria-hidden="true">
            <span className="report-card__load-label mono">system.load</span>
            <span className="report-card__load-track">
              <span className="report-card__load-fill" />
            </span>
          </div>

          <div className="report-card__footer">
            <div className="report-card__links">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  className="icon-link"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  title={link.label}
                  aria-label={link.label}
                  onClick={(e) => e.stopPropagation()}
                >
                  {linkIcon(link.label)}
                </a>
              ))}
              {project.media?.slice(0, 2).map((m) => (
                <a
                  key={m.href}
                  className="icon-link icon-link--media"
                  href={m.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  title={m.title}
                  aria-label={`${m.title} (${m.label})`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Play size={14} />
                </a>
              ))}
            </div>
            <span className="report-card__open mono">
              OPEN CASE <ArrowUpRight size={13} />
            </span>
          </div>
        </div>

        {/* media face — 대표 썸네일(media[0]) 또는 accent gradient fallback + scan line */}
        {showMedia && (
          <div className="report-card__media" aria-hidden="true">
            {thumb && <img className="report-card__media-img" src={thumb} alt="" />}
            <span className="report-card__media-scrim" />
            <span className="report-card__media-label mono">
              {project.media?.[0]?.label ?? project.title}
            </span>
            <span className="report-card__media-play">
              <Play size={26} />
            </span>
            <span className="report-card__media-scan" />
          </div>
        )}
      </motion.div>
    </article>
  )
}
