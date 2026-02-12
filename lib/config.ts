export const timelineData = [
  {
    title: "Otvaranje prijava",
    description:
      "Prijavite svoj tim i robota za natjecanje. Maksimalno 3 člana po timu.",
    date: "1. ožujka 2026.",
    iconType: "rocket" as const,
  },
  {
    title: "Tehnička verifikacija",
    description:
      "Online provjera tehničke specifikacije robota i potvrda sudjelovanja.",
    date: "15. travnja 2026.",
    iconType: "check" as const,
  },
  {
    title: "Zatvaranje prijava",
    description:
      "Zadnji dan za prijavu timova. Nakon ovog datuma prijave se neće primati.",
    date: "1. svibnja 2026.",
    iconType: "clock" as const,
  },
  {
    title: "Dan natjecanja",
    description:
      "Okupljanje svih timova, kvalifikacijske vožnje i finalne utrke u labirintu.",
    date: "14. lipnja 2026.",
    iconType: "trophy" as const,
  },
  {
    title: "Proglašenje pobjednika",
    description:
      "Svečana dodjela nagrada najbržim robotima i najboljim timovima.",
    date: "14. lipnja 2026.",
    iconType: "award" as const,
  },
]

export const sponsorsData = [
  {
    name: "FER Zagreb",
    tier: "gold" as const,
    placeholderText: "Fakultet elektrotehnike i računarstva",
  },
  {
    name: "IEEE Croatia",
    tier: "gold" as const,
    placeholderText: "Institute of Electrical and Electronics Engineers",
  },
  {
    name: "Sveučilište u Zagrebu",
    tier: "silver" as const,
    placeholderText: "University of Zagreb",
  },
  {
    name: "Partner 4",
    tier: "silver" as const,
    placeholderText: "TBA",
  },
  {
    name: "Partner 5",
    tier: "bronze" as const,
    placeholderText: "TBA",
  },
  {
    name: "Partner 6",
    tier: "bronze" as const,
    placeholderText: "TBA",
  },
]

export const competitionStats = [
  {
    value: "16x16",
    label: "Veličina labirinta",
    color: "#FF9F76",
  },
  {
    value: "3m/s+",
    label: "Brzina robota",
    color: "#FF5E78",
  },
  {
    value: "10min",
    label: "Vremenski limit",
    color: "#A64AF5",
  },
]
