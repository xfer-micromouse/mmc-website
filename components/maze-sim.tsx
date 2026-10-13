"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { cellPath, loadMaze, MAZE_COUNT, MAZE_SIZE, wallPath } from "@/lib/maze"
import { finishRun, startRun, stepRun, type Run } from "@/lib/flood-fill"
import { cn } from "@/lib/utils"

const CELL = 10
const PAD = 2
const EXTENT = MAZE_SIZE * CELL + PAD * 2
const TICK_MS = { explore: 50, speed: 45 }
const RESTART_MS = 6000

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(query.matches)
    const onChange = () => setReduced(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])
  return reduced
}

function formatTime(ms: number) {
  const s = Math.floor(ms / 1000)
  const minutes = String(Math.floor(s / 60)).padStart(2, "0")
  const seconds = String(s % 60).padStart(2, "0")
  const hundredths = String(Math.floor((ms % 1000) / 10)).padStart(2, "0")
  return `${minutes}:${seconds}.${hundredths}`
}

const terminalButton =
  "whitespace-nowrap rounded-sm border border-signal/50 px-2 py-2 text-left text-signal transition-colors hover:bg-signal/10 active:bg-signal/20"

const status = {
  explore: "EXPLORE",
  search: "SEARCH",
  return: "RETURN",
  speed: "SPEED RUN",
  done: "DONE",
} as const

/**
 * Hero simulation: a mouse solving an unknown maze with flood fill, then a timed speed run.
 * `controls={false}` (home page hero) shows the maze with a compact mouse.log
 * laid over its lower corner and no buttons; the full version with the side
 * panel and buttons lives in the command palette.
 */
