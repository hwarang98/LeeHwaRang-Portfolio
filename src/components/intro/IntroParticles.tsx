import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getEmblemParticlePositions } from './UnrealGlyph'

// ---------------------------------------------------------------------------
// Intro particles — Unreal Engine 엠블럼을 입자로 형성/유지하다가,
// 종료 시 바깥으로 퍼지며(disperse) 흩어진다.
//
//   0.4s  흩어져 있던 파티클이 로고 면을 향해 모임
//   1.0s  엠블럼이 파티클로 완성 → 이후 유지 (은은한 shimmer)
//   1.6s  cyan scan 이 살짝 밝게 훑음
//   종료  disperseStart 가 설정되면 각자 바깥 방향으로 퍼지며 사라짐
//
// 금속 메시로 굳지 않는다. glyph 는 끝까지 파티클이다.
// ---------------------------------------------------------------------------

const COUNT = 2800
const DISPERSE_SEC = 0.95 // BootIntro 의 DISPERSE_MS 와 맞춤
const SPREAD = 8 // 퍼지는 최대 거리(월드 단위)

const CYAN = new THREE.Color('#46c9bd')
const AMBER = new THREE.Color('#d9a065')
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)

interface IntroParticlesProps {
  startTime: number
  /** 값이 있으면 그 시각부터 파티클이 바깥으로 퍼진다 */
  disperseStart: number | null
}

export default function IntroParticles({ startTime, disperseStart }: IntroParticlesProps) {
  const posAttrRef = useRef<THREE.BufferAttribute>(null)
  const matRef = useRef<THREE.PointsMaterial>(null)

  const { positions, starts, targets, colors, phases, dirs, speeds } = useMemo(() => {
    const targets = getEmblemParticlePositions(COUNT)
    const positions = new Float32Array(COUNT * 3)
    const starts = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const phases = new Float32Array(COUNT)
    const dirs = new Float32Array(COUNT * 3)
    const speeds = new Float32Array(COUNT)

    const c = new THREE.Color()
    for (let i = 0; i < COUNT; i++) {
      // 시작: 원형으로 흩어진 클라우드
      const a = Math.random() * Math.PI * 2
      const r = 3.4 + Math.random() * 3.0
      const sx = Math.cos(a) * r
      const sy = Math.sin(a) * r * 0.85
      const sz = (Math.random() - 0.5) * 4.5
      starts[i * 3] = sx
      starts[i * 3 + 1] = sy
      starts[i * 3 + 2] = sz
      positions[i * 3] = sx
      positions[i * 3 + 1] = sy
      positions[i * 3 + 2] = sz

      // 색: 대부분 muted cyan, 일부 amber 하이라이트
      c.copy(Math.random() < 0.16 ? AMBER : CYAN)
      const j = 0.75 + Math.random() * 0.35
      colors[i * 3] = c.r * j
      colors[i * 3 + 1] = c.g * j
      colors[i * 3 + 2] = c.b * j

      phases[i] = Math.random() * Math.PI * 2

      // 퍼짐 방향: 로고 중심(원점)에서 바깥으로 + 지터. 중앙 입자도 확실히 날아가게 함.
      const tx = targets[i * 3]
      const ty = targets[i * 3 + 1]
      let ox = tx + (Math.random() - 0.5) * 0.4
      let oy = ty + (Math.random() - 0.5) * 0.4
      let oz = (Math.random() - 0.5) * 1.6
      const len = Math.hypot(ox, oy, oz) || 1
      ox /= len
      oy /= len
      oz /= len
      dirs[i * 3] = ox
      dirs[i * 3 + 1] = oy
      dirs[i * 3 + 2] = oz
      speeds[i] = 0.65 + Math.random() * 0.9
    }

    return { positions, starts, targets, colors, phases, dirs, speeds }
  }, [])

  useFrame(() => {
    const now = performance.now()

    // --- 종료: 파티클 퍼짐 ---
    if (disperseStart !== null) {
      const d = (now - disperseStart) / 1000
      const p = THREE.MathUtils.clamp(d / DISPERSE_SEC, 0, 1)
      const push = easeOutCubic(p) * SPREAD

      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3
        const dist = push * speeds[i]
        positions[ix] = targets[ix] + dirs[ix] * dist
        positions[ix + 1] = targets[ix + 1] + dirs[ix + 1] * dist
        positions[ix + 2] = targets[ix + 2] + dirs[ix + 2] * dist
      }
      if (posAttrRef.current) posAttrRef.current.needsUpdate = true

      if (matRef.current) {
        matRef.current.opacity = (1 - p) * 0.9
        matRef.current.size = 0.03 + p * 0.02 // 퍼지며 살짝 커졌다 사라짐
      }
      return
    }

    // --- 진행: 수렴 + shimmer ---
    const t = (now - startTime) / 1000
    const conv = THREE.MathUtils.clamp((t - 0.35) / 0.65, 0, 1)
    const e = easeOutCubic(conv)

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3
      const ph = phases[i]
      const drift = e
      const dx = Math.sin(t * 1.25 + ph) * 0.011 * drift
      const dy = Math.cos(t * 1.05 + ph * 1.3) * 0.011 * drift
      const dz = Math.sin(t * 0.9 + ph * 0.7) * 0.02 * drift

      positions[ix] = starts[ix] + (targets[ix] - starts[ix]) * e + dx
      positions[ix + 1] = starts[ix + 1] + (targets[ix + 1] - starts[ix + 1]) * e + dy
      positions[ix + 2] = starts[ix + 2] + (targets[ix + 2] - starts[ix + 2]) * e + dz
    }
    if (posAttrRef.current) posAttrRef.current.needsUpdate = true

    if (matRef.current) {
      let opacity: number
      if (t < 0.3) opacity = 0
      else if (t < 0.55) opacity = (t - 0.3) / 0.25
      else opacity = 1

      const scan = THREE.MathUtils.clamp((t - 1.6) / 0.6, 0, 1)
      const pulse = Math.sin(scan * Math.PI)

      matRef.current.opacity = opacity * (0.82 + pulse * 0.18)
      matRef.current.size = 0.03 + pulse * 0.012
    }
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute ref={posAttrRef} attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.03}
        vertexColors
        transparent
        opacity={0}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
