/*
 * One PCB "node", drawn as green traces only: lines fanning out on 45° bends
 * from where a chip's pins would be, plus a few traces from the corners.
 * Geometry is computed once; every background trigger reuses it, rotated or
 * mirrored for variety.
 */

const SIZE = 520
const C = SIZE / 2
const BODY = 34
const PITCH = 8
const PINS = 8

type Point = [number, number]

// Small deterministic hash so lengths vary without looking random-noisy.
const hash = (a: number, b: number) => ((a * 73 + b * 151 + 17) * 2654435761) % 997

/** Rotates a point around the centre by quarter turns. */
function rotate([x, y]: Point, quarter: number): Point {
  let dx = x - C
  let dy = y - C
  for (let i = 0; i < quarter; i++) [dx, dy] = [-dy, dx]
  return [C + dx, C + dy]
}

const pathOf = (points: Point[]) => points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("")

function build(): string[] {
  const traces: string[] = []

  // QFP fan-out, drawn for the top side and rotated to the other three.
  for (let side = 0; side < 4; side++) {
    for (let k = 0; k < PINS; k++) {
      const offset = (k - (PINS - 1) / 2) * PITCH
      const h = hash(side, k)
      if (h % 6 === 0) continue // unrouted pin

      const leave = 12 + (k % 3) * 6
      const spread = offset * 1.6
      const reach = 150 + (h % 6) * 16
      const points: Point[] = [
        [C + offset, C - BODY - 11],
        [C + offset, C - BODY - 11 - leave],
        [C + offset + spread, C - BODY - 11 - leave - Math.abs(spread)],
        [C + offset + spread, C - reach],
      ]
      // Some traces jog sideways once more near the end, like real routing around parts.
      if (h % 4 === 1) {
        const [x, y] = points[3]
        const jog = Math.sign(offset || 1) * 18
        points.push([x + jog, y - 18], [x + jog, y - 40])
      }
      traces.push(pathOf(points.map((p) => rotate(p, side))))
    }
  }

  // Corner runs: a bus from the top-left, a short ladder top-right, two bends bottom-right.
  for (let row = 0; row < 5; row++) {
    const y = 60 + row * 20
    traces.push(pathOf([[60, y], [118 + row * 8, y], [140 + row * 8, y + 22], [140 + row * 8, 168]]))
  }
  for (let i = 0; i < 4; i++) {
    const y = 64 + i * 22
    traces.push(pathOf([[400, y], [452, y], [464, y + 12], [464, 180 + i * 10]]))
  }
  traces.push(pathOf([[440, 407], [360, 407], [340, 387], [340, 340]]))
  traces.push(pathOf([[446, 450], [446, 376], [430, 360], [380, 360]]))

  return traces
}

const traces = build()

/**
 * The PCB node graphic. `variant` picks a rotation/mirror so neighbouring
 * nodes look different. Lines are signal green, strongest at the centre and
 * fading out towards the edges.
 */
export function PcbNode({ id, variant }: { id: string; variant: number }) {
  const turn = (variant % 4) * 90
  const mirror = variant % 2 === 1 ? -1 : 1
  const gradient = `pcb-node-${id}`

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id={gradient} gradientUnits="userSpaceOnUse" cx={C} cy={C} r={C}>
          <stop offset="0" stopColor="rgb(var(--signal))" stopOpacity="0.9" />
          <stop offset="0.6" stopColor="rgb(var(--signal))" stopOpacity="0.45" />
          <stop offset="1" stopColor="rgb(var(--signal))" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g
        className="trigger-draw"
        transform={`rotate(${turn} ${C} ${C}) translate(${C} 0) scale(${mirror} 1) translate(${-C} 0)`}
        fill="none"
        stroke={`url(#${gradient})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {traces.map((d, i) => (
          <path key={i} d={d} pathLength={1} />
        ))}
      </g>
    </svg>
  )
}
