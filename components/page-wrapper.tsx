"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RegisterModal } from "@/components/register-modal"

interface PageWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  const [registerOpen, setRegisterOpen] = useState(false)

  return (
    <>
      <Navbar onRegisterClick={() => setRegisterOpen(true)} />
      <main className="pt-16">{children}</main>
      <Footer />
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </>
  )
}
