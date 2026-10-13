"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react"
import { hasPassage, isGoal, loadMaze, MAZE_COUNT, MAZE_SIZE, START, wallPath, type Cell } from "@/lib/maze"

const CELL = 10
const PAD = 2
const EXTENT = MAZE_SIZE * CELL + PAD * 2
const moves: Record<string, Cell> = {
  ArrowUp: [0, -1],
  ArrowRight: [1, 0],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
}

/** "play" command: drive the mouse to the centre with the arrow keys. */
export function MazeGame() {
  const [maze, setMaze] = useState(() => loadMaze(Math.floor(Math.random() * MAZE_COUNT)))
  const [mouse, setMouse] = useState<Cell>(START)
  const [steps, setSteps] = useState(0)
  const [bump, setBump] = useState(false)
  const startedAt = useRef<number | null>(null)
  const [time, setTime] = useState<number | null>(null)
  const won = isGoal(...mouse)

  const move = useCallback(
    ([dx, dy]: Cell) => {
      if (won) return
      const next: Cell = [mouse[0] + dx, mouse[1] + dy]
      const inside = next[0] >= 0 && next[1] >= 0 && next[0] < MAZE_SIZE && next[1] < MAZE_SIZE
      if (!inside || !hasPassage(maze, mouse, next)) {
        setBump(true)
        return
      }
      startedAt.current ??= performance.now()
      setBump(false)
      setMouse(next)
      setSteps((s) => s + 1)
      if (isGoal(...next)) setTime((performance.now() - startedAt.current) / 1000)
    },
    [maze, mouse, won]
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const delta = moves[e.key]
      if (!delta) return
      e.preventDefault()
      move(delta)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [move])

  const reset = () => {
    setMaze(loadMaze(Math.floor(Math.random() * MAZE_COUNT)))
    setMouse(START)
    setSteps(0)
    setBump(false)
    setTime(null)
    startedAt.current = null
  }

  const [mx, my] = mouse

  return (
    <div className="font-mono text-sm">
      <svg viewBox={`0 0 ${EXTENT} ${EXTENT}`} className="w-full rounded-md bg-floor" role="img" aria-label="Labirint za igru">
        <rect x={PAD} y={PAD} width={MAZE_SIZE * CELL} height={MAZE_SIZE * CELL} className="stroke-accent" strokeWidth="1.2" fill="none" />
        <path d={wallPath(maze, CELL, PAD)} className="stroke-accent" strokeWidth="1.2" strokeLinecap="square" fill="none" />
        <rect x={PAD + 7 * CELL} y={PAD + 7 * CELL} width={CELL * 2} height={CELL * 2} className="fill-signal/15" />
        <circle cx={PAD + mx * CELL + CELL / 2} cy={PAD + my * CELL + CELL / 2} r="3" className={bump ? "fill-accent-soft" : "fill-foreground"} />
      </svg>

      <p className="mt-2 text-[11px] text-muted">labirint: {maze.label}</p>
      <p className="mt-2 text-muted" aria-live="polite">
        {won ? (
          <span className="text-signal">&gt; cilj! {steps} koraka, {time?.toFixed(1)} s</span>
        ) : bump ? (
          "> bump. Zid."
        ) : (
          `> strelice za vožnju. koraci: ${steps}`
        )}
      </p>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="grid grid-cols-3 gap-1 sm:hidden">
          <span />
          <ArrowButton label="Gore" onClick={() => move(moves.ArrowUp)} icon={<ArrowUp size={16} />} />
          <span />
          <ArrowButton label="Lijevo" onClick={() => move(moves.ArrowLeft)} icon={<ArrowLeft size={16} />} />
          <ArrowButton label="Dolje" onClick={() => move(moves.ArrowDown)} icon={<ArrowDown size={16} />} />
          <ArrowButton label="Desno" onClick={() => move(moves.ArrowRight)} icon={<ArrowRight size={16} />} />
        </div>
        <button type="button" onClick={reset} className="rounded-md border border-border px-3 py-2 text-foreground hover:bg-surface">
          Novi labirint
        </button>
      </div>
    </div>
  )
}

function ArrowButton({ label, onClick, icon }: { label: string; onClick: () => void; icon: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground active:bg-surface">
      {icon}
    </button>
  )
}
