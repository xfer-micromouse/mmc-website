/**
 * 16x16 Micromouse mazes from real competitions (hero simulation, mini-map, game).
 * Start is the bottom-left cell; the goal is the 2x2 centre.
 */

import { mazeLibrary } from "@/lib/maze-library"

export const MAZE_SIZE = 16

export type Cell = [number, number]

export interface Maze {
  id: string
  /** Competition name shown under the maze */
  label: string
  /** eastWall[y][x]: wall between (x, y) and (x + 1, y) */
  eastWall: boolean[][]
  /** southWall[y][x]: wall between (x, y) and (x, y + 1) */
  southWall: boolean[][]
  /** Cells from start to goal, inclusive */
  solution: Cell[]
}

export const START: Cell = [0, MAZE_SIZE - 1]
const GOAL_MIN = MAZE_SIZE / 2 - 1
const GOAL_MAX = MAZE_SIZE / 2

export function isGoal(x: number, y: number) {
  return x >= GOAL_MIN && x <= GOAL_MAX && y >= GOAL_MIN && y <= GOAL_MAX
}

export const grid = <T,>(value: T) =>
  Array.from({ length: MAZE_SIZE }, () => Array<T>(MAZE_SIZE).fill(value))

export function hasPassage(maze: Pick<Maze, "eastWall" | "southWall">, [ax, ay]: Cell, [bx, by]: Cell) {
  return ay === by
    ? !maze.eastWall[ay][Math.min(ax, bx)]
    : !maze.southWall[Math.min(ay, by)][ax]
}

export function neighbours([x, y]: Cell): Cell[] {
  const result: Cell[] = [
    [x, y - 1],
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
  ]
  return result.filter(([nx, ny]) => nx >= 0 && ny >= 0 && nx < MAZE_SIZE && ny < MAZE_SIZE)
}

/** A competition maze from lib/maze-library.ts; `index` wraps around the library. */
export function loadMaze(index: number): Maze {
  const entry = mazeLibrary[((index % mazeLibrary.length) + mazeLibrary.length) % mazeLibrary.length]
  const maze: Maze = { id: entry.id, label: entry.label, eastWall: grid(false), southWall: grid(false), solution: [] }
  for (let y = 0; y < MAZE_SIZE; y++) {
    for (let x = 0; x < MAZE_SIZE; x++) {
      const bits = parseInt(entry.walls[y * MAZE_SIZE + x], 16)
      maze.eastWall[y][x] = (bits & 1) !== 0
      maze.southWall[y][x] = (bits & 2) !== 0
    }
  }
  maze.solution = shortestPath(maze)
  return maze
}

export const MAZE_COUNT = mazeLibrary.length

function shortestPath(maze: Maze): Cell[] {
  const key = ([x, y]: Cell) => y * MAZE_SIZE + x
  const previous = new Map<number, Cell | null>([[key(START), null]])
  const queue: Cell[] = [START]

  while (queue.length > 0) {
    const cell = queue.shift()!
    if (isGoal(...cell)) {
      const path: Cell[] = []
      for (let c: Cell | null = cell; c; c = previous.get(key(c))!) path.unshift(c)
      return path
    }
    for (const n of neighbours(cell)) {
      if (!previous.has(key(n)) && hasPassage(maze, cell, n)) {
        previous.set(key(n), cell)
        queue.push(n)
      }
    }
  }
  return []
}

/** SVG path data for every interior wall, cells `cell` units wide, offset by `pad`. */
export function wallPath(
  walls: Pick<Maze, "eastWall" | "southWall">,
  cell: number,
  pad = 0
): string {
  const segments: string[] = []
  for (let y = 0; y < MAZE_SIZE; y++) {
    for (let x = 0; x < MAZE_SIZE; x++) {
      const px = pad + x * cell
      const py = pad + y * cell
      if (x < MAZE_SIZE - 1 && walls.eastWall[y][x]) segments.push(`M${px + cell} ${py}V${py + cell}`)
      if (y < MAZE_SIZE - 1 && walls.southWall[y][x]) segments.push(`M${px} ${py + cell}H${px + cell}`)
    }
  }
  return segments.join("")
}

/** SVG path data through the centres of `cells`. */
export function cellPath(cells: Cell[], cell: number, pad = 0): string {
  return cells
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${pad + x * cell + cell / 2} ${pad + y * cell + cell / 2}`)
    .join("")
}
