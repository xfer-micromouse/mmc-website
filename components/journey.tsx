"use client"

import { memo, useEffect, useMemo, useRef, useState } from "react"
import { cellPath, hasPassage, isGoal, loadMaze, MAZE_SIZE, neighbours, START, type Cell, type Maze } from "@/lib/maze"
import { mazeLibrary } from "@/lib/maze-library"
import { startRun, stepRun, type Run } from "@/lib/flood-fill"
import { anchorsOf, buildTimeline, journeyAt, scrollForStop, settleTarget, type JourneyState, type JourneyTimeline } from "@/lib/journey"
import { homeSections, JOURNEY_STOPS, SPONSOR_CONTACT } from "@/lib/config"
import { RegisterButton } from "@/components/register-button"
import { buttonStyles } from "@/lib/ui"
import { cn } from "@/lib/utils"

/*
 * The home page journey: scrolling drives the mouse through an unknown maze.
 * Its five IR beams stop at the first real wall and light it up (walls are
 * copper traces with gold pads), flood-fill numbers fill in, and stops along
 * the way unlock the page sections. At the goal the camera pulls back and
 * the speed run draws itself.
 *
 * Scroll stays native. The picture eases towards the scroll position, and
 * after each gesture the page settles on the next chapter (lib/journey.ts).
 *
 * Modes: "pinned" (desktop, full-screen stage), "strip" (phones and tablets,
 * sticky maze strip above the text) and "static" (reduced motion or no JS:
 * plain column). The sections stay in normal DOM order in every mode.
 */

const CELL = 100
const PAD = 40
const EXTENT = MAZE_SIZE * CELL + PAD * 2
const NAV_HEIGHT = 64
const MAZE_ID = "taiwan2014f"
/** Cells visible across the short side of the screen when zoomed in */
const CLOSE_CELLS = 4.5
/** Simulated seconds per cell for the speed run stopwatch */
const SPEED_RUN_S_PER_CELL = 0.11
/** IR range in cells */
const IR_RANGE = 2.5
/** How fast the picture catches up with the scroll position (ms) */
const EASE_MS = 10
/** Chapter transition length (ms): short, starts at once, settles softly */
const GLIDE_MS = 5000 /*1000*/
/** A wheel event after this pause starts a new gesture; faster events belong to the same one (ms) */
const GESTURE_GAP_MS = 180
/** Once a transition is this far along, a new gesture continues to the next chapter instead of being ignored */
const INTERRUPTIBLE_AT = 0.7

/** Starts moving at once and settles softly, so a gesture gets an immediate response. */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Scripted chapter glide: slower and softer than the browser's smooth scroll.
 * Touch, key or pointer input hands control straight back; wheel input is
 * handled by the journey's chapter paging instead.
 */
function useGlide() {
  const state = useRef({ raf: 0, active: false, start: 0, ms: 1, to: 0 })
  useEffect(() => {
    const cancel = () => {
      cancelAnimationFrame(state.current.raf)
      state.current.active = false
    }
    const events = ["touchstart", "mousedown"] as const
    for (const e of events) window.addEventListener(e, cancel, { passive: true })
    return () => {
      cancel()
      for (const e of events) window.removeEventListener(e, cancel)
    }
  }, [])
  /** Glides to `y`, replacing any glide in progress. */
  const to = (y: number, ms = GLIDE_MS) => {
    cancelAnimationFrame(state.current.raf)
    const from = window.scrollY
    if (Math.abs(y - from) < 1) return
    Object.assign(state.current, { active: true, start: performance.now(), ms, to: y })
    const step = (now: number) => {
      const t = Math.min((now - state.current.start) / ms, 1)
      window.scrollTo({ top: from + (y - from) * easeOutCubic(t), behavior: "instant" })
      if (t < 1 && state.current.active) state.current.raf = requestAnimationFrame(step)
      else state.current.active = false
    }
    state.current.raf = requestAnimationFrame(step)
  }
  return {
    to,
    isActive: () => state.current.active,
    /** 0..1 through the current glide (1 when idle) */
    progress: () => (state.current.active ? Math.min((performance.now() - state.current.start) / state.current.ms, 1) : 1),
    /** Where the current glide is heading */
    destination: () => state.current.to,
  }
}

type Mode = "static" | "strip" | "pinned"
type Vec = [number, number]

const centre = ([x, y]: Cell): Vec => [PAD + x * CELL + CELL / 2, PAD + y * CELL + CELL / 2]

function explore(maze: Maze): Run[] {
  const frames = [startRun(maze)]
  let run = frames[0]
  while (run.phase === "explore" && frames.length < 1000) {
    run = stepRun(run)
    frames.push(run)
  }
  return frames
}

/** Shortest start-to-goal path through the cells the mouse actually saw. */
function seenShortestPath(maze: Maze, seen: boolean[][]): Cell[] {
  const key = ([x, y]: Cell) => y * MAZE_SIZE + x
  const prev = new Map<number, Cell | null>([[key(START), null]])
  const queue: Cell[] = [START]
  for (let i = 0; i < queue.length; i++) {
    const cell = queue[i]
    if (isGoal(...cell)) {
      const path: Cell[] = []
      for (let c: Cell | null = cell; c; c = prev.get(key(c)) ?? null) path.unshift(c)
      return path
    }
    for (const n of neighbours(cell)) {
      if (!prev.has(key(n)) && seen[n[1]][n[0]] && hasPassage(maze, cell, n)) {
        prev.set(key(n), cell)
        queue.push(n)
      }
    }
  }
  return maze.solution
}

