"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "O Natjecanju", href: "#about" },
  { label: "Raspored", href: "#timeline" },
  { label: "Što je Micromouse?", href: "#what-is" },
  { label: "Sponzori", href: "#sponsors" },
]

interface NavbarProps {
  onRegisterClick: () => void
}

export function Navbar({ onRegisterClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-dark-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <MazeIcon />
          <span className="font-display text-lg font-bold tracking-wider text-foreground">
            MICROMOUSE
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={onRegisterClick}
          className="hidden rounded-lg bg-gradient-to-r from-neon-peach via-neon-pink to-neon-purple px-5 py-2 text-sm font-semibold text-dark-bg transition-opacity hover:opacity-90 md:block"
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
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
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

function MazeIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="26"
        height="26"
        rx="4"
        stroke="url(#maze-grad)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M7 1v10h6V7h8v6h-4v8H7v-4h4v-4H1"
        stroke="url(#maze-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="21" cy="21" r="2.5" fill="#FF5E78" />
      <defs>
        <linearGradient id="maze-grad" x1="0" y1="0" x2="28" y2="28">
          <stop stopColor="#FF9F76" />
          <stop offset="0.5" stopColor="#FF5E78" />
          <stop offset="1" stopColor="#A64AF5" />
        </linearGradient>
      </defs>
    </svg>
  )
}
