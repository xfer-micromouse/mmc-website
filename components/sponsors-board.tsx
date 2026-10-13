import { SectionHeading, SectionWrapper } from "@/components/section-wrapper"
import { sponsorsData, sponsorTiers, type SponsorTier } from "@/lib/config"
import { cn } from "@/lib/utils"

/** Chip height and name size per tier: gold is largest, each lower tier a step smaller. */
const tierChip: Record<SponsorTier, { chip: string; name: string }> = {
  gold: { chip: "py-10", name: "text-3xl md:text-4xl" },
  silver: { chip: "py-7", name: "text-2xl" },
  bronze: { chip: "py-5", name: "text-xl" },
  community: { chip: "py-5", name: "text-xl" },
}

/**
 * Sponsors as chips on a PCB, next to the competition's own chip (U0).
 * Chips are ordered by sponsorTiers, so adding or removing a sponsor in
 * lib/config.ts needs no changes here.
 */
export function SponsorsBoard() {
  const ordered = sponsorTiers.flatMap((t) => sponsorsData.filter((s) => s.tier === t.tier))
  const tierLabel = (tier: SponsorTier) => sponsorTiers.find((t) => t.tier === tier)?.label

  return (
    <SectionWrapper id="sponsors">
      <SectionHeading
        title="Sponzori i Partneri"
        subtitle="Zahvaljujemo se svim partnerima koji podržavaju razvoj robotike u Hrvatskoj."
      />
      <div className="mt-12 rounded-md border border-border bg-[radial-gradient(rgb(var(--border))_1px,transparent_1px)] bg-[length:16px_16px] p-6 md:p-10">
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <li className="sm:col-span-2 lg:col-span-1">
            <p className="silkscreen mb-2 text-muted">U0 // Organizator</p>
            <div className="chip-pins px-3 py-[5px]">
              <div className="relative flex flex-col justify-center rounded-sm border-2 border-accent bg-background px-6 py-8">
                <span className="absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-muted/60" aria-hidden="true" />
                <span className="pl-4 text-2xl font-semibold tracking-tight text-accent-soft">Micromouse Zagreb</span>
                <span className="pl-4 font-mono text-xs text-muted">by X.FER</span>
              </div>
            </div>
          </li>

          {ordered.map((sponsor, index) => {
            const style = tierChip[sponsor.tier]
            return (
              <li key={sponsor.name} className={cn(sponsor.tier === "gold" && "sm:col-span-2")}>
                <p className="silkscreen mb-2 text-muted">
                  IC{index + 1} // {tierLabel(sponsor.tier)}
                </p>
                <a href={sponsor.websiteLink} className="chip-pins group/chip block px-3 py-[5px]">
                  <span
                    className={cn(
                      "relative flex items-center rounded-sm border border-accent/60 bg-floor px-6 transition-colors group-hover/chip:border-signal",
                      style.chip
                    )}
                  >
                    <span className="absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-muted/60" aria-hidden="true" />
                    <span className={cn("pl-4 font-semibold tracking-tight text-foreground", style.name)}>
                      {sponsor.name}
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </SectionWrapper>
  )
}
