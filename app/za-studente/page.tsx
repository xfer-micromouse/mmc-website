import type { Metadata } from "next"
import { EDITION_YEAR } from "@/lib/config"
import { ZaStudenteContent } from "@/components/za-studente-content"

export const metadata: Metadata = {
  title: `Za Studente - Micromouse Zagreb ${EDITION_YEAR}`,
  description:
    "Financiranje i podrška za studentske timove na Micromouse natjecanju. Saznajte kako prijaviti svoj tim i ostvariti financijsku podršku.",
}

export default function ZaStudentePage() {
  return <ZaStudenteContent />
}
