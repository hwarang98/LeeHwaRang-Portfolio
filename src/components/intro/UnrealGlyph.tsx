import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

// ---------------------------------------------------------------------------
// Unreal Engine emblem — 파티클 소스
//
// 폰트 U(TextGeometry)나 외부 3D 모델을 쓰지 않는다.
// 공식 Unreal Engine 로고의 실제 SVG path 를 SVGLoader 로 파싱해 Shape(홀 포함)으로
// 만들고, 그 면적을 채우는 파티클 위치를 샘플링한다.
// 엠블럼은 금속 메시가 아니라 파티클 형태로 계속 유지된다.
//
// SVG 는 y-down 이므로 y 를 뒤집어(THREE y-up) 배치한다.
// path 출처: 공식 Unreal Engine 로고 마크 (개인 포트폴리오/학습용 사용).
// ---------------------------------------------------------------------------

const SVG_MARKUP =
  '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm0 23.52A11.52 11.52 0 1123.52 12 11.52 11.52 0 0112 23.52zm7.13-9.791c-.206.997-1.126 3.557-4.06 4.942l-1.179-1.325-1.988 2a7.338 7.338 0 01-5.804-2.978 2.859 2.859 0 00.65.123c.326.006.678-.114.678-.66v-5.394a.89.89 0 00-1.116-.89c-.92.212-1.656 2.509-1.656 2.509a7.304 7.304 0 012.528-5.597 7.408 7.408 0 013.73-1.721c-1.006.573-1.57 1.507-1.57 2.29 0 1.262.76 1.109.984.923v7.28a1.157 1.157 0 00.148.256 1.075 1.075 0 00.88.445c.76 0 1.747-.868 1.747-.868V9.172c0-.6-.452-1.324-.905-1.572 0 0 .838-.149 1.484.346a5.537 5.537 0 01.387-.425c1.508-1.48 2.929-1.902 4.112-2.112 0 0-2.151 1.69-2.151 3.96 0 1.687.043 5.801.043 5.801.799.771 1.986-.342 3.059-1.441Z"/></svg>'

const TARGET_HEIGHT = 3.2

interface Emblem {
  shapes: THREE.Shape[]
  cx: number
  cy: number
  scale: number
}

let cachedEmblem: Emblem | null = null

/** 공식 로고 SVG 를 파싱해 Shape 배열 + 정규화 파라미터를 캐시해 반환 */
export function getEmblem(): Emblem {
  if (cachedEmblem) return cachedEmblem

  const loader = new SVGLoader()
  const data = loader.parse(SVG_MARKUP)

  const shapes: THREE.Shape[] = []
  for (const path of data.paths) {
    for (const shape of path.toShapes()) {
      shapes.push(shape)
    }
  }

  // 전체 2D 바운딩 박스 (외곽 + 홀 포함)로 중앙/스케일 산출
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  const acc = (p: THREE.Vector2) => {
    minX = Math.min(minX, p.x)
    maxX = Math.max(maxX, p.x)
    minY = Math.min(minY, p.y)
    maxY = Math.max(maxY, p.y)
  }
  for (const shape of shapes) {
    shape.getPoints(24).forEach(acc)
    for (const hole of shape.holes) hole.getPoints(24).forEach(acc)
  }

  cachedEmblem = {
    shapes,
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2,
    scale: TARGET_HEIGHT / (maxY - minY),
  }
  return cachedEmblem
}

/** SVG(2D) 좌표를 월드 좌표로 변환 (중앙정렬 + 스케일 + Y 반전) */
function toWorldXY(x: number, y: number, cx: number, cy: number, scale: number) {
  return [(x - cx) * scale, -(y - cy) * scale] as const
}

/**
 * 로고 면 전체를 채우는 파티클 위치(Float32Array, xyz).
 * ShapeGeometry(홀 포함)를 삼각분할해 면적 가중 랜덤 샘플링한다.
 */
export function getEmblemParticlePositions(count: number): Float32Array {
  const { shapes, cx, cy, scale } = getEmblem()
  const geo = new THREE.ShapeGeometry(shapes, 20)
  const pos = geo.attributes.position as THREE.BufferAttribute
  const index = geo.index
  const tris: ArrayLike<number> = index
    ? (index.array as ArrayLike<number>)
    : Array.from({ length: pos.count }, (_v, i) => i)
  const triCount = Math.floor(tris.length / 3)

  // 삼각형 면적 누적 분포
  const cum = new Float32Array(triCount)
  let total = 0
  for (let i = 0; i < triCount; i++) {
    const i0 = tris[i * 3]
    const i1 = tris[i * 3 + 1]
    const i2 = tris[i * 3 + 2]
    const ax = pos.getX(i0)
    const ay = pos.getY(i0)
    const bx = pos.getX(i1)
    const by = pos.getY(i1)
    const csx = pos.getX(i2)
    const csy = pos.getY(i2)
    const area = Math.abs((bx - ax) * (csy - ay) - (csx - ax) * (by - ay)) / 2
    total += area
    cum[i] = total
  }

  const out = new Float32Array(count * 3)
  for (let s = 0; s < count; s++) {
    // 면적 가중 삼각형 선택
    const r = Math.random() * total
    let lo = 0
    let hi = triCount - 1
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (cum[mid] < r) lo = mid + 1
      else hi = mid
    }
    const i0 = tris[lo * 3]
    const i1 = tris[lo * 3 + 1]
    const i2 = tris[lo * 3 + 2]
    const ax = pos.getX(i0)
    const ay = pos.getY(i0)
    const bx = pos.getX(i1)
    const by = pos.getY(i1)
    const csx = pos.getX(i2)
    const csy = pos.getY(i2)

    // 삼각형 내부 균등 랜덤 (barycentric)
    let u = Math.random()
    let v = Math.random()
    if (u + v > 1) {
      u = 1 - u
      v = 1 - v
    }
    const px = ax + u * (bx - ax) + v * (csx - ax)
    const py = ay + u * (by - ay) + v * (csy - ay)
    const [wx, wy] = toWorldXY(px, py, cx, cy, scale)
    out[s * 3] = wx
    out[s * 3 + 1] = wy
    out[s * 3 + 2] = (Math.random() - 0.5) * 0.1
  }

  geo.dispose()
  return out
}
