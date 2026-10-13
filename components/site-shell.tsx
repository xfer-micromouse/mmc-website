"use client"

import { createContext, useContext, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RegisterModal } from "@/components/register-modal"

const OpenRegisterContext = createContext<() => void>(() => {})

export function useOpenRegister() {
  return useContext(OpenRegisterContext)
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [registerOpen, setRegisterOpen] = useState(false)

  return (
    <OpenRegisterContext.Provider value={() => setRegisterOpen(true)}>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </OpenRegisterContext.Provider>
  )
}
