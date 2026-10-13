/**
 * Flood-fill Micromouse solver, simulated one move at a time.
 *
 * The mouse starts knowing only the outer walls. In each cell it senses the
 * four surrounding walls, re-floods distances to its target assuming unknown
 * walls are open, and moves to the open neighbour with the lowest distance.
 *
 * Phases: explore to the goal; search the unseen cells that could still lie on
 * a shorter start-to-goal path, until the shortest path is proven; return to
 * the start; speed run along that proven shortest path.
 */

import {
  grid,
  hasPassage,
  isGoal,
  MAZE_SIZE,
  neighbours,
  START,
  type Cell,
  type Maze,
} from "@/lib/maze"

export type Phase = "explore" | "search" | "return" | "speed" | "done"

export interface Run {
  maze: Maze
  phase: Phase
  mouse: Cell
  /** Walls the mouse has sensed so far */
  known: { eastWall: boolean[][]; southWall: boolean[][] }
  seen: boolean[][]
  /** Current flood distances to the target, Infinity where unreachable */
  dist: number[][]
  steps: number
  speedPath: Cell[]
  speedIndex: number
  log: string[]
}

const LOG_LIMIT = 40
const goalCells: Cell[] = [
  [7, 7],
  [8, 7],
  [7, 8],
  [8, 8],
]

/** Coordinates as printed in the log: origin at the start cell, y grows upward. */
const label = ([x, y]: Cell) => `(${x},${MAZE_SIZE - 1 - y})`

function flood(known: Run["known"], targets: Cell[]): number[][] {
  const dist = grid(Infinity)
  const queue: Cell[] = []
  for (const [x, y] of targets) {
    dist[y][x] = 0
    queue.push([x, y])
  }
  for (let i = 0; i < queue.length; i++) {
    const cell = queue[i]
    const d = dist[cell[1]][cell[0]]
    for (const n of neighbours(cell)) {
      if (dist[n[1]][n[0]] === Infinity && hasPassage(known, cell, n)) {
        dist[n[1]][n[0]] = d + 1
        queue.push(n)
      }
    }
  }
  return dist
}

function sense(run: Run, [x, y]: Cell) {
  run.seen[y][x] = true
  if (x < MAZE_SIZE - 1) run.known.eastWall[y][x] = run.maze.eastWall[y][x]
  if (x > 0) run.known.eastWall[y][x - 1] = run.maze.eastWall[y][x - 1]
  if (y < MAZE_SIZE - 1) run.known.southWall[y][x] = run.maze.southWall[y][x]
  if (y > 0) run.known.southWall[y - 1][x] = run.maze.southWall[y - 1][x]
}

/** Shortest start-to-goal path through cells the mouse has seen. */
function knownShortestPath(run: Run): Cell[] {
  const key = ([x, y]: Cell) => y * MAZE_SIZE + x
  const previous = new Map<number, Cell | null>([[key(START), null]])
  const queue: Cell[] = [START]
  for (let i = 0; i < queue.length; i++) {
    const cell = queue[i]
    if (isGoal(...cell)) {
      const path: Cell[] = []
      for (let c: Cell | null = cell; c; c = previous.get(key(c)) ?? null) path.unshift(c)
      return path
    }
    for (const n of neighbours(cell)) {
      if (!previous.has(key(n)) && run.seen[n[1]][n[0]] && hasPassage(run.maze, cell, n)) {
        previous.set(key(n), cell)
        queue.push(n)
      }
    }
  }
  return []
}

function write(run: Run, line: string) {
  run.log = [...run.log.slice(-(LOG_LIMIT - 1)), line]
}

export function startRun(maze: Maze): Run {
  const known = { eastWall: grid(false), southWall: grid(false) }
  const run: Run = {
    maze,
    phase: "explore",
    mouse: START,
    known,
    seen: grid(false),
    dist: flood(known, goalCells),
    steps: 0,
    speedPath: [],
    speedIndex: 0,
    log: ["> boot ok, maze unknown", "> mode: explore, target: centre"],
  }
  sense(run, START)
  run.dist = flood(run.known, goalCells)
  return run
}

