import { SectionHeading, SectionWrapper } from "@/components/section-wrapper"
import { sponsorsData } from "@/lib/config"
import { cn } from "@/lib/utils"

const tierStyles = {
  gold: "border-neon-peach/40 hover:border-neon-peach/70",
  silver: "border-border hover:border-neon-pink/40",
  bronze: "border-border hover:border-neon-purple/40",
  community: "border-border hover:border-foreground/40",
} as const

const tierLabels = {
  gold: "Zlatni sponzor",
  silver: "Srebrni sponzor",
  bronze: "Brončani sponzor",
  community: "Akademski sponzor",
} as const

export function Sponsors() {
  return (
    <SectionWrapper id="sponsors">
      <SectionHeading
        title="Sponzori i Partneri"
        subtitle="Zahvaljujemo se svim partnerima koji podržavaju razvoj robotike u Hrvatskoj."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sponsorsData.map((sponsor) => (
          <a
            key={sponsor.name}
            href={sponsor.websiteLink}
            className={cn(
              "glass flex flex-col items-center justify-center gap-3 rounded-xl border p-8 text-center transition-all duration-300",
              tierStyles[sponsor.tier]
            )}
          >
            <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {tierLabels[sponsor.tier]}
            </span>
            <h3 className="font-display text-xl font-semibold text-foreground">
              {sponsor.name}
            </h3>
          </a>
        ))}
      </div>
    </SectionWrapper>
  )
}
