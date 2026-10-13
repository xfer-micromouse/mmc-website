"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { MazeGame } from "@/components/maze-game"
import { cn } from "@/lib/utils"

type View = "list" | "help" | "play"

interface Command {
  name: string
  description: string
  run: () => View | void
}

export function CommandPalette({
  open,
  onOpenChange,
  onRegister,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRegister: () => void
}) {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState(0)
  const [view, setView] = useState<View>("list")

  const go = (href: string) => {
    onOpenChange(false)
    router.push(href)
  }

  const commands: Command[] = [
    { name: "pravila", description: "službena pravila natjecanja", run: () => go("/pravila") },
    { name: "raspored", description: "ključni datumi", run: () => go("/#timeline") },
    { name: "studenti", description: "financiranje i podrška", run: () => go("/za-studente") },
    {
      name: "prijava",
      description: "prijavi tim",
      run: () => {
        onOpenChange(false)
        onRegister()
      },
    },
    { name: "play", description: "vozi miša kroz labirint", run: () => "play" },
    { name: "help", description: "popis naredbi", run: () => "help" },
  ]
  const matches = commands.filter((c) => c.name.startsWith(query.trim().toLowerCase()))

  // Open/close the native modal dialog to match state.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      setQuery("")
      setSelected(0)
      setView("list")
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  // "/" or Ctrl/Cmd+K opens the palette anywhere except while typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing =
        e.target instanceof Element &&
        e.target.closest("input, textarea, select, [contenteditable=true]")
      if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) {
        e.preventDefault()
        onOpenChange(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onOpenChange])

  const execute = (command: Command | undefined) => {
    if (!command) return
    const next = command.run()
    if (next) setView(next)
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={() => onOpenChange(false)}
      onClick={(e) => e.target === dialogRef.current && onOpenChange(false)}
      className="mx-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] rounded-md border border-border bg-floor p-0 text-foreground backdrop:bg-floor/80 backdrop:backdrop-blur-sm"
      aria-label="Terminal"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 font-mono">
        <span className="text-signal" aria-hidden="true">&gt;</span>
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelected(0)
            setView("list")
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" && view === "list") {
              e.preventDefault()
              setSelected((i) => Math.min(i + 1, matches.length - 1))
            } else if (e.key === "ArrowUp" && view === "list") {
              e.preventDefault()
              setSelected((i) => Math.max(i - 1, 0))
            } else if (e.key === "Enter") {
              e.preventDefault()
              execute(matches[selected])
            }
          }}
          placeholder="upiši naredbu, npr. help"
          aria-label="Naredba"
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
        />
        <kbd className="hidden rounded border border-border px-1.5 text-[11px] text-muted sm:block">esc</kbd>
      </div>

      <div className="p-2 font-mono text-sm">
        {view === "play" ? (
          <div className="p-2">
            <MazeGame />
          </div>
        ) : view === "help" ? (
          <div className="space-y-1 p-2 text-muted">
            <p className="text-foreground">MICROMOUSE(1)</p>
            {commands.map((c) => (
              <p key={c.name}>
                <span className="inline-block w-24 text-accent-soft">{c.name}</span>
                {c.description}
              </p>
            ))}
            <p className="pt-2">Otvori s / ili Ctrl+K. Zatvori s Esc.</p>
          </div>
        ) : matches.length === 0 ? (
          <p className="p-2 text-muted">command not found: {query}. Probaj help.</p>
        ) : (
          <ul role="listbox" aria-label="Naredbe">
            {matches.map((c, i) => (
              <li key={c.name} role="option" aria-selected={i === selected}>
                <button
                  type="button"
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => execute(c)}
                  className={cn(
                    "flex w-full justify-between rounded px-2 py-2 text-left",
                    i === selected ? "bg-surface text-foreground" : "text-muted"
                  )}
                >
                  <span>{c.name}</span>
                  <span className="text-xs text-muted">{c.description}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </dialog>
  )
}
