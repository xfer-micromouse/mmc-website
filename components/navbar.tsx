"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, SquareTerminal, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { RegisterButton } from "@/components/register-button"
import { useOpenPalette } from "@/components/site-shell"

const navLinks = [
  { label: "O Natjecanju", href: "/#about" },
  { label: "Raspored", href: "/#timeline" },
  { label: "Za Studente", href: "/za-studente" },
  { label: "Pravila", href: "/pravila" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const openPalette = useOpenPalette()

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="" width={28} height={28} className="h-7 w-auto" priority />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Micromouse Zagreb
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = !link.href.startsWith("/#") && pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-sm transition-colors hover:text-foreground",
                    isActive ? "text-foreground" : "text-muted"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={openPalette}
            className="flex items-center gap-2 rounded-md border border-border px-2.5 py-2 font-mono text-xs text-muted transition-colors hover:text-foreground"
            aria-label="Otvori terminal (/ ili Ctrl+K)"
          >
            <SquareTerminal size={14} />
            <kbd>/</kbd>
          </button>
          <RegisterButton />
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="-mr-2 p-2 text-foreground md:hidden"
          aria-label={mobileOpen ? "Zatvori izbornik" : "Otvori izbornik"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <ul className="flex flex-col px-4 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-base text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pb-2 pt-3">
              <RegisterButton className="w-full" onClick={() => setMobileOpen(false)} />
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
