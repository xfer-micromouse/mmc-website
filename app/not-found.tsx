import Link from "next/link"
import { buttonStyles } from "@/lib/ui"

export default function NotFound() {
  return (
    <div className="flex min-h-[80dvh] items-center px-4 pt-24 md:px-12">
      <div className="mx-auto w-full max-w-3xl font-mono">
        <p className="silkscreen text-muted">ERR 404 // ROUTE NOT FOUND</p>
        <h1 className="mt-4 font-sans text-4xl font-bold tracking-tight text-accent-soft md:text-6xl">
          Dead end.
        </h1>
        <p className="mt-4 text-lg text-muted">Miš je udario u zid.</p>
        <p className="mt-8 text-sm text-muted">
          <span className="text-signal">&gt;</span> flood fill predlaže povratak na start.
        </p>
        <Link href="/" className={`${buttonStyles.primary} mt-6`}>
          Natrag na start
        </Link>
      </div>
    </div>
  )
}
