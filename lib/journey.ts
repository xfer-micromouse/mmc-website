/**
 * Scroll timeline of the home page "journey": native scroll distance (px)
 * mapped onto what the maze stage shows. Pure, so it can be tested without
 * a browser.
 *
 *   intro    camera zooms from the whole maze into the mouse
 *   travel   the mouse explores cell by cell (1:1 with scroll, soft ends)
 *   dwell    the mouse stands on a stop and its section is shown
 *   zoomOut  at the goal the camera pulls back to the whole maze
 *   speed    the speed run draws itself, stopwatch running
 *   hold     final picture with the call to action
 */

export const JOURNEY = {
  /** Lengths in viewport heights, except stepPx */
  intro: 0.8,
  stepPx: 30,
  dwell: 0.5,
  zoomOut: 0.7,
  speed: 1,
  hold: 0.6,
}

type Kind = "intro" | "travel" | "dwell" | "zoomOut" | "speed" | "hold"

interface Segment {
  kind: Kind
  start: number
  length: number
  fromStep: number
  toStep: number
  stop?: number
}

export interface JourneyTimeline {
  segments: Segment[]
  total: number
  viewportHeight: number
  lastStep: number
  stops: number[]
}

export function buildTimeline(viewportHeight: number, lastStep: number, stops: number[]): JourneyTimeline {
  const vh = viewportHeight
  const segments: Segment[] = []
  let cursor = 0
  const add = (kind: Kind, length: number, fromStep: number, toStep: number, stop?: number) => {
    segments.push({ kind, start: cursor, length, fromStep, toStep, stop })
    cursor += length
  }

  add("intro", JOURNEY.intro * vh, 0, 0)
  let step = 0
  stops.forEach((stopStep, i) => {
    add("travel", Math.max(stopStep - step, 1) * JOURNEY.stepPx, step, stopStep)
    add("dwell", JOURNEY.dwell * vh, stopStep, stopStep, i)
    step = stopStep
  })
  add("travel", Math.max(lastStep - step, 1) * JOURNEY.stepPx, step, lastStep)
  add("zoomOut", JOURNEY.zoomOut * vh, lastStep, lastStep)
  add("speed", JOURNEY.speed * vh, lastStep, lastStep)
  add("hold", JOURNEY.hold * vh, lastStep, lastStep)

  return { segments, total: cursor, viewportHeight: vh, lastStep, stops }
}

/** Close to linear, so motion still tracks the scroll, with soft starts and stops. */
const ease = (u: number) => 0.5 * u + 0.5 * (u * u * (3 - 2 * u))
const clamp01 = (u: number) => Math.min(Math.max(u, 0), 1)

export interface JourneyState {
  /** Exploration frame, fractional between cells */
  step: number
  /** 0 = whole maze, 1 = zoomed into the mouse */
  zoomIn: number
  /** 0 = zoomed in, 1 = pulled back to the whole maze at the goal */
  zoomOut: number
  /** Speed run progress, 0..1 */
  speed: number
  /** Stop whose section is shown, if any */
  stop: number | null
  /** Stops reached so far */
  unlocked: number
  /** True once the final picture is up */
  finished: boolean
}

export function journeyAt(timeline: JourneyTimeline, s: number): JourneyState {
  const base: JourneyState = { step: 0, zoomIn: 0, zoomOut: 0, speed: 0, stop: null, unlocked: 0, finished: false }
  if (s <= 0) return base
  const unlockedBy = (step: number) => timeline.stops.filter((st) => step >= st).length

  for (const seg of timeline.segments) {
    if (s >= seg.start + seg.length && seg.kind !== "hold") continue
    const u = clamp01((s - seg.start) / seg.length)
    switch (seg.kind) {
      case "intro":
        return { ...base, zoomIn: ease(u) }
      case "travel": {
        const step = seg.fromStep + ease(u) * (seg.toStep - seg.fromStep)
        return { ...base, zoomIn: 1, step, unlocked: unlockedBy(step) }
      }
      case "dwell":
        return { ...base, zoomIn: 1, step: seg.toStep, stop: seg.stop ?? null, unlocked: (seg.stop ?? 0) + 1 }
      case "zoomOut":
        return { ...base, zoomIn: 1, step: timeline.lastStep, zoomOut: ease(u), unlocked: timeline.stops.length }
      case "speed":
        return { ...base, zoomIn: 1, step: timeline.lastStep, zoomOut: 1, speed: ease(u), unlocked: timeline.stops.length }
      case "hold":
        return { ...base, zoomIn: 1, step: timeline.lastStep, zoomOut: 1, speed: 1, unlocked: timeline.stops.length, finished: u > 0.1 }
    }
  }
  return { ...base, zoomIn: 1, step: timeline.lastStep, zoomOut: 1, speed: 1, unlocked: timeline.stops.length, finished: true }
}

/** Scroll offset (within the journey) that shows stop `index`: the middle of its dwell. */
export function scrollForStop(timeline: JourneyTimeline, index: number) {
  const seg = timeline.segments.find((g) => g.kind === "dwell" && g.stop === index)
  return seg ? seg.start + seg.length / 2 : 0
}

/**
 * Resting points for chapter navigation: the start of the journey, every stop,
 * and the finished speed run. After a scroll gesture the page settles on the
 * next one in the direction of travel.
 */
export function anchorsOf(timeline: JourneyTimeline): number[] {
  const hold = timeline.segments.find((g) => g.kind === "hold")!
  return [0, ...timeline.stops.map((_, i) => scrollForStop(timeline, i)), hold.start + hold.length * 0.3]
}

/** Where to settle after a gesture that started at `from` and stopped at `at`, or null to stay. */
export function settleTarget(anchors: number[], from: number, at: number, tolerance = 6): number | null {
  if (anchors.some((a) => Math.abs(a - at) <= tolerance)) return null
  const first = anchors[0]
  const lastAnchor = anchors[anchors.length - 1]
  if (at < first || at > lastAnchor) return null
  const down = at > from
  const ahead = anchors.filter((a) => (down ? a > from + tolerance : a < from - tolerance))
  if (ahead.length === 0) return null
  // Nearest anchor to where the gesture stopped, among those beyond its start.
  return ahead.reduce((best, a) => (Math.abs(a - at) < Math.abs(best - at) ? a : best))
}
