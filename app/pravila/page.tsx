import type { Metadata } from "next"
import { PravilaContent } from "@/components/pravila-content"

export const metadata: Metadata = {
  title: "Pravila - Micromouse Zagreb 2026",
  description:
    "Službena pravila Micromouse natjecanja. Specifikacije labirinta, robota, tijek natjecanja i bodovanje.",
}

export default function PravilaPage() {
  return (
    <div className="pt-16">
      <PravilaContent />
    </div>
  )
}
