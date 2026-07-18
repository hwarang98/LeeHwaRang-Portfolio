import { useRef, useEffect } from 'react'

// React Bits — LetterGlitch (CSS variant, no three.js). Canvas 2D only.
// 배경으로 아주 약하게 깔리는 문자 노이즈. opacity는 사용처(App.css)에서 낮춘다.

interface LetterGlitchProps {
  glitchColors?: string[]
  glitchSpeed?: number
  centerVignette?: boolean
  outerVignette?: boolean
  smooth?: boolean
  className?: string
}

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$&*()-_+=/[]{};:<>.,0123456789'

export default function LetterGlitch({
  glitchColors = ['#1b2733', '#22c1c3', '#2b3946'],
  glitchSpeed = 60,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  className,
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const letters = useRef<
    { char: string; color: string; targetColor: string; colorProgress: number }[]
  >([])
  const grid = useRef({ columns: 0, rows: 0 })
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const lastGlitchTime = useRef(Date.now())

  const fontSize = 16
  const charWidth = 10
  const charHeight = 20

  const getRandomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)]
  const getRandomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)]

  const hexToRgb = (hex: string) => {
    const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    const full = hex.replace(shorthand, (_m, r, g, b) => r + r + g + g + b + b)
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
  }

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number,
  ) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    }
    return `rgb(${result.r}, ${result.g}, ${result.b})`
  }

  const calculateGrid = (width: number, height: number) => ({
    columns: Math.ceil(width / charWidth),
    rows: Math.ceil(height / charHeight),
  })

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows }
    const total = columns * rows
    letters.current = Array.from({ length: total }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }))
  }

  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return
    const ctx = context.current
    const { width, height } = canvasRef.current!.getBoundingClientRect()
    ctx.clearRect(0, 0, width, height)
    ctx.font = `${fontSize}px "JetBrains Mono", monospace`
    ctx.textBaseline = 'top'

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth
      const y = Math.floor(index / grid.current.columns) * charHeight
      ctx.fillStyle = letter.color
      ctx.fillText(letter.char, x, y)
    })
  }

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    const parent = containerRef.current
    if (!canvas || !parent) return
    const dpr = window.devicePixelRatio || 1
    const rect = parent.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    if (context.current) context.current.setTransform(dpr, 0, 0, dpr, 0, 0)

    const { columns, rows } = calculateGrid(rect.width, rect.height)
    initializeLetters(columns, rows)
    drawLetters()
  }

  const updateLetters = () => {
    if (!letters.current.length) return
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05))
    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length)
      const letter = letters.current[index]
      if (!letter) continue
      letter.char = getRandomChar()
      letter.targetColor = getRandomColor()
      if (!smooth) {
        letter.color = letter.targetColor
        letter.colorProgress = 1
      } else {
        letter.colorProgress = 0
      }
    }
  }

  const handleSmoothTransitions = () => {
    let needsRedraw = false
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05
        if (letter.colorProgress > 1) letter.colorProgress = 1
        const start = hexToRgb(letter.color)
        const end = hexToRgb(letter.targetColor)
        if (start && end) {
          letter.color = interpolateColor(start, end, letter.colorProgress)
          needsRedraw = true
        }
      }
    })
    if (needsRedraw) drawLetters()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    context.current = canvas.getContext('2d')
    resizeCanvas()

    const animate = () => {
      const now = Date.now()
      if (now - lastGlitchTime.current >= glitchSpeed) {
        updateLetters()
        drawLetters()
        lastGlitchTime.current = now
      }
      if (smooth) handleSmoothTransitions()
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    let resizeTimeout: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationRef.current)
        resizeCanvas()
        animate()
      }, 100)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth, glitchColors])

  return (
    <div ref={containerRef} className={`rb-letter-glitch ${className ?? ''}`}>
      <canvas ref={canvasRef} className="rb-letter-glitch__canvas" />
      {outerVignette && <div className="rb-letter-glitch__vignette-outer" />}
      {centerVignette && <div className="rb-letter-glitch__vignette-center" />}
    </div>
  )
}
