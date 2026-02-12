import { Mail, Github, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="font-display text-sm font-bold tracking-widest text-foreground">
            MICROMOUSE CROATIA
          </span>
          <span className="text-xs text-muted-foreground">
            {"© 2026 Sva prava pridržana."}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pravila
          </a>
          <a
            href="mailto:info@micromouse.hr"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail size={14} />
            Kontakt
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ExternalLink size={14} />
            IEEE
          </a>
        </div>
      </div>
    </footer>
  )
}
