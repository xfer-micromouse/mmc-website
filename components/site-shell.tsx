"use client"

import { createContext, useContext, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RegisterModal } from "@/components/register-modal"
import { CommandPalette } from "@/components/command-palette"
import { BootScreen } from "@/components/boot-screen"

const ShellContext = createContext({ openRegister: () => {}, openPalette: () => {} })

export function useOpenRegister() {
  return useContext(ShellContext).openRegister
}

export function useOpenPalette() {
  return useContext(ShellContext).openPalette
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [registerOpen, setRegisterOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  return (
    <ShellContext.Provider
      value={{ openRegister: () => setRegisterOpen(true), openPalette: () => setPaletteOpen(true) }}
    >
      <BootScreen />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <RegisterModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} />
      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onRegister={() => setRegisterOpen(true)}
      />
    </ShellContext.Provider>
  )
}
