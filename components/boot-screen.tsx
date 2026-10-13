"use client"

const lines = [
  "MICROMOUSE ZAGREB BIOS v2.0 // X.FER",
  "POST ........................ OK",
  "IR senzori [4] .............. OK",
  "motori [2] .................. OK",
  "učitavam labirint 16x16 ..... OK",
  "> start",
]

/** Shown at most once per session for under a second; see the boot script in app/layout.tsx. */
export function BootScreen() {
  return (
    <div
      id="boot-screen"
      onClick={() => document.documentElement.classList.remove("boot")}
      className="fixed inset-0 z-[60] cursor-pointer items-center justify-center bg-floor px-6"
      aria-hidden="true"
    >
      <div className="w-full max-w-md font-mono text-sm text-muted">
        {lines.map((line, i) => (
          <p
            key={line}
            className={i === lines.length - 1 ? "mt-2 text-signal" : undefined}
            style={{ animationDelay: `${i * 110}ms` }}
          >
            {line}
          </p>
        ))}
        <p className="mt-6 text-xs text-muted/70" style={{ animationDelay: "0ms" }}>
          klik za preskok
        </p>
      </div>
    </div>
  )
}