/**
 * Distance (in cells) from point (px, py), in cell coordinates, along unit
 * direction (dx, dy) to the first real wall, walking the grid cell by cell.
 */
function castRay(maze: Maze, px: number, py: number, dx: number, dy: number): number {
  let cx = Math.floor(px)
  let cy = Math.floor(py)
  const stepX = Math.sign(dx)
  const stepY = Math.sign(dy)
  let tMaxX = stepX === 0 ? Infinity : ((stepX > 0 ? cx + 1 : cx) - px) / dx
  let tMaxY = stepY === 0 ? Infinity : ((stepY > 0 ? cy + 1 : cy) - py) / dy
  const tDeltaX = stepX === 0 ? Infinity : 1 / Math.abs(dx)
  const tDeltaY = stepY === 0 ? Infinity : 1 / Math.abs(dy)
  for (let i = 0; i < 16; i++) {
    const t = Math.min(tMaxX, tMaxY)
    if (t > IR_RANGE) return IR_RANGE
    if (tMaxX < tMaxY) {
      const nx = cx + stepX
      if (nx < 0 || nx >= MAZE_SIZE || maze.eastWall[cy][Math.min(cx, nx)]) return tMaxX
      cx = nx
      tMaxX += tDeltaX
    } else {
      const ny = cy + stepY
      if (ny < 0 || ny >= MAZE_SIZE || maze.southWall[Math.min(cy, ny)][cx]) return tMaxY
      cy = ny
      tMaxY += tDeltaY
    }
  }
  return IR_RANGE
}

const DIR_NAME: Record<string, string> = { "0,-1": "N", "1,0": "E", "0,1": "S", "-1,0": "W" }

/** Log lines with the frame they belong to: walls found, cells explored, sections unlocked. */
function buildLog(frames: Run[], stops: number[], stopNames: string[]) {
  const entries: { step: number; text: string }[] = [{ step: 0, text: "> mouse.init() ok, maze unknown" }]
  for (let k = 1; k < frames.length; k++) {
    const a = frames[k - 1].known
    const b = frames[k].known
    const [x, y] = frames[k].mouse
    const found: string[] = []
    for (const [dx, dy] of [[0, -1], [1, 0], [0, 1], [-1, 0]] as Vec[]) {
      const nx = x + dx
      const ny = y + dy
      if (nx < 0 || ny < 0 || nx >= MAZE_SIZE || ny >= MAZE_SIZE) continue
      const was = dy === 0 ? a.eastWall[y][Math.min(x, nx)] : a.southWall[Math.min(y, ny)][x]
      const now = dy === 0 ? b.eastWall[y][Math.min(x, nx)] : b.southWall[Math.min(y, ny)][x]
      if (now && !was) found.push(DIR_NAME[`${dx},${dy}`])
    }
    if (found.length) entries.push({ step: k, text: `> wall detected ${found.join(" ")}` })
    entries.push({ step: k, text: `> exploring cell (${x},${MAZE_SIZE - 1 - y}) dist=${frames[k].dist[y][x]}` })
    const stop = stops.indexOf(k)
    if (stop >= 0) entries.push({ step: k, text: `> unlocked: ${stopNames[stop]}` })
  }
  return entries
}

function useJourneyMode(): Mode {
  const [mode, setMode] = useState<Mode>("static")
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: no-preference)")
    const desktop = matchMedia("(min-width: 1024px) and (pointer: fine)")
    const update = () => setMode(!motion.matches ? "static" : desktop.matches ? "pinned" : "strip")
    update()
    motion.addEventListener("change", update)
    desktop.addEventListener("change", update)
    return () => {
      motion.removeEventListener("change", update)
      desktop.removeEventListener("change", update)
    }
  }, [])
  return mode
}

const INITIAL: JourneyState = { step: 0, zoomIn: 0, zoomOut: 0, speed: 0, stop: null, unlocked: 0, finished: false }

