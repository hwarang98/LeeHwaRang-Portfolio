import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 인트로에서 쓰는 three 의 deep import(SVGLoader)를 미리 최적화해
  // dev 서버가 새 의존성 때문에 로드 실패하는 것을 방지한다.
  optimizeDeps: {
    include: ['three', 'three/examples/jsm/loaders/SVGLoader.js'],
  },
})
