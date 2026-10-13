import { Hero } from "@/components/hero"
import { HomeChrome } from "@/components/home-chrome"
import { Timeline } from "@/components/timeline"
import { Gallery } from "@/components/gallery"
import {
  FirstEditionSection,
  GoalSection,
  HowItWorksSection,
  ReadoutsSection,
  SponsorsSection,
  WhatIsSection,
} from "@/components/home-sections"

export default function Page() {
  return (
    <>
      <Hero />
      <HomeChrome>
        <WhatIsSection />
        <FirstEditionSection />
        <HowItWorksSection />
        <Timeline />
        <Gallery />
        <ReadoutsSection />
        <SponsorsSection />
        <GoalSection />
      </HomeChrome>
    </>
  )
}
