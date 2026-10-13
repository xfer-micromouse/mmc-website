import { SectionHeading, SectionWrapper } from "@/components/section-wrapper"
import { buttonStyles } from "@/lib/ui"
import { EDITION_YEAR, SPONSOR_CONTACT, sponsors2026, sponsorSlots, sponsorTiers, type SponsorTier } from "@/lib/config"
import { cn } from "@/lib/utils"

/** Footprint height, name size and grid span per tier: gold is largest, each lower tier a step smaller. */
const tierChip: Record<SponsorTier, { chip: string; name: string; span: string }> = {
  gold: { chip: "py-10", name: "text-3xl md:text-4xl", span: "sm:col-span-2" },
  silver: { chip: "py-7", name: "text-2xl", span: "" },
  bronze: { chip: "py-5", name: "text-xl", span: "" },
  community: { chip: "py-5", name: "text-xl", span: "" },
}

const tierLabel = (tier: SponsorTier) => sponsorTiers.find((t) => t.tier === tier)?.label

/**
 * Sponsor places for the current edition. Empty places are drawn as "DNP"
 * (do not populate) footprints: a chip outline with no part on it yet.
 */
export function SponsorsSection() {
  return (
    <SectionWrapper id="sponsors">
      <SectionHeading
        title={`Sponzori ${EDITION_YEAR}`}
        subtitle="Mjesta na pločici još su prazna. Vaša tvrtka može biti prva komponenta koju zalemimo."
      />
      <ul className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {sponsorSlots.map((slot, i) => {
          const style = tierChip[slot.tier]
          return (
            <li key={i} className={style.span}>
              <p className="silkscreen mb-2 text-muted">
                IC{i + 1} // {tierLabel(slot.tier)}
              </p>
              {slot.name ? (
                <a href={slot.websiteLink} className="chip-pins block px-3 py-[5px]">
                  <span className={cn("flex items-center rounded-sm border border-accent/60 bg-floor px-6", style.chip)}>
                    <span className={cn("font-semibold tracking-tight text-foreground", style.name)}>{slot.name}</span>
                  </span>
                </a>
              ) : (
                <div className="chip-pins px-3 py-[5px] opacity-60">
                  <div className={cn("flex items-center justify-center rounded-sm border border-dashed border-muted/50", style.chip)}>
                    <span className="silkscreen text-muted">DNP</span>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
      <a href={SPONSOR_CONTACT} className={cn(buttonStyles.primary, "mt-10")}>
        Postani sponzor
      </a>
    </SectionWrapper>
  )
}

/** First-edition sponsors as populated chips, for /arhiva/2026. */
export function Sponsors2026() {
  const ordered = sponsorTiers.flatMap((t) => sponsors2026.filter((s) => s.tier === t.tier))
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {ordered.map((sponsor, index) => {
        const style = tierChip[sponsor.tier]
        return (
          <li key={sponsor.name} className={style.span}>
            <p className="silkscreen mb-2 text-muted">
              IC{index + 1} // {tierLabel(sponsor.tier)}
            </p>
            <a href={sponsor.websiteLink} className="chip-pins group/chip block px-3 py-[5px]">
              <span className={cn("flex items-center rounded-sm border border-accent/60 bg-floor px-6 transition-colors group-hover/chip:border-signal", style.chip)}>
                <span className={cn("font-semibold tracking-tight text-foreground", style.name)}>{sponsor.name}</span>
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
