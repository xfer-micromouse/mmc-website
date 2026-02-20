import Link from "next/link"
import { Mail, Github, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="font-display text-sm font-bold tracking-widest text-foreground">
            X.FER
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/pravila"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pravila
          </Link>
          <Link
            href="/za-studente"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Za Studente
          </Link>
          <a
            href="mailto:micromouse@xfer.hr"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail size={14} />
            Kontakt
          </a>
        </div>
      </div>
    </footer>
  )
}
