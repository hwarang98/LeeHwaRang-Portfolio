import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import './App.css'
import Hero from './components/Hero'
import ProjectArchive from './components/ProjectArchive'
import ProfileDock from './components/ProfileDock'
import CursorGrid from './components/reactbits/CursorGrid'
import AnimatedContent from './components/reactbits/AnimatedContent'
import { shouldPlayIntro } from './components/intro/shouldPlayIntro'

// Three.js 인트로는 지연 로드해 초기 번들 및 실패 격리. 로드/렌더 실패해도 메인은 유지된다.
const BootIntro = lazy(() => import('./components/intro/BootIntro'))

/** 인트로(청크 로드 실패 포함) 오류 시 메인이 항상 보이도록 격리 */
class IntroBoundary extends Component<
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

export default function App() {
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // 최초 진입 시에만 Three.js 인트로를 재생. reduced-motion / WebGL 미지원이면 생략.
  // 종료되면 오버레이가 언마운트되어 Canvas 가 DOM 에서 완전히 제거된다.
  const [introActive, setIntroActive] = useState(shouldPlayIntro)
  // 메인 UI 등장(scale 0.8→1, opacity 0→1) 트리거. 인트로 종료(확산 시작) 시 켜진다.
  const [revealMain, setRevealMain] = useState(false)

  // 인트로가 없는 환경(reduced-motion / WebGL 미지원)에서는 바로 등장시킨다.
  useEffect(() => {
    if (!introActive) setRevealMain(true)
    // 최초 1회만 판단
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scrollTo = (el: HTMLElement | null) => {
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <CursorGrid
        className="bg-grid"
        color="#46c9bd"
        cellSize={54}
        radius={170}
        falloff="smooth"
        maxOpacity={0.42}
        gridOpacity={0.05}
        lineWidth={1}
        holdTime={300}
        fadeDuration={700}
        clickPulse
      />
      {introActive && (
        <IntroBoundary
          onError={() => {
            setIntroActive(false)
            setRevealMain(true)
          }}
        >
          <Suspense fallback={null}>
            <BootIntro
              onFinish={() => setIntroActive(false)}
              onExit={() => setRevealMain(true)}
            />
          </Suspense>
        </IntroBoundary>
      )}
      <AnimatedContent
        className="app-reveal"
        animateOn="trigger"
        trigger={revealMain}
        distance={0}
        scale={0.8}
        initialOpacity={0}
        animateOpacity
        duration={0.7}
      >
        <div className="archive-app">
        <header className="topbar">
          <span className="topbar__brand mono">
            <span className="topbar__mark">◄►</span> UE_CASE_ARCHIVE
          </span>
          <span className="topbar__path mono muted">/hwarang98/portfolio</span>
          <span className="topbar__ver mono muted">v3.0 · interactive</span>
        </header>

        <main className="archive-main">
          <Hero
            onViewProjects={() => scrollTo(projectsRef.current)}
            onContact={() => scrollTo(contactRef.current)}
          />

          <div ref={projectsRef}>
            <ProjectArchive />
          </div>

          <section ref={contactRef}>
            <ProfileDock />
          </section>
        </main>

        <footer className="archive-footer mono muted">
          <span>© {new Date().getFullYear()} LEE HWA RANG</span>
          <span>Interactive Unreal Case Archive</span>
          <span className="archive-footer__blink">READY_</span>
        </footer>
        </div>
      </AnimatedContent>
    </>
  )
}