/** Advances the simulation by one move. Returns a new object so React re-renders. */
/**
 * Unseen cells on some optimistic (unknown walls open) shortest start-to-goal
 * path. When none are left, every such path is fully sensed, so the shortest
 * path is proven.
 */
function searchTargets(run: Run): Cell[] {
  const fromGoal = flood(run.known, goalCells)
  const fromStart = flood(run.known, [START])
  const best = fromGoal[START[1]][START[0]]
  const targets: Cell[] = []
  for (let y = 0; y < MAZE_SIZE; y++) {
    for (let x = 0; x < MAZE_SIZE; x++) {
      if (!run.seen[y][x] && !isGoal(x, y) && fromStart[y][x] + fromGoal[y][x] === best) targets.push([x, y])
    }
  }
  return targets
}

const atStart = ([x, y]: Cell) => x === START[0] && y === START[1]

/** Advances the simulation by one move. Returns a new object so React re-renders. */
export function stepRun(previous: Run): Run {
  const run: Run = { ...previous }

  if (run.phase === "done") return previous

  if (run.phase === "speed") {
    run.speedIndex = Math.min(run.speedIndex + 1, run.speedPath.length - 1)
    run.mouse = run.speedPath[run.speedIndex]
    if (run.speedIndex === run.speedPath.length - 1) {
      run.phase = "done"
      write(run, `> speed run done, ${run.speedPath.length - 1} cells`)
    }
    return run
  }

  run.known = {
    eastWall: run.known.eastWall.map((row) => [...row]),
    southWall: run.known.southWall.map((row) => [...row]),
  }
  run.seen = run.seen.map((row) => [...row])

  // Phase transitions happen on their own step so the log reads in order.
  if (run.phase === "explore" && isGoal(...run.mouse)) {
    write(run, `> goal reached in ${run.steps} steps`)
    write(run, "> re-flooding: searching for a shorter path")
    run.phase = "search"
    return run
  }
  if (run.phase === "search") {
    const targets = searchTargets(run)
    if (targets.length === 0) {
      const length = flood(run.known, goalCells)[START[1]][START[0]]
      write(run, `> shortest path proven: ${length} cells`)
      write(run, "> mode: return, target: start")
      run.phase = "return"
      run.dist = flood(run.known, [START])
      return run
    }
    run.dist = flood(run.known, targets)
  }
  if (run.phase === "return" && atStart(run.mouse)) {
    run.speedPath = knownShortestPath(run)
    run.speedIndex = 0
    run.phase = "speed"
    write(run, `> back at start, ${run.steps} steps total`)
    write(run, `> speed run: ${run.speedPath.length - 1} cells`)
    return run
  }

  const targets =
    run.phase === "explore" ? goalCells : run.phase === "search" ? searchTargets(run) : [START]
  sense(run, run.mouse)
  run.dist = flood(run.known, targets)
  const options = neighbours(run.mouse).filter((n) => hasPassage(run.known, run.mouse, n))
  const next = options.reduce((best, n) => (run.dist[n[1]][n[0]] < run.dist[best[1]][best[0]] ? n : best))
  run.mouse = next
  run.steps += 1
  sense(run, next)
  run.dist = flood(run.known, targets)
  if (run.phase === "search") {
    write(run, `> searching cell ${label(next)} open=${searchTargets(run).length}`)
  } else {
    const verb = run.phase === "explore" ? "exploring" : "returning"
    write(run, `> ${verb} cell ${label(next)} dist=${run.dist[next[1]][next[0]]}`)
  }
  return run
}

/** Runs the whole simulation at once (used when motion is reduced). */
export function finishRun(run: Run): Run {
  let current = run
  for (let i = 0; i < 10000 && current.phase !== "done"; i++) current = stepRun(current)
  return current
}
