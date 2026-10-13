import { Hero } from "@/components/hero"
import { Journey } from "@/components/journey"
import { WhatIsSection, FaqSection } from "@/components/home-sections"
import { Readouts } from "@/components/readouts"
import { HowItWorks } from "@/components/how-it-works"
import { Timeline } from "@/components/timeline"
import { SponsorsSection } from "@/components/sponsors-board"
import { Gallery } from "@/components/gallery"
import { PointerGlow } from "@/components/pointer-glow"

export default function Page() {
  return (
    <>
      <PointerGlow />
      <Hero />
      {/* Order matches homeSections: the first JOURNEY_STOPS are unlocked in the maze */}
      <Journey>
        <WhatIsSection />
        <Readouts />
        <HowItWorks />
        <Timeline />
        <SponsorsSection />
      </Journey>
      <Gallery limit={3} />
      <FaqSection />
    </>
  )
}
