import type { Metadata } from "next"
import { EDITION_YEAR } from "@/lib/config"
import { PravilaContent } from "@/components/pravila-content"

export const metadata: Metadata = {
  title: `Pravila - Micromouse Zagreb ${EDITION_YEAR}`,
  description:
    "Službena pravila Micromouse natjecanja. Specifikacije labirinta, robota, tijek natjecanja i bodovanje.",
}

export default function PravilaPage() {
  return <PravilaContent />
}
