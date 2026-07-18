import type { CaseSection } from '../data/projects'
import AnimatedContent from './reactbits/AnimatedContent'

interface FloatingCaseTocProps {
  sections: CaseSection[]
  hasMedia: boolean
  activeSection?: string
  onJump: (key: string) => void
  visible: boolean
  accent: 'cyan' | 'amber'
}

// 상단 .case-full__tabs 가 화면 밖으로 사라졌을 때만 우측에 나타나는 floating 목차.
// 조건부 mount(visible) + React Bits AnimatedContent 로 opacity 0→1 등장.
export default function FloatingCaseToc({
  sections,
  hasMedia,
  activeSection,
  onJump,
  visible,
  accent,
}: FloatingCaseTocProps) {
  if (!visible) return null

  const items: { key: string; label: string }[] = [
    ...(hasMedia ? [{ key: 'media', label: 'Media' }] : []),
    ...sections.map((s) => ({ key: s.key, label: s.label })),
  ]

  // 바깥 래퍼가 fixed + translateY(-50%) 로 위치를 잡고,
  // 안쪽 AnimatedContent 는 opacity 만 다뤄 위치 transform 과 충돌하지 않게 한다.
  return (
    <div className={`case-toc case-toc--${accent}`}>
      <AnimatedContent
        animateOn="trigger"
        trigger={visible}
        initialOpacity={0}
        animateOpacity
        distance={0}
        duration={0.22}
      >
        <nav aria-label="case sections" className="case-toc__inner mono">
          <span className="case-toc__label">INDEX</span>
          <ul className="case-toc__list">
            {items.map((it, i) => (
              <li key={it.key}>
                <button
                  type="button"
                  className={`case-toc__item ${
                    activeSection === it.key ? 'case-toc__item--active' : ''
                  }`}
                  onClick={() => onJump(it.key)}
                  title={it.label}
                >
                  <span className="case-toc__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="case-toc__text">{it.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </AnimatedContent>
    </div>
  )
}
