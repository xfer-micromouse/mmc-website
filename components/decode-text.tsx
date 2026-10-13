"use client"

import { useEffect, useRef, useState } from "react"

const GLYPHS = "01<>/#$%&*+=?[]{}"
const FRAME_MS = 28
const FRAMES = 22

/**
 * Text that "decodes" from random glyphs the first time it scrolls into view.
 * Screen readers always get the real text; motion-reduced users see it as is.
 */
export function DecodeText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(text)

  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let timer: ReturnType<typeof setInterval> | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        let frame = 0
        timer = setInterval(() => {
          frame++
          const solved = Math.floor((frame / FRAMES) * text.length)
          setShown(
            [...text]
              .map((ch, i) => (i < solved || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
              .join("")
          )
          if (frame >= FRAMES) {
            clearInterval(timer)
            setShown(text)
          }
        }, FRAME_MS)
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      clearInterval(timer)
    }
  }, [text])

  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {shown}
      </span>
    </>
  )
}
