import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Timeline } from "@/components/timeline"
import { VideoSection } from "@/components/video-section"
import { Sponsors } from "@/components/sponsors"

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Timeline />
      <VideoSection />
      <Sponsors />
    </>
  )
}
