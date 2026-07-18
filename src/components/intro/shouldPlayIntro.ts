// three / R3F 를 import 하지 않는 순수 가드 모듈.
// App 이 이 함수를 동기 호출해도 Three.js 코드가 초기 번들에 끌려오지 않는다.
// (BootIntro 는 React.lazy 로 분리 로드된다.)

/** 인트로를 재생해도 되는 환경인지 판단 */
export function shouldPlayIntro(): boolean {
  if (typeof window === 'undefined') return false

  // prefers-reduced-motion 사용자는 건너뛴다
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false

  // WebGL 지원 여부 확인 — 실패하면 인트로 없이 메인으로
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    return !!gl
  } catch {
    return false
  }
}
