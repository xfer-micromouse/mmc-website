"use client"

import { useEffect } from "react"

/**
 * Publishes the pointer position as --mx/--my on <html> (once per frame) for
 * the spotlight borders and the goal grid glow. Mouse/pen only.
 */
export function PointerGlow() {
  useEffect(() => {
    const root = document.documentElement
    let frame = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${e.clientX}px`)
        root.style.setProperty("--my", `${e.clientY}px`)
      })
    }
    const onLeave = () => {
      root.style.setProperty("--mx", "-1000px")
      root.style.setProperty("--my", "-1000px")
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
      onLeave()
    }
  }, [])

  return null
}
