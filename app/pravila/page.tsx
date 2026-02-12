import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"
import { PravilaContent } from "@/components/pravila-content"

export const metadata: Metadata = {
  title: "Pravila - Micromouse Croatia 2026",
  description:
    "Službena pravila Micromouse natjecanja. Specifikacije labirinta, robota, tijek natjecanja i bodovanje.",
}

export default function PravilaPage() {
  return (
    <PageWrapper>
      <PravilaContent />
    </PageWrapper>
  )
}
