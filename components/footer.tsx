import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="text-muted">
            Organizira <span className="font-medium text-foreground">X.FER</span>
          </p>
          <p className="mt-1 font-mono text-xs text-muted">
            pritisni <kbd className="text-accent-soft">/</kbd> za terminal
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-muted">
          <li>
            <Link href="/pravila" className="transition-colors hover:text-foreground">
              Pravila
            </Link>
          </li>
          <li>
            <Link href="/za-studente" className="transition-colors hover:text-foreground">
              Za Studente
            </Link>
          </li>
          <li>
            <a href="mailto:micromouse@xfer.hr" className="transition-colors hover:text-foreground">
              micromouse@xfer.hr
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
