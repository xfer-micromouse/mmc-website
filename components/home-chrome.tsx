"use client"

import { useEffect, useRef, useState } from "react"
import { cellPath, loadMaze, MAZE_SIZE, wallPath, type Cell } from "@/lib/maze"
import { homeSections, type HomeSectionId } from "@/lib/config"
import { cn } from "@/lib/utils"

interface Via {
  id: HomeSectionId
  x: number
  y: number
}

/** Rail x positions: mobile left edge, desktop alternates two lanes with 45° jogs. */
function railX(wrapper: HTMLElement) {
  const first = wrapper.querySelector<HTMLElement>("[data-section] > div")
  if (!first || window.innerWidth < 768) return { a: 18, b: 18 }
  const left = first.getBoundingClientRect().left - wrapper.getBoundingClientRect().left
  const a = Math.max(18, left - 40)
  return { a, b: a + 14 }
}

function buildTrace(wrapper: HTMLElement) {
  const { a, b } = railX(wrapper)
  const vias: Via[] = []
  for (const s of homeSections) {
    const el = document.getElementById(s.id)
    if (!el) continue
    const label = el.querySelector(".silkscreen")
    const y = label
      ? label.getBoundingClientRect().top - wrapper.getBoundingClientRect().top + 8
      : el.offsetTop
    vias.push({ id: s.id, x: vias.length % 2 === 0 ? a : b, y })
  }
  if (vias.length === 0) return { d: "", vias }

  const jog = Math.abs(b - a)
  let d = `M${vias[0].x} ${vias[0].y - 120}V${vias[0].y}`
  for (let i = 1; i < vias.length; i++) {
    const prev = vias[i - 1]
    const via = vias[i]
    const mid = (prev.y + via.y) / 2
    d += `V${mid - jog / 2}L${via.x} ${mid + jog / 2}V${via.y}`
  }
  return { d, vias }
}

// Section cells sit along the solution of the maze the hero starts with.
const miniMaze = loadMaze(0)
const route = miniMaze.solution
const sectionCells: Cell[] = homeSections.map((_, i) =>
  i === homeSections.length - 1
    ? route[route.length - 1]
    : route[Math.round(((i + 1) * (route.length - 1)) / homeSections.length)]
)

export function HomeChrome({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [trace, setTrace] = useState<{ d: string; vias: Via[]; height: number }>({ d: "", vias: [], height: 0 })
  const [visited, setVisited] = useState<Set<HomeSectionId>>(new Set())

  // Lay the trace over the real section positions; redo on any layout change.
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const update = () => setTrace({ ...buildTrace(wrapper), height: wrapper.scrollHeight })
    update()
    const observer = new ResizeObserver(update)
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [])

  // A section is visited (and its via lights up) once it reaches mid-screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          el.dataset.lit = "true"
          setVisited((prev) => (prev.has(el.id as HomeSectionId) ? prev : new Set(prev).add(el.id as HomeSectionId)))
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    for (const s of homeSections) {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} className="relative">
      {children}

      <svg
        className="pointer-events-none absolute left-0 top-0 w-full overflow-visible"
        height={trace.height}
        aria-hidden="true"
      >
        <path d={trace.d} className="stroke-accent/25" strokeWidth="2" fill="none" />
        <path d={trace.d} pathLength={1} className="trace-draw stroke-accent" strokeWidth="2" fill="none" />
        {trace.vias.map((via) => (
          <circle
            key={via.id}
            cx={via.x}
            cy={via.y}
            r="5"
            strokeWidth="2"
            className={cn(
              "transition-colors duration-500",
              visited.has(via.id) ? "fill-signal stroke-signal" : "fill-background stroke-accent"
            )}
          />
        ))}
      </svg>

      {trace.d && (
        <div
          className="trace-mouse pointer-events-none absolute left-0 top-0 h-3 w-3 rounded-[3px_3px_6px_6px] bg-foreground shadow-[0_0_10px_rgb(var(--signal)/0.7)]"
          style={{ offsetPath: `path("${trace.d}")` }}
          aria-hidden="true"
        />
      )}

      <MiniMap visited={visited} />
    </div>
  )
}

const MINI_CELL = 6

function MiniMap({ visited }: { visited: Set<HomeSectionId> }) {
  const lastVisited = Math.max(-1, ...homeSections.map((s, i) => (visited.has(s.id) ? i : -1)))
  const routeEnd = lastVisited < 0 ? 0 : route.findIndex(([x, y]) => x === sectionCells[lastVisited][0] && y === sectionCells[lastVisited][1])
  const size = MAZE_SIZE * MINI_CELL

  return (
    <nav
      aria-label="Mini-mapa sekcija"
      className="fixed bottom-4 right-4 z-30 hidden rounded-md border border-border bg-floor/90 p-2 backdrop-blur lg:block"
    >
      <svg viewBox={`-1 -1 ${size + 2} ${size + 2}`} width={size + 2} height={size + 2}>
        <rect x="0" y="0" width={size} height={size} className="stroke-accent" strokeWidth="0.8" fill="none" />
        <path d={wallPath(miniMaze, MINI_CELL)} className="stroke-accent/50" strokeWidth="0.6" fill="none" />
        <path d={cellPath(route, MINI_CELL)} className="stroke-muted/25" strokeWidth="1" fill="none" />
        {routeEnd > 0 && (
          <path d={cellPath(route.slice(0, routeEnd + 1), MINI_CELL)} className="stroke-signal" strokeWidth="1.2" fill="none" />
        )}
        {homeSections.map((s, i) => {
          const [x, y] = sectionCells[i]
          const isGoal = i === homeSections.length - 1
          const lit = visited.has(s.id)
          return (
            <a key={s.id} href={`#${s.id}`} aria-label={isGoal ? "Prijavi tim" : s.label}>
              <title>{isGoal ? "Prijavi tim" : `${s.designator} ${s.label}`}</title>
              <rect
                x={x * MINI_CELL + 0.75}
                y={y * MINI_CELL + 0.75}
                width={MINI_CELL - 1.5}
                height={MINI_CELL - 1.5}
                className={cn(
                  "transition-colors",
                  lit ? "fill-signal" : isGoal ? "fill-accent-soft" : "fill-accent"
                )}
              />
            </a>
          )
        })}
      </svg>
    </nav>
  )
}
