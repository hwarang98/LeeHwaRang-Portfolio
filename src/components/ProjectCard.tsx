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

  return (
    <article
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
