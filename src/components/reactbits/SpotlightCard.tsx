import { useRef, type ReactNode, type MouseEvent } from 'react'

// React Bits — SpotlightCard (CSS variant). 마우스를 따라오는 스포트라이트 글로우.
// 선택 가능한 시스템/프로필 패널에 사용.
// tilt=true 면 마우스를 따라 카드가 살짝 기우는 3D 효과가 함께 적용된다.

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
  /** 마우스를 따라 카드가 기우는 3D tilt 효과 */
  tilt?: boolean
  /** tilt 최대 각도(deg) */
  tiltMax?: number
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(34, 193, 195, 0.12)',
  tilt = false,
  tiltMax = 5,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = divRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--rb-spot-x', `${x}px`)
    el.style.setProperty('--rb-spot-y', `${y}px`)
    el.style.setProperty('--rb-spot-color', spotlightColor)

    if (!tilt || rect.width === 0 || rect.height === 0) return
    const px = x / rect.width - 0.5
    const py = y / rect.height - 0.5
    el.style.setProperty('--rb-rot-y', `${px * tiltMax * 2}deg`)
    el.style.setProperty('--rb-rot-x', `${-py * tiltMax * 2}deg`)
  }

  const handleMouseLeave = () => {
    const el = divRef.current
    if (!el || !tilt) return
    el.style.setProperty('--rb-rot-x', '0deg')
    el.style.setProperty('--rb-rot-y', '0deg')
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`rb-spotlight-card ${tilt ? 'rb-spotlight-card--tilt' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
