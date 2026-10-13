import { Hero } from "@/components/hero"
import { HomeChrome } from "@/components/home-chrome"
import { Timeline } from "@/components/timeline"
import { Gallery } from "@/components/gallery"
import { HowItWorks } from "@/components/how-it-works"
import { Readouts } from "@/components/readouts"
import { SponsorsBoard } from "@/components/sponsors-board"
import { FirstEditionSection, GoalSection, WhatIsSection } from "@/components/home-sections"

export default function Page() {
  return (
    <>
      <Hero />
      <HomeChrome>
        <WhatIsSection />
        <FirstEditionSection />
        <HowItWorks />
        <Timeline />
        <Gallery />
        <Readouts />
        <SponsorsBoard />
        <GoalSection />
      </HomeChrome>
    </>
  )
}
