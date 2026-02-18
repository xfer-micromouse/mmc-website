"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "O Natjecanju", href: "/#about" },
  { label: "Raspored", href: "/#timeline" },
  { label: "Za Studente", href: "/za-studente" },
  { label: "Pravila", href: "/pravila" },
]

interface NavbarProps {
  onRegisterClick: () => void
}

export function Navbar({ onRegisterClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-dark-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Micromouse Croatia logo"
            width={32}
            height={32}
            className="h-8 w-auto"
            loading="eager"
            priority
          />
          <span className="font-display text-lg font-bold tracking-wider text-foreground">
            MICROMOUSE
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href.startsWith("/#")
                ? pathname === "/"
                : pathname === link.href

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors hover:text-foreground",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <button
          onClick={onRegisterClick}
          className="hidden rounded-lg bg-gradient-to-r from-neon-peach via-neon-pink to-neon-purple px-5 py-2 text-sm font-semibold text-light-bg transition-opacity hover:opacity-90 md:block"
        >
          Prijavi se
        </button>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/40 bg-dark-bg/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-80" : "max-h-0 border-t-0"
        )}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-2">
            <button
              onClick={() => {
                setMobileOpen(false)
                onRegisterClick()
              }}
              className="w-full rounded-lg bg-gradient-to-r from-neon-peach via-neon-pink to-neon-purple px-5 py-2.5 text-sm font-semibold text-dark-bg"
            >
              Prijavi se
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
