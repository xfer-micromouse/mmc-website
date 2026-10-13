import { PcbNode } from "@/components/pcb-node"

/**
 * Background trigger points fixed to the page. Every so often one "fires":
 * the PCB node around it (components/pcb-node.tsx) draws its traces outward
 * from the chip and fades away again. Positions are percentages of the
 * home page body; each point gets its own delay so they fire one at a time.
 * With reduced motion the pads stay as quiet markers and nothing lights up.
 */
// Near the page edges so a lit node frames the content instead of sitting under the text.
const triggers = [
  { x: 97, y: 6 },
  { x: 3, y: 17 },
  { x: 96, y: 29 },
  { x: 2, y: 41 },
  { x: 98, y: 53 },
  { x: 3, y: 66 },
  { x: 97, y: 78 },
  { x: 2, y: 90 },
]

const CYCLE_S = 16

export function PcbTriggers() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {triggers.map((t, i) => (
        <div
          key={i}
          className="trigger-glow absolute -ml-[260px] -mt-[260px] h-[520px] w-[520px] opacity-0 [mask-image:radial-gradient(circle,#000_45%,transparent_70%)]"
          style={triggerStyle(t, i)}
        >
          <PcbNode id={String(i)} variant={i} />
        </div>
      ))}
      {triggers.map((t, i) => (
        <span
          key={i}
          className="trigger-pad absolute -ml-[5px] -mt-[5px] h-2.5 w-2.5 rounded-sm bg-accent/50"
          style={triggerStyle(t, i)}
        />
      ))}
    </div>
  )
}

function triggerStyle(t: { x: number; y: number }, i: number) {
  return {
    left: `${t.x}%`,
    top: `${t.y}%`,
    "--cycle": `${CYCLE_S}s`,
    "--delay": `${(i * CYCLE_S) / triggers.length}s`,
  } as React.CSSProperties
}
