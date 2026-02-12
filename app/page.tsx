"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Timeline } from "@/components/timeline"
import { VideoSection } from "@/components/video-section"
import { Sponsors } from "@/components/sponsors"
import { Footer } from "@/components/footer"
import { RegisterModal } from "@/components/register-modal"

export default function Page() {
  const [registerOpen, setRegisterOpen] = useState(false)

  return (
    <>
      <Navbar onRegisterClick={() => setRegisterOpen(true)} />
      <main>
        <Hero onRegisterClick={() => setRegisterOpen(true)} />
        <About />
        <Timeline />
        <VideoSection />
        <Sponsors />
      </main>
      <Footer />
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </>
  )
}
