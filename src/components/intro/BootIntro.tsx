import {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import IntroParticles from './IntroParticles'
import './intro.css'

// ---------------------------------------------------------------------------
// BootIntro — Unreal U glyph 부트 인트로 오버레이 (Three.js 전용, 격리)
//
// 타임라인:
//   0.0s  검은 화면
//   0.4s  파티클이 로고 윤곽을 따라 모임
//   1.0s  Unreal U glyph 가 금속 실루엣으로 드러남
//   1.6s  cyan edge scan light 가 외곽을 훑음
//   1.6s  cyan edge scan 이 살짝 훑음
//   2.4s  멈춤 없이 — 카메라가 계속 확대되는 동안 파티클이 바깥으로 퍼지며(disperse)
//         배경이 걷히고 메인이 확대되며 진입
//
// - 클릭 / Enter / Escape / SKIP 버튼으로 즉시 스킵 (역시 파티클 퍼짐으로 전환)
// - prefers-reduced-motion, WebGL 미지원 시엔 애초에 렌더하지 않음(shouldPlayIntro)
// - 종료 시 오버레이 언마운트 → Three.js Canvas 가 DOM 에서 완전히 제거됨
// - Loader / useProgress 없음
// ---------------------------------------------------------------------------

// 확산 시작(=확대 도중). 카메라 확대와 파티클 확산이 끊김 없이 이어지도록 앞당김.
const INTRO_DURATION_MS = 2400
// 파티클이 퍼지며 메인이 드러나는 전환 시간 (IntroParticles 의 DISPERSE_SEC 와 맞춤)
const DISPERSE_MS = 950

const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2

/**
 * 카메라 확대. 윈도우(1.4s→3.4s)가 확산 구간(2.4s~)과 겹쳐서,
 * 확대가 멈추는 지점 없이 확산과 동시에 계속 진행된다.
 */
function CameraApproach({ startTime }: { startTime: number }) {
  useFrame((state) => {
    const t = (performance.now() - startTime) / 1000
    const approach = THREE.MathUtils.clamp((t - 1.4) / 2.0, 0, 1)
    const e = easeInOutCubic(approach)
    state.camera.position.z = 7 - e * 3.6 // 7 → 3.4 (확산 중에도 계속 확대)
    state.camera.position.y = e * 0.4 // 카운터(중앙 빈 공간) 쪽으로 살짝 상승
    state.camera.lookAt(0, 0.15, 0)
  })
  return null
}

/** Canvas 내부 WebGL 런타임 오류 시에도 메인이 보이도록 즉시 종료 */
class CanvasErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onError()
  }
  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

interface BootIntroProps {
  onFinish: () => void
  /** 파티클 확산(종료 전환)이 시작될 때 — 메인 UI 등장을 이 시점에 동기화한다 */
  onExit?: () => void
}

export default function BootIntro({ onFinish, onExit }: BootIntroProps) {
  const [dispersing, setDispersing] = useState(false)
  const [disperseStart, setDisperseStart] = useState<number | null>(null)
  const startTime = useMemo(() => performance.now(), [])
  const finishedRef = useRef(false)

  const finish = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    // 파티클을 바깥으로 퍼뜨리고, 배경을 걷어 메인이 드러나게 한 뒤 언마운트
    setDisperseStart(performance.now())
    setDispersing(true)
    onExit?.() // 메인 UI 등장(scale 0.8→1, opacity 0→1) 시작
    window.setTimeout(onFinish, DISPERSE_MS)
  }, [onFinish, onExit])

  useEffect(() => {
    const autoTimer = window.setTimeout(finish, INTRO_DURATION_MS)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape') finish()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(autoTimer)
      window.removeEventListener('keydown', onKey)
    }
  }, [finish])

  return (
    <div
      className={`boot-intro ${dispersing ? 'boot-intro--dispersing' : ''}`}
      onClick={finish}
      role="presentation"
    >
      {/* 어두운 배경 레이어 — disperse 때 이 레이어만 걷혀 메인이 드러난다 (canvas 는 유지) */}
      <div className="boot-intro__bg" aria-hidden="true" />

      <div className="boot-intro__stage">
        <div className="boot-intro__pool" aria-hidden="true" />
        <CanvasErrorBoundary onError={finish}>
          <Canvas
            camera={{ position: [0, 0, 7], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0)
            }}
          >
            {/* 엠블럼은 금속 메시가 아니라 파티클로 유지되다가, 종료 시 바깥으로 퍼진다. */}
            <IntroParticles startTime={startTime} disperseStart={disperseStart} />
            <CameraApproach startTime={startTime} />
          </Canvas>
        </CanvasErrorBoundary>

        <div className="boot-intro__vignette" aria-hidden="true" />
        <div className="boot-intro__caption mono">
          <span className="boot-intro__dot" /> initializing engine…
        </div>
      </div>

      <button
        className="boot-intro__skip mono"
        onClick={(e) => {
          e.stopPropagation()
          finish()
        }}
      >
        SKIP →
      </button>
    </div>
  )
}
