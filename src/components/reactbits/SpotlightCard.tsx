import { useRef, type ReactNode, type MouseEvent } from 'react'

// React Bits — SpotlightCard (CSS variant). 마우스를 따라오는 스포트라이트 글로우.
// 선택 가능한 시스템/프로젝트 패널에 사용.

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(34, 193, 195, 0.12)',
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = divRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--rb-spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--rb-spot-y', `${e.clientY - rect.top}px`)
    el.style.setProperty('--rb-spot-color', spotlightColor)
  }

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} className={`rb-spotlight-card ${className}`}>
      {children}
    </div>
  )
}