export function MazeSim({ controls = true }: { controls?: boolean }) {
  const reducedMotion = useReducedMotion()
  const [mazeIndex, setMazeIndex] = useState(0)
  const [fast, setFast] = useState(false)
  const [run, setRun] = useState<Run>(() => startRun(loadMaze(0)))
  const [elapsed, setElapsed] = useState(0)
  const [inView, setInView] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const speedStart = useRef<number | null>(null)

  // New maze: restart, or solve instantly when motion is reduced.
  useEffect(() => {
    const fresh = startRun(loadMaze(mazeIndex))
    setRun(reducedMotion ? finishRun(fresh) : fresh)
    setElapsed(0)
    speedStart.current = null
  }, [mazeIndex, reducedMotion])

  // Pause while the hero is scrolled out of view.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reducedMotion || !inView) return
    if (run.phase === "done") {
      const id = setTimeout(nextMaze, RESTART_MS)
      return () => clearTimeout(id)
    }
    const base = run.phase === "speed" ? TICK_MS.speed : TICK_MS.explore
    const id = setTimeout(() => {
      if (run.phase === "speed") {
        speedStart.current ??= performance.now()
        setElapsed(performance.now() - speedStart.current)
      }
      setRun(stepRun)
    }, fast ? base / 4 : base)
    return () => clearTimeout(id)
  }, [run, fast, reducedMotion, inView])

  // Any other maze from the library, picked at random.
  function nextMaze() {
    setMazeIndex((current) => (current + 1 + Math.floor(Math.random() * (MAZE_COUNT - 1))) % MAZE_COUNT)
  }

  const trueWalls = useMemo(() => wallPath(run.maze, CELL, PAD), [run.maze])
  const knownWalls = wallPath(run.known, CELL, PAD)
  const speedTrail =
    run.phase === "speed" || run.phase === "done"
      ? cellPath(run.speedPath.slice(0, run.speedIndex + 1), CELL, PAD)
      : ""
  const [mx, my] = run.mouse

  return (
    <div
      ref={rootRef}
      className={cn(controls && "grid gap-4 sm:grid-cols-[minmax(0,1fr)_14rem] xl:grid-cols-[minmax(0,1fr)_16rem]")}
    >
      <figure className="relative min-w-0">
        <svg
          viewBox={`0 0 ${EXTENT} ${EXTENT}`}
          className="w-full rounded-md border border-border bg-floor"
          role="img"
          aria-label={`Simulacija: miš flood-fill algoritmom rješava labirint s natjecanja ${run.maze.label}, zatim najkraćim putem vozi od starta do cilja.`}
        >
          <path d={trueWalls} className="stroke-accent/20" strokeWidth="0.8" fill="none" />
          {run.dist.map((row, y) =>
            row.map((d, x) =>
              d === Infinity ? null : (
                <text
                  key={`${x}-${y}`}
                  x={PAD + x * CELL + CELL / 2}
                  y={PAD + y * CELL + CELL / 2 + 1.2}
                  textAnchor="middle"
                  className={cn("font-mono", run.seen[y][x] ? "fill-muted" : "fill-muted/35")}
                  fontSize="3.4"
                >
                  {d}
                </text>
              )
            )
          )}
          <rect
            x={PAD}
            y={PAD}
            width={MAZE_SIZE * CELL}
            height={MAZE_SIZE * CELL}
            className="stroke-accent"
            strokeWidth="1.2"
            fill="none"
          />
          <path d={knownWalls} className="stroke-accent" strokeWidth="1.2" strokeLinecap="square" fill="none" />
          {speedTrail && (
            <path
              d={speedTrail}
              className="stroke-signal"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          )}
          <circle cx={PAD + mx * CELL + CELL / 2} cy={PAD + my * CELL + CELL / 2} r="2.8" className="fill-foreground" />
        </svg>
        {!controls && (
          <div className="pointer-events-none absolute bottom-10 right-3 w-60 rounded-md border border-border bg-floor/80 p-3 font-mono text-[11px] text-muted backdrop-blur-md sm:right-4 sm:w-64">
            <div className="flex items-center justify-between">
              <span>mouse.log</span>
              <span className={run.phase === "done" ? "text-signal" : "text-accent-soft"}>{status[run.phase]}</span>
            </div>
            <ol className="mt-2 space-y-0.5">
              {run.log.slice(-4).map((line, i) => (
                <li key={`${run.log.length}-${i}`} className="truncate">
                  {line}
                </li>
              ))}
            </ol>
            <div className="mt-2 flex justify-between border-t border-border pt-2 tabular-nums">
              <span>steps {run.steps}</span>
              <span className={run.phase === "done" ? "text-signal" : "text-foreground"}>
                {reducedMotion ? "--:--.--" : formatTime(elapsed)}
              </span>
            </div>
          </div>
        )}
        <figcaption className="mt-2 font-mono text-[11px] text-muted">
          labirint: {run.maze.label}
        </figcaption>
      </figure>

      {controls && (
        <div className="flex min-w-0 flex-col rounded-md border border-border bg-floor font-mono text-xs">
          <div className="flex items-center justify-between border-b border-border px-3 py-2 text-muted">
            <span>mouse.log</span>
            <span className={run.phase === "done" ? "text-signal" : "text-accent-soft"}>{status[run.phase]}</span>
          </div>
          <ol className="h-40 overflow-hidden px-3 py-2 leading-relaxed text-muted sm:h-auto sm:flex-1">
            {run.log.slice(-9).map((line, i) => (
              <li key={`${run.log.length}-${i}`} className="truncate">
                {line}
              </li>
            ))}
          </ol>
          <dl className="grid grid-cols-2 border-t border-border">
            <div className="border-r border-border px-3 py-2">
              <dt className="text-muted">steps</dt>
              <dd className="text-sm tabular-nums text-foreground">{run.steps}</dd>
            </div>
            <div className="px-3 py-2">
              <dt className="text-muted">speed run</dt>
              <dd className={cn("text-sm tabular-nums", run.phase === "done" ? "text-signal" : "text-foreground")}>
                {reducedMotion ? "--:--.--" : formatTime(elapsed)}
              </dd>
            </div>
          </dl>
          <div className="grid gap-2 border-t border-border p-2">
            <button type="button" onClick={nextMaze} className={terminalButton}>
              [ Novi labirint ]
            </button>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setFast((f) => !f)}
                aria-pressed={fast}
                className={cn(terminalButton, fast && "bg-signal/15")}
              >
                [ Ubrzaj {fast ? "4x" : "1x"} ]
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
