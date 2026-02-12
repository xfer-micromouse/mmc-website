import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"
import { ZaStudenteContent } from "@/components/za-studente-content"

export const metadata: Metadata = {
  title: "Za Studente - Micromouse Croatia 2026",
  description:
    "Financiranje i podrška za studentske timove na Micromouse natjecanju. Saznajte kako prijaviti svoj tim i ostvariti financijsku podršku.",
}

export default function ZaStudentePage() {
  return (
    <PageWrapper>
      <ZaStudenteContent />
    </PageWrapper>
  )
}