export function Journey({ children }: { children: React.ReactNode }) {
  const mode = useJourneyMode()
  const maze = useMemo(() => loadMaze(mazeLibrary.findIndex((m) => m.id === MAZE_ID)), [])
  const frames = useMemo(() => explore(maze), [maze])
  const last = frames.length - 1
  const stops = useMemo(
    () => Array.from({ length: JOURNEY_STOPS }, (_, i) => Math.round(((i + 1) / (JOURNEY_STOPS + 1)) * last)),
    [last]
  )
  const stopSections = homeSections.slice(0, JOURNEY_STOPS)
  const log = useMemo(() => {
    const names = stopSections.map((s) =>
      s.label.toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Z0-9]+/g, "_")
    )
    return buildLog(frames, stops, names)
  }, [frames, stops]) // eslint-disable-line react-hooks/exhaustive-deps
  const speedPath = useMemo(() => seenShortestPath(maze, frames[last].seen), [maze, frames, last])
  const speedSeconds = (speedPath.length - 1) * SPEED_RUN_S_PER_CELL
  const wallsFound = useMemo(() => {
    const { eastWall, southWall } = frames[last].known
    return eastWall.flat().filter(Boolean).length + southWall.flat().filter(Boolean).length
  }, [frames, last])

  const wrapperRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const refs = useStageRefs()
  const [timeline, setTimeline] = useState<JourneyTimeline | null>(null)
  const [state, setState] = useState<JourneyState>(INITIAL)
  const [active, setActive] = useState(false)
  const [hudHidden, setHudHidden] = useState(false)
  const glide = useGlide()

  // Timeline depends on the viewport height (dwells are measured in screens).
  useEffect(() => {
    if (mode !== "pinned") return
    const update = () => setTimeline(buildTimeline(window.innerHeight, last, stops))
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [mode, last, stops])

  // Scroll → picture. The scroll handler only reads; a frame loop eases the
  // shown position towards it and writes transforms, opacities and offsets.
  useEffect(() => {
    const wrapper = wrapperRef.current
    const stage = stageRef.current
    if (!wrapper || !stage || mode === "static") return
    if (mode === "pinned" && !timeline) return

    const anchors = timeline ? anchorsOf(timeline) : []
    // Resting stops for paging and settling: the hero (page top), then the chapters and the run
    // report. The bare maze start (anchors[0]) is skipped, so one step from the hero lands on
    // chapter 1 and the zoom-in plays during that transition.
    const pageStops = () => [-top, ...anchors.slice(1)]
    let top = 0
    let target = 0
    let shown = Number.NaN
    let raf = 0
    let lastTime = 0
    let lastStepInt = -1
    let lastPhase = ""
    let lastStop: number | null | undefined
    let gestureFrom: number | null = null
    let idle: ReturnType<typeof setTimeout> | undefined

    const measure = () => {
      top = wrapper.getBoundingClientRect().top + window.scrollY
    }
    const position = () => {
      if (mode === "pinned") return window.scrollY - top
      // Strip: progress through the text column below the sticky maze, as a share of the run.
      const span = Math.max(wrapper.offsetHeight - window.innerHeight * 0.6, 1)
      return Math.min(Math.max((window.scrollY + window.innerHeight * 0.4 - top) / span, 0), 1)
    }

    const stateAt = (s: number): JourneyState => {
      if (mode === "pinned" && timeline) return journeyAt(timeline, s)
      const step = s * last
      const done = s >= 1
      return { step, zoomIn: 1, zoomOut: done ? 1 : 0, speed: done ? 1 : 0, stop: null, unlocked: stops.filter((st) => step >= st).length, finished: done }
    }

    const paint = (s: number) => {
      const next = stateAt(s)
      paintStage(refs, stage, frames, maze, next, speedSeconds, mode === "pinned" ? NAV_HEIGHT : 0)

      // React re-renders only when something discrete changes.
      const stepInt = Math.floor(next.step)
      const phase = `${next.stop}|${next.zoomOut > 0.5}|${next.finished}|${next.unlocked}`
      if (stepInt !== lastStepInt || phase !== lastPhase) {
        lastStepInt = stepInt
        lastPhase = phase
        setState(next)
      }
      if (next.stop !== lastStop) {
        lastStop = next.stop
        for (const sec of stopSections) {
          const el = document.getElementById(sec.id)
          if (!el) continue
          if (mode === "pinned" && stopSections[next.stop ?? -1]?.id === sec.id) el.dataset.active = ""
          else delete el.dataset.active
        }
      }
      setActive(mode === "pinned" && timeline ? s > -window.innerHeight * 0.2 && s < timeline.total : s > 0 && s < 1)
    }

    const tick = (now: number) => {
      const dt = lastTime ? Math.min(now - lastTime, 64) : 16
      lastTime = now
      shown = Number.isNaN(shown) ? target : shown + (target - shown) * (1 - Math.exp(-dt / EASE_MS))
      if (Math.abs(target - shown) < (mode === "pinned" ? 0.4 : 0.0004)) shown = target
      paint(shown)
      raf = shown === target ? 0 : requestAnimationFrame(tick)
      if (!raf) lastTime = 0
    }
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    // After a gesture ends, glide to the next chapter in the direction of travel.
    const settle = () => {
      if (mode !== "pinned" || gestureFrom === null) return
      const goal = settleTarget(pageStops(), gestureFrom, window.scrollY - top)
      gestureFrom = null
      if (goal !== null) glide.to(top + goal)
    }

    const onScroll = () => {
      target = position()
      wake()
      // Our own glides are not gestures to settle.
      if (mode !== "pinned" || glide.isActive()) return
      gestureFrom ??= Number.isNaN(shown) ? target : shown
      clearTimeout(idle)
      idle = setTimeout(settle, 160)
    }
    const onScrollEnd = () => {
      clearTimeout(idle)
      if (!glide.isActive()) settle()
    }
    const onResize = () => {
      measure()
      target = position()
      wake()
    }

    // Chapter paging, the way full-page scrollers do it:
    //  - one gesture (a wheel notch, a trackpad swipe, a key press) moves exactly one chapter;
    //  - input is ignored only while the transition runs, never after it;
    //  - trackpad momentum (a stream of shrinking deltas) is not a new gesture; a pause or a clear
    //    speed-up is, and near the end of a transition it continues straight to the next chapter;
    //  - at the hero and after the last chapter the page scrolls on normally.
    const busy = () => glide.isActive() && glide.progress() < INTERRUPTIBLE_AT
    const page = (dir: 1 | -1) => {
      const all = pageStops()
      // Step from where the current transition is heading, or from the nearest stop when idle.
      const from = glide.isActive() ? glide.destination() - top : window.scrollY - top
      const here = all.reduce((best, a, i) => (Math.abs(a - from) < Math.abs(all[best] - from) ? i : best), 0)
      const next = all[here + dir]
      if (next === undefined) return false
      glide.to(top + next)
      return true
    }
    const pageable = (dir: 1 | -1) => {
      const at = (glide.isActive() ? glide.destination() : window.scrollY) - top
      const all = pageStops()
      if (at < all[0] - 2 || at > all[all.length - 1] + 2) return false
      if (dir < 0 && at <= all[0] + 6) return false
      if (dir > 0 && at >= all[all.length - 1] - 6) return false
      return true
    }

    let lastWheel = 0
    let lastSize = 0
    let gestureUsed = false
    const onWheel = (e: WheelEvent) => {
      if (mode !== "pinned" || e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return
      const dir = e.deltaY > 0 ? 1 : -1
      if (!glide.isActive() && !pageable(dir)) return
      e.preventDefault()

      const now = performance.now()
      const size = Math.abs(e.deltaY) * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1)
      const newGesture = now - lastWheel > GESTURE_GAP_MS || size > lastSize * 1.6 + 4
      lastWheel = now
      lastSize = size
      if (newGesture) gestureUsed = false
      if (gestureUsed) return
      if (busy()) {
        // A gesture that starts early in a transition is spent on it.
        gestureUsed = true
        return
      }
      if (pageable(dir) && page(dir)) gestureUsed = true
    }

    const onKey = (e: KeyboardEvent) => {
      if (mode !== "pinned" || e.altKey || e.ctrlKey || e.metaKey) return
      // Keys belong to text fields and open dialogs; Space also activates a focused button or link.
      // Arrows and Page keys page chapters even when a link or button (e.g. the rail) has focus.
      const target = e.target as HTMLElement
      if (target.closest("input, textarea, select, [contenteditable=true], dialog")) return
      if (e.key === " " && target.closest("button, a")) return
      const dir =
        e.key === "PageDown" || e.key === "ArrowDown" || e.key === "ArrowRight" || (e.key === " " && !e.shiftKey) ? 1
        : e.key === "PageUp" || e.key === "ArrowUp" || e.key === "ArrowLeft" || (e.key === " " && e.shiftKey) ? -1
        : 0
      if (!dir || !pageable(dir)) return
      e.preventDefault()
      if (!e.repeat && !busy()) page(dir)
    }

    measure()
    target = position()
    wake()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("scrollend", onScrollEnd)
    window.addEventListener("resize", onResize)
    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("keydown", onKey)
    const observer = new ResizeObserver(onResize)
    observer.observe(document.body)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(idle)
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("scrollend", onScrollEnd)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("keydown", onKey)
      for (const sec of stopSections) delete document.getElementById(sec.id)?.dataset.active
    }
  }, [mode, timeline, frames, maze, last, stops, speedSeconds]) // eslint-disable-line react-hooks/exhaustive-deps

  // Back to the hero (navbar logo, "cd ~"): a short fade and a jump, without replaying the maze.
  const [curtain, setCurtain] = useState(false)
  const backToTop = () => {
    history.replaceState(null, "", "/")
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: 0, behavior: "instant" })
      return
    }
    setCurtain(true)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" })
      requestAnimationFrame(() => setCurtain(false))
    }, 220)
  }
  useEffect(() => {
    const onTop = (e: Event) => {
      e.preventDefault()
      backToTop()
    }
    window.addEventListener("journey:top", onTop)
    return () => window.removeEventListener("journey:top", onTop)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Static mode: the finished picture, no camera, no animation.
  useEffect(() => {
    const stage = stageRef.current
    if (mode !== "static" || !stage) return
    const final: JourneyState = { step: last, zoomIn: 1, zoomOut: 1, speed: 1, stop: null, unlocked: stops.length, finished: true }
    setState(final)
    const paint = () => paintStage(refs, stage, frames, maze, final, speedSeconds, 0)
    paint()
    window.addEventListener("resize", paint)
    return () => window.removeEventListener("resize", paint)
  }, [mode, last, stops, frames, maze, speedSeconds]) // eslint-disable-line react-hooks/exhaustive-deps

  // Section links, the chapter rail and keyboard focus all go to the matching stop (pinned mode).
  const goTo = (index: number, smooth: boolean) => {
    const wrapper = wrapperRef.current
    if (!wrapper || !timeline) return
    const top = wrapper.getBoundingClientRect().top + window.scrollY
    const offset = index < 0 ? anchorsOf(timeline).at(-1)! : scrollForStop(timeline, index)
    if (smooth) glide.to(top + offset)
    else window.scrollTo({ top: top + offset, behavior: "instant" })
  }
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (mode !== "pinned" || !timeline || !wrapper) return
    const indexOf = (id: string) => stopSections.findIndex((s) => s.id === id)
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]")
      if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const url = new URL(link.getAttribute("href")!, window.location.href)
      if (url.pathname !== window.location.pathname || !url.hash) return
      const index = indexOf(url.hash.slice(1))
      if (index < 0) return
      e.preventDefault()
      history.pushState(null, "", url.hash)
      goTo(index, true)
    }
    const onFocus = (e: FocusEvent) => {
      const section = (e.target as HTMLElement).closest<HTMLElement>("[data-section]")
      const index = section ? indexOf(section.id) : -1
      if (index >= 0) requestAnimationFrame(() => goTo(index, false))
    }
    const onHash = () => {
      const index = indexOf(window.location.hash.slice(1))
      if (index >= 0) goTo(index, false)
    }
    onHash()
    document.addEventListener("click", onClick, true)
    wrapper.addEventListener("focusin", onFocus)
    window.addEventListener("hashchange", onHash)
    return () => {
      document.removeEventListener("click", onClick, true)
      wrapper.removeEventListener("focusin", onFocus)
      window.removeEventListener("hashchange", onHash)
    }
  }, [mode, timeline]) // eslint-disable-line react-hooks/exhaustive-deps

  const stepInt = Math.min(Math.floor(state.step), last)
  const run = frames[stepInt]
  const climax = state.zoomOut > 0.5
  const logLines = log.filter((e) => e.step <= stepInt).slice(-6)
  if (climax) logLines.push({ step: last, text: "> goal reached" })
  const pinned = mode === "pinned" && timeline
  // Chapter shown in the rail and HUD: the last stop reached, or the goal at the climax.
  const chapter = climax ? JOURNEY_STOPS : Math.max(state.unlocked - 1, 0)

  return (
    <div
      ref={wrapperRef}
      data-journey={mode}
      className={cn("relative", mode === "strip" && "grid")}
      style={pinned ? { height: timeline.total + timeline.viewportHeight } : undefined}
    >
      <div
        ref={stageRef}
        className={cn(
          "overflow-hidden bg-floor",
          mode === "pinned" && "sticky top-0 h-[100dvh]",
          mode === "strip" && "sticky top-16 z-10 h-[42dvh] border-b border-border",
          mode === "static" && "relative mx-auto mt-10 aspect-square w-full max-w-xl rounded-md border border-border"
        )}
        role="img"
        aria-label={`Labirint s natjecanja ${maze.label}: miš ga istražuje flood-fill algoritmom dok scrollaš.`}
      >
        <MazeStage refs={refs} run={run} unlocked={state.unlocked} stops={stops} frames={frames} speedPath={speedPath} />

        {/* Darkness around the mouse while exploring */}
        <div
          ref={refs.vignette}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_16%,rgb(var(--floor)/0.94)_60%)]"
          style={{ opacity: 0 }}
        />

        {pinned && (
          <RunReport
            visible={state.finished}
            mazeLabel={maze.label}
            speedSeconds={speedSeconds}
            pathCells={speedPath.length - 1}
            wallsFound={wallsFound}
            steps={last}
            onRewind={backToTop}
          />
        )}
      </div>

      {/* Curtain for the jump back to the hero */}
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-[35] bg-background transition-opacity duration-200",
          curtain ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />

      {/* The sections: panels on the pinned stage, a normal column otherwise */}
      <div className={cn(mode === "pinned" && "pointer-events-none absolute inset-0")}>
        <div className={cn(mode === "pinned" && "sticky top-0 h-[100dvh]")}>{children}</div>
      </div>

      {/* Chapter rail (desktop) */}
      {pinned && active && !state.finished && (
        <nav aria-label="Poglavlja" className="fixed right-6 top-1/2 z-30 -translate-y-1/2">
          <ol className="flex flex-col gap-4 border-r border-border pr-4 text-right font-mono text-[11px] uppercase tracking-[0.14em]">
            {[...stopSections.map((s) => s.label), "Cilj"].map((label, i) => {
              const reached = climax || i < state.unlocked
              const current = i === chapter && (climax || state.unlocked > 0)
              return (
                <li key={label} className="relative">
                  <button
                    type="button"
                    onClick={() => goTo(i === JOURNEY_STOPS ? -1 : i, true)}
                    aria-current={current ? "step" : undefined}
                    className={cn(
                      "transition-colors hover:text-foreground",
                      current ? "text-signal" : reached ? "text-foreground/70" : "text-muted/60"
                    )}
                  >
                    <span className="mr-2 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {label}
                  </button>
                  <span
                    className={cn(
                      "absolute -right-[21px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border transition-colors",
                      current ? "border-signal bg-signal shadow-[0_0_10px_rgb(var(--signal))]" : reached ? "border-signal/70 bg-floor" : "border-muted/50 bg-floor"
                    )}
                    aria-hidden="true"
                  />
                </li>
              )
            })}
          </ol>
        </nav>
      )}

      {/* HUD terminal */}
      {mode !== "static" && active && !hudHidden && !(pinned && state.finished) && (
        <div
          className={cn(
            "fixed z-30 font-mono text-[11px] text-muted backdrop-blur-md",
            mode === "pinned"
              ? "bottom-4 left-4 w-80 rounded-md border border-border bg-floor/70 p-3"
              : "inset-x-0 bottom-0 flex items-center gap-3 border-t border-border bg-floor/90 px-4 py-2"
          )}
        >
          {mode === "pinned" ? (
            <>
              <div className="flex items-center justify-between">
                <span>mouse.log</span>
                <span className="tabular-nums">
                  {String(chapter + 1).padStart(2, "0")} / {String(JOURNEY_STOPS + 1).padStart(2, "0")}
                </span>
              </div>
              {climax && (
                <p ref={refs.stopwatch} className="glow-signal mt-3 text-4xl tabular-nums text-signal">
                  00:00.00
                </p>
              )}
              {/* While a chapter panel is open the log shrinks to its last line, out of the panel's way */}
              <ol className="mt-2 space-y-0.5" aria-live="off">
                {(state.stop !== null ? logLines.slice(-1) : logLines).map((line, i) => (
                  <li key={`${line.step}-${i}`} className={cn("truncate", line.text.includes("unlocked") || line.text.includes("goal") ? "text-signal" : undefined)}>
                    {line.text}
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <>
              <span className="min-w-0 flex-1 truncate">{logLines.at(-1)?.text}</span>
              <button type="button" onClick={() => setHudHidden(true)} aria-label="Sakrij mouse.log" className="text-muted hover:text-foreground">
                ×
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

const formatTime = (seconds: number) => {
  const ms = Math.round(seconds * 1000)
  return `${String(Math.floor(ms / 60000)).padStart(2, "0")}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")}.${String(Math.floor((ms % 1000) / 10)).padStart(2, "0")}`
}

/** End card beside the solved maze: what this run did, then what the visitor can do next. */
function RunReport({
  visible,
  mazeLabel,
  speedSeconds,
  pathCells,
  wallsFound,
  steps,
  onRewind,
}: {
  visible: boolean
  mazeLabel: string
  speedSeconds: number
  pathCells: number
  wallsFound: number
  steps: number
  onRewind: () => void
}) {
  const rows: [string, string][] = [
    ["put", `${pathCells} ćelija`],
    ["otkriveni zidovi", String(wallsFound)],
    ["koraka istraživanja", String(steps)],
  ]
  return (
    <section
      aria-label="Rezultat vožnje"
      className={cn(
        "absolute right-10 top-1/2 w-[clamp(20rem,28vw,25rem)] rounded-md border border-signal/30 bg-floor/90 p-7 shadow-[0_0_60px_-20px_rgb(var(--signal)/0.5)] backdrop-blur-md transition duration-700 ease-out",
        visible ? "translate-x-0 -translate-y-[45%] opacity-100" : "pointer-events-none translate-x-6 -translate-y-[45%] opacity-0"
      )}
    >
      <p className="silkscreen flex items-center gap-2 text-signal">
        <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_rgb(var(--signal))]" aria-hidden="true" />
        Run complete
      </p>
      <p className="mt-1 font-mono text-xs text-muted">labirint: {mazeLabel}</p>

      <dl className="mt-5 border-y border-border py-4 font-mono">
        <div className="flex items-baseline justify-between">
          <dt className="text-xs text-muted">speed run</dt>
          <dd className="glow-signal text-3xl tabular-nums text-signal">{formatTime(speedSeconds)}</dd>
        </div>
        {rows.map(([label, value]) => (
          <div key={label} className="mt-2 flex items-baseline justify-between text-sm">
            <dt className="text-muted">{label}</dt>
            <dd className="tabular-nums text-foreground">{value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-foreground">Sad je red na tebi.</h2>
      <p className="mt-2 text-muted leading-relaxed">Izgradi miša koji će ovaj labirint proći brže.</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <RegisterButton />
        <a href={SPONSOR_CONTACT} className={buttonStyles.secondary}>
          Postani sponzor
        </a>
      </div>

      {/* Rewinds the whole journey: the mouse drives back through the maze to the hero */}
      <button
        type="button"
        onClick={onRewind}
        className="group mt-6 flex w-full items-center gap-3 rounded-md border border-signal/50 px-4 py-3 text-left font-mono text-signal transition hover:bg-signal/10 hover:shadow-[0_0_24px_-6px_rgb(var(--signal)/0.8)]"
      >
        <span className="cursor-blink text-base">&gt; cd ~</span>
        <span className="ml-auto text-xs text-muted transition-colors group-hover:text-signal">natrag na start ↑</span>
      </button>
    </section>
  )
}

interface StageRefs {
  camera: React.RefObject<SVGGElement | null>
  mouse: React.RefObject<SVGGElement | null>
  glow: React.RefObject<SVGCircleElement | null>
  beams: React.RefObject<(SVGLineElement | null)[]>
  hits: React.RefObject<(SVGCircleElement | null)[]>
  hitLights: React.RefObject<(SVGCircleElement | null)[]>
  irLayer: React.RefObject<SVGGElement | null>
  reveal: React.RefObject<SVGRectElement | null>
  speed: React.RefObject<SVGPathElement | null>
  vignette: React.RefObject<HTMLDivElement | null>
  stopwatch: React.RefObject<HTMLParagraphElement | null>
}

function useStageRefs(): StageRefs {
  return {
    camera: useRef(null),
    mouse: useRef(null),
    glow: useRef(null),
    beams: useRef([]),
    hits: useRef([]),
    hitLights: useRef([]),
    irLayer: useRef(null),
    reveal: useRef(null),
    speed: useRef(null),
    vignette: useRef(null),
    stopwatch: useRef(null),
  }
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Per-frame update: camera, mouse, IR beams and the speed run. No layout reads. */
function paintStage(refs: StageRefs, stage: HTMLElement, frames: Run[], maze: Maze, s: JourneyState, speedSeconds: number, navOffset: number) {
  const last = frames.length - 1
  const k = Math.min(Math.floor(s.step), last)
  const t = s.step - k
  const here = frames[k].mouse
  const next = frames[Math.min(k + 1, last)].mouse
  const [ax, ay] = centre(here)
  const [bx, by] = centre(next)
  const mx = lerp(ax, bx, t)
  const my = lerp(ay, by, t)
  const moving = next[0] !== here[0] || next[1] !== here[1]
  const prev = frames[Math.max(k - 1, 0)].mouse
  const dir: Vec = moving ? [next[0] - here[0], next[1] - here[1]] : k > 0 ? [here[0] - prev[0], here[1] - prev[1]] : [0, -1]
  const angle = (Math.atan2(dir[1], dir[0]) * 180) / Math.PI + 90
  refs.mouse.current?.setAttribute("transform", `translate(${mx} ${my}) rotate(${angle})`)
  refs.glow.current?.setAttribute("cx", `${mx}`)
  refs.glow.current?.setAttribute("cy", `${my}`)

  // Five IR beams (L, LD, F, RD, R), each a line to the first real wall.
  const [fx, fy] = dir
  const left: Vec = [fy, -fx]
  const r2 = Math.SQRT1_2
  const directions: Vec[] = [
    left,
    [(fx + left[0]) * r2, (fy + left[1]) * r2],
    [fx, fy],
    [(fx - left[0]) * r2, (fy - left[1]) * r2],
    [-left[0], -left[1]],
  ]
  const px = (mx - PAD) / CELL
  const py = (my - PAD) / CELL
  directions.forEach(([dx, dy], i) => {
    const d = castRay(maze, px, py, dx, dy)
    const hx = mx + dx * d * CELL
    const hy = my + dy * d * CELL
    const hit = d < IR_RANGE
    const line = refs.beams.current[i]
    if (line) {
      line.setAttribute("x1", `${mx}`)
      line.setAttribute("y1", `${my}`)
      line.setAttribute("x2", `${hx}`)
      line.setAttribute("y2", `${hy}`)
    }
    for (const dot of [refs.hits.current[i], refs.hitLights.current[i]]) {
      dot?.setAttribute("cx", `${hx}`)
      dot?.setAttribute("cy", `${hy}`)
      dot?.setAttribute("opacity", hit ? "1" : "0")
    }
  })

  // Camera: overview → close on the mouse (intro), close → overview (climax).
  const w = stage.clientWidth
  const h = stage.clientHeight
  // Pinned climax: the maze moves to the left third and shrinks a little, leaving room for the run report.
  const report = navOffset > 0 ? s.zoomOut : 0
  const overview = lerp(Math.min(w * 0.9, h - navOffset - 48), Math.min(w * 0.46, h - navOffset - 64), report) / EXTENT
  const close = Math.min(w, h) / (CLOSE_CELLS * CELL)
  const zoom = s.zoomIn * (1 - s.zoomOut)
  const scale = lerp(overview, close, zoom)
  const cx = lerp(EXTENT / 2, mx, zoom)
  const cy = lerp(EXTENT / 2, my, zoom)
  const screenX = lerp(lerp(w / 2, w * 0.33, report), w / 2, zoom)
  const screenY = lerp((h + navOffset) / 2, h / 2, zoom)
  if (refs.camera.current) refs.camera.current.style.transform = `translate(${screenX - cx * scale}px, ${screenY - cy * scale}px) scale(${scale})`

  // Darkness and light: dark while exploring, everything revealed in the overview.
  if (refs.vignette.current) refs.vignette.current.style.opacity = `${zoom}`
  refs.reveal.current?.setAttribute("opacity", `${1 - zoom}`)
  refs.irLayer.current?.setAttribute("opacity", `${zoom}`)

  // Speed run line and stopwatch.
  refs.speed.current?.style.setProperty("stroke-dashoffset", `${1 - s.speed}`)
  if (refs.stopwatch.current) {
    const ms = s.speed * speedSeconds * 1000
    refs.stopwatch.current.textContent = `${String(Math.floor(ms / 60000)).padStart(2, "0")}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")}.${String(Math.floor((ms % 1000) / 10)).padStart(2, "0")}`
  }
}

/** Posts (corners) touched by known walls, for the gold pads. */
function padsOf(known: Run["known"]): Vec[] {
  const set = new Set<string>()
  for (let y = 0; y < MAZE_SIZE; y++) {
    for (let x = 0; x < MAZE_SIZE; x++) {
      if (x < MAZE_SIZE - 1 && known.eastWall[y][x]) set.add(`${x + 1},${y}`).add(`${x + 1},${y + 1}`)
      if (y < MAZE_SIZE - 1 && known.southWall[y][x]) set.add(`${x},${y + 1}`).add(`${x + 1},${y + 1}`)
    }
  }
  return [...set].map((k) => k.split(",").map(Number) as Vec)
}

function wallsPath(known: Run["known"]) {
  const d: string[] = []
  for (let y = 0; y < MAZE_SIZE; y++) {
    for (let x = 0; x < MAZE_SIZE; x++) {
      const px = PAD + x * CELL
      const py = PAD + y * CELL
      if (x < MAZE_SIZE - 1 && known.eastWall[y][x]) d.push(`M${px + CELL} ${py}V${py + CELL}`)
      if (y < MAZE_SIZE - 1 && known.southWall[y][x]) d.push(`M${px} ${py + CELL}H${px + CELL}`)
    }
  }
  return d.join("")
}

/** Walls, pads, floor and numbers for one exploration frame; re-rendered only when the frame changes. */
const MazeLayers = memo(function MazeLayers({ run }: { run: Run }) {
  const walls = wallsPath(run.known)
  const pads = padsOf(run.known)
  const wallLayer = (
    <>
      <rect x={PAD} y={PAD} width={MAZE_SIZE * CELL} height={MAZE_SIZE * CELL} className="fill-none stroke-copper" strokeWidth="8" />
      <path d={walls} className="stroke-copper" strokeWidth="8" strokeLinecap="round" fill="none" />
      {pads.map(([x, y]) => (
        <circle key={`${x},${y}`} cx={PAD + x * CELL} cy={PAD + y * CELL} r="9" className="fill-gold" />
      ))}
    </>
  )
  return (
    <>
      {run.seen.map((row, y) =>
        row.map((seen, x) => (seen ? <rect key={`f${x}-${y}`} x={PAD + x * CELL + 4} y={PAD + y * CELL + 4} width={CELL - 8} height={CELL - 8} className="fill-surface/60" /> : null))
      )}
      <rect x={PAD + 7 * CELL} y={PAD + 7 * CELL} width={CELL * 2} height={CELL * 2} className="fill-signal/10" />

      {/* Walls found so far: faint everywhere, full copper where the IR light falls */}
      <g opacity="0.3">{wallLayer}</g>
      <g mask="url(#journey-light)">{wallLayer}</g>

      {run.dist.map((row, y) =>
        row.map((d, x) =>
          run.seen[y][x] && d !== Infinity ? (
            <text key={`d${x}-${y}`} x={PAD + x * CELL + CELL / 2} y={PAD + y * CELL + CELL / 2 + 8} textAnchor="middle" fontSize="22" className="fill-foreground/55 font-mono">
              {d}
            </text>
          ) : null
        )
      )}
    </>
  )
})

function MazeStage({
  refs,
  run,
  unlocked,
  stops,
  frames,
  speedPath,
}: {
  refs: StageRefs
  run: Run
  unlocked: number
  stops: number[]
  frames: Run[]
  speedPath: Cell[]
}) {
  const stopLabels = homeSections.slice(0, JOURNEY_STOPS)
  const speedD = useMemo(() => cellPath(speedPath, CELL, PAD), [speedPath])

  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <filter id="journey-bloom" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="journey-spot">
          <stop offset="0" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        {/* Light: a glow around the mouse and a spot where each beam hits a wall */}
        <mask id="journey-light" maskUnits="userSpaceOnUse" x="0" y="0" width={EXTENT} height={EXTENT}>
          <rect ref={refs.reveal} x="0" y="0" width={EXTENT} height={EXTENT} fill="white" opacity="1" />
          <circle ref={refs.glow} r={CELL * 1.2} fill="url(#journey-spot)" />
          {Array.from({ length: 5 }, (_, i) => (
            <circle key={i} ref={(el) => { refs.hitLights.current[i] = el }} r={CELL * 0.6} fill="url(#journey-spot)" />
          ))}
        </mask>
      </defs>

      <g ref={refs.camera} style={{ transformOrigin: "0 0" }}>
        <rect x={PAD} y={PAD} width={MAZE_SIZE * CELL} height={MAZE_SIZE * CELL} className="fill-background" />
        <MazeLayers run={run} />

        {/* Stops: silkscreen labels at the cells that unlock sections */}
        {stops.map((s, i) => {
          const [cx, cy] = centre(frames[s].mouse)
          const done = unlocked > i
          return (
            <g key={i} className={cn("transition-opacity duration-500", done ? "opacity-100" : "opacity-50")}>
              <rect x={cx - 34} y={cy - 34} width="68" height="68" rx="6" fill="none" strokeWidth="3" strokeDasharray="8 7" className={done ? "stroke-signal" : "stroke-foreground/60"} />
              <text x={cx} y={cy - 44} textAnchor="middle" fontSize="18" className={cn("font-mono uppercase", done ? "fill-signal" : "fill-foreground/70")}>
                {stopLabels[i].designator} {stopLabels[i].label}
              </text>
            </g>
          )
        })}

        {/* Speed run, drawn by scroll at the climax */}
        <path ref={refs.speed} d={speedD} pathLength={1} strokeDasharray="1" strokeDashoffset="1" className="stroke-signal" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#journey-bloom)" />

        {/* IR beams: one thin line each, ending in a bright dot on the wall */}
        <g ref={refs.irLayer} filter="url(#journey-bloom)">
          <g className="stroke-signal" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
            {Array.from({ length: 5 }, (_, i) => (
              <line key={i} ref={(el) => { refs.beams.current[i] = el }} />
            ))}
          </g>
          {Array.from({ length: 5 }, (_, i) => (
            <circle key={i} ref={(el) => { refs.hits.current[i] = el }} r="6" className="fill-signal" />
          ))}
        </g>
        <g ref={refs.mouse} filter="url(#journey-bloom)">
          <path d="M-22 26V-4A22 22 0 0 1 22 -4V26Z" className="fill-background stroke-foreground" strokeWidth="4" />
          <circle cx="0" cy="-18" r="5" className="fill-signal" />
        </g>
      </g>
    </svg>
  )
}
