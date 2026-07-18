import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

// React Bits — AnimatedContent (CSS variant · framer/GSAP 불필요).
// children 을 mount / scroll 진입 / 외부 트리거 시 direction·distance·scale·opacity 로
// 부드럽게 등장시키는 래퍼.
//
// 구현 노트: 전체 페이지처럼 sticky/fixed 를 품는 큰 래퍼에도 안전하도록,
// framer 의 지속 transform 대신 CSS 트랜지션으로 등장시키고 "완료 후 transform 을
// 제거"한다. (transform 이 남아 있으면 하위 sticky/fixed 가 깨지기 때문)
//
// 이 프로젝트에서는 인트로(U 로고) 종료 시 메인 UI 를 scale 0.8→1, opacity 0→1 로
// 등장시키는 데 사용한다.

type CubicBezier = [number, number, number, number]

interface AnimatedContentProps {
  children: ReactNode
  /** 등장 시 이동 거리(px) */
  distance?: number
  direction?: 'vertical' | 'horizontal'
  reverse?: boolean
  /** 초 단위 */
  duration?: number
  /** cubic-bezier 튜플 */
  ease?: CubicBezier
  initialOpacity?: number
  animateOpacity?: boolean
  /** 시작 스케일 (1 로 확대되어 들어옴) */
  scale?: number
  /** view 모드에서 뷰포트 진입 임계값 */
  threshold?: number
  /** 초 단위 지연 */
  delay?: number
  className?: string
  /** 'view' = 화면에 들어올 때, 'trigger' = trigger prop 이 true 가 될 때 */
  animateOn?: 'view' | 'trigger'
  trigger?: boolean
  onComplete?: () => void
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function AnimatedContent({
  children,
  distance = 0,
  direction = 'vertical',
  reverse = false,
  duration = 0.7,
  ease = [0.22, 1, 0.36, 1],
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  className,
  animateOn = 'view',
  trigger = false,
  onComplete,
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()
  const [visible, setVisible] = useState(false)
  const [settled, setSettled] = useState(reduced) // reduced-motion 은 애니메이션 없이 바로 정착

  // view 모드: 뷰포트 진입 시 1회
  useEffect(() => {
    if (settled || animateOn !== 'view') return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true)
            io.disconnect()
          }
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [animateOn, threshold, settled])

  // trigger 모드: trigger 가 true 가 되면 등장
  useEffect(() => {
    if (settled || animateOn !== 'trigger') return
    if (trigger) {
      // 다음 프레임에 켜서 hidden→visible 트랜지션이 실제로 일어나게 함
      const id = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(id)
    }
  }, [animateOn, trigger, settled])

  const horizontal = direction === 'horizontal'
  const offset = reverse ? -distance : distance
  const tx = horizontal ? offset : 0
  const ty = horizontal ? 0 : offset
  const cssEase = `cubic-bezier(${ease.join(', ')})`

  let style: CSSProperties
  if (settled) {
    // transform 완전히 제거 → 하위 sticky/fixed 정상 동작
    style = {}
  } else if (visible) {
    style = {
      opacity: 1,
      transform: 'translate(0px, 0px) scale(1)',
      transition: `opacity ${duration}s ${cssEase} ${delay}s, transform ${duration}s ${cssEase} ${delay}s`,
      willChange: 'transform, opacity',
    }
  } else {
    style = {
      opacity: animateOpacity ? initialOpacity : 1,
      transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
      willChange: 'transform, opacity',
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onTransitionEnd={(e) => {
        // 자식에서 버블된 transitionend 는 무시하고, 이 래퍼 자신의 전환만 처리
        if (e.target !== e.currentTarget) return
        if (!settled && visible && (e.propertyName === 'transform' || e.propertyName === 'opacity')) {
          setSettled(true)
          onComplete?.()
        }
      }}
    >
      {children}
    </div>
  )
}
