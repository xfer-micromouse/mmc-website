export const timelineData = [
  {
    title: "Otvaranje prijava",
    description:
      "Prijavite svoj tim i robota za natjecanje. Maksimalno 3 člana po timu.",
    date: "20. veljače 2026.",
    iconType: "rocket" as const,
  },
  {
    title: "Početak radionica i predavanja",
    description:
      "Pet predavanja o različitim djelovima dizajna i programiranja Micromousa kako bi olakšali proces i motivirali studente i sve prijavljene",
    date: "9. ožujka 2026.",
    iconType: "check" as const,
  },
  {
    title: "Rok za predaju tehničke dokumentacije za financiranje komponenti",
    description:
      "Za timove financiramo izradu tiskanih pločica i naručivanje komponenti do dogovorenog iznosa",
    date: "10. travnja 2026.",
    iconType: "clock" as const,
  },
  {
    title: "Mock natjecanje",
    description:
      "Održavanje testnog natjecanja na pravom labirintu",
    date: "15. svibnja 2026.",
    iconType: "clock" as const,
  },
  {
    title: "Dan natjecanja",
    description:
      "Dan-D... Na prostorima Sveučilišta Algebra održati će se natjecanje za sve prijavljene timove i kategorije",
    date: "31. svibnja 2026.",
    iconType: "award" as const,
  },
]

//tier specificiran u sponsors.tsx
export const sponsorsData = [
  {
    name: "Stype",
    tier: "gold" as const,
    placeholderText: "",
    websiteLink: "https://stype.tv/"
  },
  {
    name: "DOK-ING",
    tier: "gold" as const,
    placeholderText: "",
    websiteLink: "https://dok-ing.hr/"
  },
  {
    name: "CoE Marble",
    tier: "silver" as const,
    placeholderText: "",
    websiteLink: "https://marble.eu/"
  },
  {
    name: "FER",
    tier: "comunity" as const,
    placeholderText: "",
    websiteLink: "https://www.fer.unizg.hr/"
  },
  {
    name: "Sveučilište Algebra Bernays",
    tier: "comunity" as const,
    placeholderText: "",
    websiteLink: "https://www.algebra.hr/"
  }
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
    value: "13min",
    label: "Vremenski limit",
    color: "#A64AF5",
  },
]
